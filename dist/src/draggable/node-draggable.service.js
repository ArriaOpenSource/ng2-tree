"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDraggableService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var draggable_events_1 = require("./draggable.events");
var i0 = require("@angular/core");
var NodeDraggableService = /** @class */ (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new rxjs_1.Subject();
        this.nodeDragStartEvents$ = new rxjs_1.Subject();
        this.checkedNodes = [];
    }
    NodeDraggableService.prototype.fireNodeDragged = function (captured, target, position) {
        if (captured.length === 0 || captured.every(function (cn) { return !cn.tree || cn.tree.isStatic(); })) {
            return;
        }
        this.draggableNodeEvents$.next(new draggable_events_1.NodeDraggableEvent(captured, target, position));
    };
    NodeDraggableService.prototype.fireNodeDragStart = function (captured, target) {
        if (captured.length === 0 || captured.every(function (cn) { return !cn.tree || cn.tree.isStatic(); })) {
            return;
        }
        this.nodeDragStartEvents$.next(new draggable_events_1.NodeDragStartEvent(captured, target));
    };
    NodeDraggableService.prototype.addCheckedNode = function (node) {
        this.checkedNodes.push(node);
    };
    NodeDraggableService.prototype.setDraggedNode = function (node) {
        this.draggedNode = node;
    };
    NodeDraggableService.prototype.removeCheckedNode = function (node) {
        var i = this.checkedNodes.indexOf(node);
        if (i > -1) {
            this.checkedNodes.splice(i, 1);
        }
    };
    NodeDraggableService.prototype.removeCheckedNodeById = function (id) {
        var i = this.checkedNodes.findIndex(function (cn) { return cn.tree.id === id; });
        if (i > -1) {
            this.checkedNodes.splice(i, 1);
        }
    };
    NodeDraggableService.prototype.getCheckedNodes = function () {
        return this.checkedNodes;
    };
    NodeDraggableService.prototype.getDraggedNode = function () {
        return this.draggedNode;
    };
    NodeDraggableService.prototype.releaseCheckedNodes = function () {
        this.checkedNodes = [];
    };
    NodeDraggableService.prototype.releaseDraggedNode = function () {
        this.draggedNode = null;
    };
    NodeDraggableService.ɵfac = function NodeDraggableService_Factory(t) { return new (t || NodeDraggableService)(); };
    NodeDraggableService.ɵprov = i0.ɵɵdefineInjectable({ token: NodeDraggableService, factory: NodeDraggableService.ɵfac });
    return NodeDraggableService;
}());
exports.NodeDraggableService = NodeDraggableService;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableService, [{
        type: core_1.Injectable
    }], null, null); })();
//# sourceMappingURL=node-draggable.service.js.map