export class NodeEvent {
    constructor(node) {
        this.node = node;
    }
}
export class NodeDoubleClickedEvent extends NodeEvent {
    constructor(node, e) {
        super(node);
        this.e = e;
    }
}
export class NodeSelectedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeUnselectedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeDestructiveEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeMovedEvent extends NodeDestructiveEvent {
    constructor(node, previousParent, previousPosition) {
        super(node);
        this.previousParent = previousParent;
        this.previousPosition = previousPosition;
    }
}
export class NodeRemovedEvent extends NodeDestructiveEvent {
    constructor(node, lastIndex) {
        super(node);
        this.lastIndex = lastIndex;
    }
}
export class NodeCreatedEvent extends NodeDestructiveEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeRenamedEvent extends NodeDestructiveEvent {
    constructor(node, oldValue, newValue) {
        super(node);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
export class NodeExpandedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeCollapsedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class MenuItemSelectedEvent extends NodeEvent {
    constructor(node, selectedItem) {
        super(node);
        this.selectedItem = selectedItem;
    }
}
export class LoadNextLevelEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeCheckedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeUncheckedEvent extends NodeEvent {
    constructor(node) {
        super(node);
    }
}
export class NodeIndeterminateEvent extends NodeEvent {
    constructor(node, indeterminate) {
        super(node);
        this.indeterminate = indeterminate;
    }
}
export class NodeRenameKeydownEvent extends NodeEvent {
    constructor(node, domEvent) {
        super(node);
        this.domEvent = domEvent;
    }
}
export class NodeRenameInputChangeEvent extends NodeEvent {
    constructor(node, domEvent) {
        super(node);
        this.domEvent = domEvent;
    }
}
//# sourceMappingURL=tree.events.js.map