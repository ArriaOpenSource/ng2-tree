import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { CapturedNode } from './captured-node';
import { Tree } from '../tree';
import { DropPosition } from './draggable.events';
import * as i0 from "@angular/core";
import * as i1 from "./node-draggable.service";
export class NodeDraggableDirective {
    static { this.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data'; }
    constructor(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    ngOnInit() {
        if (!this.tree.isStatic()) {
            this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
        }
    }
    ngOnDestroy() {
        this.disposersForDragListeners.forEach(dispose => dispose());
    }
    handleDragStart(e) {
        if (this.tree.isBeingRenamed()) {
            e.preventDefault();
            return;
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        // Checked nodes are already added to the service in checkedNodes array
        // This is like so to allow differentiating if dragging a list of checked nodes or single unchecked node.
        if (!this.tree.checked) {
            this.nodeDraggableService.setDraggedNode(new CapturedNode(this.nodeDraggable, this.tree));
        }
        this.notifyThatNodeIsBeingDragged();
        if (this.tree.node.settings.dragImageId) {
            const elem = document.getElementById(this.tree.node.settings.dragImageId);
            if (elem) {
                e.dataTransfer.setDragImage(elem, 0, 0);
            }
        }
        this.applyDraggedNodeClasses();
        e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'all';
    }
    handleDragOver(e) {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode && draggedNode.contains({ nativeElement: e.currentTarget })) {
            // Cannot drag and drop on itself
            return;
        }
        if (!draggedNode && this.tree.checked) {
            // Cannot drop multiple items onto themselves
            return;
        }
        const newDropPosition = this.determineDropPosition(e);
        this.removeClasses([this.getDropPositionClassName(this.currentDropPosition)]);
        if (this.tree.isBranch() && this.tree.isNodeExpanded() && newDropPosition === DropPosition.Below) {
            // Cannot drop below a branch node if it's expanded
            return;
        }
        if (draggedNode &&
            this.tree.isBranch() &&
            this.tree.hasChild(draggedNode.tree) &&
            newDropPosition === DropPosition.Into) {
            // Cannot drop into it's own parent
            return;
        }
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.addClasses([this.getDropPositionClassName(newDropPosition)]);
        this.currentDropPosition = newDropPosition;
    }
    handleDragEnter(e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClasses(['over-drop-target', this.getDragOverClassName()]);
        }
    }
    handleDragLeave(e) {
        if (!this.containsElementAt(e)) {
            this.removeClasses([
                'over-drop-target',
                this.getDragOverClassName(),
                this.getDropPositionClassName(this.currentDropPosition)
            ]);
        }
    }
    handleDragEnd(e) {
        this.removeClasses([
            'over-drop-target',
            this.getDragOverClassName(),
            this.getDropPositionClassName(this.currentDropPosition)
        ]);
        this.removeDraggedNodeClasses();
        this.nodeDraggableService.releaseDraggedNode();
    }
    handleDrop(e) {
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
    }
    determineDropPosition(e) {
        let dropPosition;
        const currentTarget = e.currentTarget;
        const elemHeight = currentTarget.offsetHeight;
        const relativeMousePosition = e.clientY - currentTarget.getBoundingClientRect().top;
        if (this.tree.isBranch()) {
            const third = elemHeight / 3;
            const twoThirds = third * 2;
            if (relativeMousePosition < third) {
                dropPosition = DropPosition.Above;
            }
            else if (relativeMousePosition >= third && relativeMousePosition <= twoThirds) {
                dropPosition = DropPosition.Into;
            }
            else {
                dropPosition = DropPosition.Below;
            }
        }
        else {
            const half = elemHeight / 2;
            if (relativeMousePosition <= half) {
                dropPosition = DropPosition.Above;
            }
            else {
                dropPosition = DropPosition.Below;
            }
        }
        return dropPosition;
    }
    getDragOverClassName() {
        return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
    }
    getDropPositionClassName(dropPosition) {
        switch (dropPosition) {
            case DropPosition.Above:
                return 'over-drop-above';
            case DropPosition.Into:
                return 'over-drop-into';
            case DropPosition.Below:
                return 'over-drop-below';
        }
    }
    isDropPossible(e) {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            return draggedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
        }
        else {
            const capturedNodes = this.nodeDraggableService.getCheckedNodes();
            return (capturedNodes.length > 0 &&
                capturedNodes.some(cn => cn.canBeDroppedAt(this.nodeDraggable)) &&
                this.containsElementAt(e));
        }
    }
    releaseNodes() {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            this.nodeDraggableService.releaseDraggedNode();
        }
        else {
            this.nodeDraggableService.releaseCheckedNodes();
        }
    }
    applyDraggedNodeClasses() {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            draggedNode.element.nativeElement.classList.add('being-dragged');
        }
        else {
            this.nodeDraggableService.getCheckedNodes().forEach(n => n.element.nativeElement.classList.add('being-dragged'));
        }
    }
    removeDraggedNodeClasses() {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        if (draggedNode) {
            draggedNode.element.nativeElement.classList.remove('being-dragged');
        }
        else {
            this.nodeDraggableService
                .getCheckedNodes()
                .forEach(n => n.element.nativeElement.classList.remove('being-dragged'));
        }
    }
    containsElementAt(e) {
        const { x = e.clientX, y = e.clientY } = e;
        return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
    }
    addClasses(classNames) {
        const classList = this.nodeNativeElement.classList;
        classList.add(...classNames);
    }
    removeClasses(classNames) {
        const classList = this.nodeNativeElement.classList;
        classList.remove(...classNames);
    }
    notifyThatNodeWasDropped() {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        const nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
        this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, this.currentDropPosition);
    }
    notifyThatNodeIsBeingDragged() {
        const draggedNode = this.nodeDraggableService.getDraggedNode();
        const nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
        this.nodeDraggableService.fireNodeDragStart(nodes, this.nodeDraggable);
    }
    static { this.ɵfac = function NodeDraggableDirective_Factory(t) { return new (t || NodeDraggableDirective)(i0.ɵɵdirectiveInject(ElementRef), i0.ɵɵdirectiveInject(NodeDraggableService), i0.ɵɵdirectiveInject(Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NodeDraggableDirective, selectors: [["", "nodeDraggable", ""]], inputs: { nodeDraggable: "nodeDraggable", tree: "tree" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableDirective, [{
        type: Directive,
        args: [{
                selector: '[nodeDraggable]'
            }]
    }], () => [{ type: i0.ElementRef, decorators: [{
                type: Inject,
                args: [ElementRef]
            }] }, { type: i1.NodeDraggableService, decorators: [{
                type: Inject,
                args: [NodeDraggableService]
            }] }, { type: i0.Renderer2, decorators: [{
                type: Inject,
                args: [Renderer2]
            }] }], { nodeDraggable: [{
            type: Input
        }], tree: [{
            type: Input
        }] }); })();
//# sourceMappingURL=node-draggable.directive.js.map