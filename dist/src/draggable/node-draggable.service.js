import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeDraggableEvent, NodeDragStartEvent } from './draggable.events';
import * as i0 from "@angular/core";
export class NodeDraggableService {
    constructor() {
        this.draggableNodeEvents$ = new Subject();
        this.nodeDragStartEvents$ = new Subject();
        this.checkedNodes = [];
    }
    fireNodeDragged(captured, target, position) {
        if (captured.length === 0 || captured.every(cn => !cn.tree || cn.tree.isStatic())) {
            return;
        }
        this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target, position));
    }
    fireNodeDragStart(captured, target) {
        if (captured.length === 0 || captured.every(cn => !cn.tree || cn.tree.isStatic())) {
            return;
        }
        this.nodeDragStartEvents$.next(new NodeDragStartEvent(captured, target));
    }
    addCheckedNode(node) {
        this.checkedNodes.push(node);
    }
    setDraggedNode(node) {
        this.draggedNode = node;
    }
    removeCheckedNode(node) {
        const i = this.checkedNodes.indexOf(node);
        if (i > -1) {
            this.checkedNodes.splice(i, 1);
        }
    }
    removeCheckedNodeById(id) {
        const i = this.checkedNodes.findIndex(cn => cn.tree.id === id);
        if (i > -1) {
            this.checkedNodes.splice(i, 1);
        }
    }
    getCheckedNodes() {
        return this.checkedNodes;
    }
    getDraggedNode() {
        return this.draggedNode;
    }
    releaseCheckedNodes() {
        this.checkedNodes = [];
    }
    releaseDraggedNode() {
        this.draggedNode = null;
    }
    static { this.ɵfac = function NodeDraggableService_Factory(t) { return new (t || NodeDraggableService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NodeDraggableService, factory: NodeDraggableService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=node-draggable.service.js.map