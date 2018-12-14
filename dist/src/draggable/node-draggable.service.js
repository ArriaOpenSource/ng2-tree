"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var draggable_events_1 = require("./draggable.events");
var NodeDraggableService = (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new Subject_1.Subject();
        this.nodeDragStartEvents$ = new Subject_1.Subject();
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
    NodeDraggableService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NodeDraggableService.ctorParameters = function () { return []; };
    return NodeDraggableService;
}());
exports.NodeDraggableService = NodeDraggableService;
//# sourceMappingURL=node-draggable.service.js.map