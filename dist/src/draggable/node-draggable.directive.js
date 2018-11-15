"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var node_draggable_service_1 = require("./node-draggable.service");
var captured_node_1 = require("./captured-node");
var tree_1 = require("../tree");
var draggable_events_1 = require("./draggable.events");
var NodeDraggableDirective = (function () {
    function NodeDraggableDirective(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    NodeDraggableDirective.prototype.ngOnInit = function () {
        if (!this.tree.isStatic()) {
            this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
        }
    };
    NodeDraggableDirective.prototype.ngOnDestroy = function () {
        this.disposersForDragListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeDraggableDirective.prototype.handleDragStart = function (e) {
        if (this.tree.isBeingRenamed()) {
            e.preventDefault();
            return;
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (!this.tree.checked) {
            this.nodeDraggableService.setDraggedNode(new captured_node_1.CapturedNode(this.nodeDraggable, this.tree));
        }
        this.notifyThatNodeIsBeingDragged();
        if (this.tree.node.settings.dragImageId) {
            var elem = document.getElementById(this.tree.node.settings.dragImageId);
            if (elem) {
                e.dataTransfer.setDragImage(elem, 0, 0);
            }
        }
        this.applyDraggedNodeClasses();
        e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'move';
    };
    NodeDraggableDirective.prototype.handleDragOver = function (e) {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode && draggedNode.contains({ nativeElement: e.currentTarget })) {
            // Cannot drag and drop on itself
            return;
        }
        if (!draggedNode && this.tree.checked) {
            // Cannot drop multiple items onto themselves
            return;
        }
        var newDropPosition = this.determineDropPosition(e);
        this.removeClasses([this.getDropPositionClassName(this.currentDropPosition)]);
        if (this.tree.isBranch() && this.tree.isNodeExpanded() && newDropPosition === draggable_events_1.DropPosition.Below) {
            // Cannot drop below a branch node if it's expanded
            return;
        }
        if (draggedNode &&
            this.tree.isBranch() &&
            this.tree.hasChild(draggedNode.tree) &&
            newDropPosition === draggable_events_1.DropPosition.Into) {
            // Cannot drop into it's own parent
            return;
        }
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.addClasses([this.getDropPositionClassName(newDropPosition)]);
        this.currentDropPosition = newDropPosition;
    };
    NodeDraggableDirective.prototype.handleDragEnter = function (e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClasses(['over-drop-target', this.getDragOverClassName()]);
        }
    };
    NodeDraggableDirective.prototype.handleDragLeave = function (e) {
        if (!this.containsElementAt(e)) {
            this.removeClasses([
                'over-drop-target',
                this.getDragOverClassName(),
                this.getDropPositionClassName(this.currentDropPosition)
            ]);
        }
    };
    NodeDraggableDirective.prototype.handleDragEnd = function (e) {
        this.removeClasses([
            'over-drop-target',
            this.getDragOverClassName(),
            this.getDropPositionClassName(this.currentDropPosition)
        ]);
        this.removeDraggedNodeClasses();
        this.nodeDraggableService.releaseDraggedNode();
    };
    NodeDraggableDirective.prototype.handleDrop = function (e) {
        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.removeClasses([
            'over-drop-target',
            this.getDragOverClassName(),
            this.getDropPositionClassName(this.currentDropPosition)
        ]);
        if (!this.isDropPossible(e)) {
            return false;
        }
        if (this.nodeDraggableService.getDraggedNode() || this.nodeDraggableService.getCheckedNodes().length > 0) {
            this.removeDraggedNodeClasses();
            this.notifyThatNodeWasDropped();
            this.releaseNodes();
        }
    };
    NodeDraggableDirective.prototype.determineDropPosition = function (e) {
        var dropPosition;
        var currentTarget = e.currentTarget;
        var elemHeight = currentTarget.offsetHeight;
        var relativeMousePosition = e.clientY - currentTarget.getBoundingClientRect().top;
        if (this.tree.isBranch()) {
            var third = elemHeight / 3;
            var twoThirds = third * 2;
            if (relativeMousePosition < third) {
                dropPosition = draggable_events_1.DropPosition.Above;
            }
            else if (relativeMousePosition >= third && relativeMousePosition <= twoThirds) {
                dropPosition = draggable_events_1.DropPosition.Into;
            }
            else {
                dropPosition = draggable_events_1.DropPosition.Below;
            }
        }
        else {
            var half = elemHeight / 2;
            if (relativeMousePosition <= half) {
                dropPosition = draggable_events_1.DropPosition.Above;
            }
            else {
                dropPosition = draggable_events_1.DropPosition.Below;
            }
        }
        return dropPosition;
    };
    NodeDraggableDirective.prototype.getDragOverClassName = function () {
        return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
    };
    NodeDraggableDirective.prototype.getDropPositionClassName = function (dropPosition) {
        switch (dropPosition) {
            case draggable_events_1.DropPosition.Above:
                return 'over-drop-above';
            case draggable_events_1.DropPosition.Into:
                return 'over-drop-into';
            case draggable_events_1.DropPosition.Below:
                return 'over-drop-below';
        }
    };
    NodeDraggableDirective.prototype.isDropPossible = function (e) {
        var _this = this;
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            return draggedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
        }
        else {
            var capturedNodes = this.nodeDraggableService.getCheckedNodes();
            return (capturedNodes.length > 0 &&
                capturedNodes.some(function (cn) { return cn.canBeDroppedAt(_this.nodeDraggable); }) &&
                this.containsElementAt(e));
        }
    };
    NodeDraggableDirective.prototype.releaseNodes = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            this.nodeDraggableService.releaseDraggedNode();
        }
        else {
            this.nodeDraggableService.releaseCheckedNodes();
        }
    };
    NodeDraggableDirective.prototype.applyDraggedNodeClasses = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            draggedNode.element.nativeElement.classList.add('being-dragged');
        }
        else {
            this.nodeDraggableService.getCheckedNodes().forEach(function (n) { return n.element.nativeElement.classList.add('being-dragged'); });
        }
    };
    NodeDraggableDirective.prototype.removeDraggedNodeClasses = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            draggedNode.element.nativeElement.classList.remove('being-dragged');
        }
        else {
            this.nodeDraggableService
                .getCheckedNodes()
                .forEach(function (n) { return n.element.nativeElement.classList.remove('being-dragged'); });
        }
    };
    NodeDraggableDirective.prototype.containsElementAt = function (e) {
        var _a = e.x, x = _a === void 0 ? e.clientX : _a, _b = e.y, y = _b === void 0 ? e.clientY : _b;
        return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
    };
    NodeDraggableDirective.prototype.addClasses = function (classNames) {
        var classList = this.nodeNativeElement.classList;
        classList.add.apply(classList, classNames);
    };
    NodeDraggableDirective.prototype.removeClasses = function (classNames) {
        var classList = this.nodeNativeElement.classList;
        classList.remove.apply(classList, classNames);
    };
    NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
        this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, this.currentDropPosition);
    };
    NodeDraggableDirective.prototype.notifyThatNodeIsBeingDragged = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNode();
        var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
        this.nodeDraggableService.fireNodeDragStart(nodes, this.nodeDraggable);
    };
    NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
    NodeDraggableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[nodeDraggable]'
                },] },
    ];
    /** @nocollapse */
    NodeDraggableDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: node_draggable_service_1.NodeDraggableService, decorators: [{ type: core_1.Inject, args: [node_draggable_service_1.NodeDraggableService,] },] },
        { type: core_1.Renderer2, decorators: [{ type: core_1.Inject, args: [core_1.Renderer2,] },] },
    ]; };
    NodeDraggableDirective.propDecorators = {
        "nodeDraggable": [{ type: core_1.Input },],
        "tree": [{ type: core_1.Input },],
    };
    return NodeDraggableDirective;
}());
exports.NodeDraggableDirective = NodeDraggableDirective;
//# sourceMappingURL=node-draggable.directive.js.map