"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeDropType;
(function (NodeDropType) {
    NodeDropType[NodeDropType["DropOn"] = 0] = "DropOn";
    NodeDropType[NodeDropType["DropAfter"] = 1] = "DropAfter";
})(NodeDropType = exports.NodeDropType || (exports.NodeDropType = {}));
var NodeDraggableEvent = (function () {
    function NodeDraggableEvent(captured, target, type) {
        this.captured = captured;
        this.target = target;
        this.type = type;
    }
    return NodeDraggableEvent;
}());
exports.NodeDraggableEvent = NodeDraggableEvent;
//# sourceMappingURL=draggable.events.js.map