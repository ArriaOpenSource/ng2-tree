"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDragStartEvent = exports.NodeDraggableEvent = exports.DropPosition = void 0;
var DropPosition;
(function (DropPosition) {
    DropPosition[DropPosition["Above"] = 0] = "Above";
    DropPosition[DropPosition["Into"] = 1] = "Into";
    DropPosition[DropPosition["Below"] = 2] = "Below";
})(DropPosition = exports.DropPosition || (exports.DropPosition = {}));
var NodeDraggableEvent = /** @class */ (function () {
    function NodeDraggableEvent(captured, target, position) {
        this.captured = captured;
        this.target = target;
        this.position = position;
    }
    return NodeDraggableEvent;
}());
exports.NodeDraggableEvent = NodeDraggableEvent;
var NodeDragStartEvent = /** @class */ (function () {
    function NodeDragStartEvent(captured, target) {
        this.captured = captured;
        this.target = target;
    }
    return NodeDragStartEvent;
}());
exports.NodeDragStartEvent = NodeDragStartEvent;
//# sourceMappingURL=draggable.events.js.map