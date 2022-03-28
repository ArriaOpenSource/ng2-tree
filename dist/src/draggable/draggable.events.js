export var DropPosition;
(function (DropPosition) {
    DropPosition[DropPosition["Above"] = 0] = "Above";
    DropPosition[DropPosition["Into"] = 1] = "Into";
    DropPosition[DropPosition["Below"] = 2] = "Below";
})(DropPosition || (DropPosition = {}));
export class NodeDraggableEvent {
    constructor(captured, target, position) {
        this.captured = captured;
        this.target = target;
        this.position = position;
    }
}
export class NodeDragStartEvent {
    constructor(captured, target) {
        this.captured = captured;
        this.target = target;
    }
}
//# sourceMappingURL=draggable.events.js.map