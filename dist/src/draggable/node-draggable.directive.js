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
    NodeDraggableDirective.prototype.ngAfterViewInit = function () {
        if (this.tree.isBranch()) {
            this.appendDropAfterZone();
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
        e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'move';
    };
    NodeDraggableDirective.prototype.handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (this.tree.isBranch()) {
            if (this.isOverDropAfterZone(e)) {
                this.addClasses(['over-drop-after']);
            }
            else {
                this.removeClasses(['over-drop-after']);
            }
        }
    };
    NodeDraggableDirective.prototype.handleDragEnter = function (e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClasses(['over-drop-target', this.getDragOverClassName()]);
        }
    };
    NodeDraggableDirective.prototype.handleDragLeave = function (e) {
        if (!this.containsElementAt(e)) {
            this.removeClasses(['over-drop-target', this.getDragOverClassName()]);
            if (this.tree.isBranch()) {
                this.removeClasses(['over-drop-after']);
            }
        }
    };
    NodeDraggableDirective.prototype.handleDragEnd = function (e) {
        this.removeClasses(['over-drop-target', this.getDragOverClassName()]);
        if (this.tree.isBranch()) {
            this.removeClasses(['over-drop-after']);
        }
        this.releaseNodes();
    };
    NodeDraggableDirective.prototype.handleDrop = function (e) {
        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.removeClasses(['over-drop-target', this.getDragOverClassName()]);
        if (this.tree.isBranch()) {
            this.removeClasses(['over-drop-after']);
        }
        if (!this.isDropPossible(e)) {
            return false;
        }
        if (this.nodeDraggableService.getDraggedNodeNode() || this.nodeDraggableService.getCheckedNodes().length > 0) {
            var type = this.tree.isBranch() && this.isOverDropAfterZone(e) ? draggable_events_1.NodeDropType.DropAfter : draggable_events_1.NodeDropType.DropOn;
            this.notifyThatNodeWasDropped(type);
            this.releaseNodes();
        }
    };
    NodeDraggableDirective.prototype.appendDropAfterZone = function () {
        var style = 'display: block; width: 100%; margin-top: -0.66em; height: 0.66em; position: absolute; bottom: 0;';
        var div = document.createElement('div');
        div.setAttribute('style', style);
        div.classList.add('drop-after-zone');
        this.element.nativeElement.appendChild(div);
        this.dropAfterElement = div;
    };
    NodeDraggableDirective.prototype.isOverDropAfterZone = function (e) {
        return e.target === this.dropAfterElement;
    };
    NodeDraggableDirective.prototype.getDragOverClassName = function () {
        return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
    };
    NodeDraggableDirective.prototype.isDropPossible = function (e) {
        var _this = this;
        var draggedNode = this.nodeDraggableService.getDraggedNodeNode();
        if (draggedNode) {
            return (draggedNode.canBeDroppedAt(this.nodeDraggable) && (this.isOverDropAfterZone(e) || this.containsElementAt(e)));
        }
        else {
            var capturedNodes = this.nodeDraggableService.getCheckedNodes();
            return (capturedNodes.length > 0 &&
                capturedNodes.every(function (cn) { return cn.canBeDroppedAt(_this.nodeDraggable); }) &&
                (this.isOverDropAfterZone(e) || this.containsElementAt(e)));
        }
    };
    NodeDraggableDirective.prototype.releaseNodes = function () {
        var draggedNode = this.nodeDraggableService.getDraggedNodeNode();
        if (draggedNode) {
            this.nodeDraggableService.releaseDraggedNode();
        }
        else {
            this.nodeDraggableService.releaseCheckedNodes();
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
    NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function (dropType) {
        var draggedNode = this.nodeDraggableService.getDraggedNodeNode();
        var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
        this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, dropType);
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