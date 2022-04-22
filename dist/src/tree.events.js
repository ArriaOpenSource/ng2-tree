"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRenameInputChangeEvent = exports.NodeRenameKeydownEvent = exports.NodeIndeterminateEvent = exports.NodeUncheckedEvent = exports.NodeCheckedEvent = exports.LoadNextLevelEvent = exports.MenuItemSelectedEvent = exports.NodeCollapsedEvent = exports.NodeExpandedEvent = exports.NodeRenamedEvent = exports.NodeCreatedEvent = exports.NodeRemovedEvent = exports.NodeMovedEvent = exports.NodeDestructiveEvent = exports.NodeUnselectedEvent = exports.NodeSelectedEvent = exports.NodeDoubleClickedEvent = exports.NodeEvent = void 0;
var NodeEvent = /** @class */ (function () {
    function NodeEvent(node) {
        this.node = node;
    }
    return NodeEvent;
}());
exports.NodeEvent = NodeEvent;
var NodeDoubleClickedEvent = /** @class */ (function (_super) {
    __extends(NodeDoubleClickedEvent, _super);
    function NodeDoubleClickedEvent(node, e) {
        var _this = _super.call(this, node) || this;
        _this.e = e;
        return _this;
    }
    return NodeDoubleClickedEvent;
}(NodeEvent));
exports.NodeDoubleClickedEvent = NodeDoubleClickedEvent;
var NodeSelectedEvent = /** @class */ (function (_super) {
    __extends(NodeSelectedEvent, _super);
    function NodeSelectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeSelectedEvent;
}(NodeEvent));
exports.NodeSelectedEvent = NodeSelectedEvent;
var NodeUnselectedEvent = /** @class */ (function (_super) {
    __extends(NodeUnselectedEvent, _super);
    function NodeUnselectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUnselectedEvent;
}(NodeEvent));
exports.NodeUnselectedEvent = NodeUnselectedEvent;
var NodeDestructiveEvent = /** @class */ (function (_super) {
    __extends(NodeDestructiveEvent, _super);
    function NodeDestructiveEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeDestructiveEvent;
}(NodeEvent));
exports.NodeDestructiveEvent = NodeDestructiveEvent;
var NodeMovedEvent = /** @class */ (function (_super) {
    __extends(NodeMovedEvent, _super);
    function NodeMovedEvent(node, previousParent, previousPosition) {
        var _this = _super.call(this, node) || this;
        _this.previousParent = previousParent;
        _this.previousPosition = previousPosition;
        return _this;
    }
    return NodeMovedEvent;
}(NodeDestructiveEvent));
exports.NodeMovedEvent = NodeMovedEvent;
var NodeRemovedEvent = /** @class */ (function (_super) {
    __extends(NodeRemovedEvent, _super);
    function NodeRemovedEvent(node, lastIndex) {
        var _this = _super.call(this, node) || this;
        _this.lastIndex = lastIndex;
        return _this;
    }
    return NodeRemovedEvent;
}(NodeDestructiveEvent));
exports.NodeRemovedEvent = NodeRemovedEvent;
var NodeCreatedEvent = /** @class */ (function (_super) {
    __extends(NodeCreatedEvent, _super);
    function NodeCreatedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCreatedEvent;
}(NodeDestructiveEvent));
exports.NodeCreatedEvent = NodeCreatedEvent;
var NodeRenamedEvent = /** @class */ (function (_super) {
    __extends(NodeRenamedEvent, _super);
    function NodeRenamedEvent(node, oldValue, newValue) {
        var _this = _super.call(this, node) || this;
        _this.oldValue = oldValue;
        _this.newValue = newValue;
        return _this;
    }
    return NodeRenamedEvent;
}(NodeDestructiveEvent));
exports.NodeRenamedEvent = NodeRenamedEvent;
var NodeExpandedEvent = /** @class */ (function (_super) {
    __extends(NodeExpandedEvent, _super);
    function NodeExpandedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeExpandedEvent;
}(NodeEvent));
exports.NodeExpandedEvent = NodeExpandedEvent;
var NodeCollapsedEvent = /** @class */ (function (_super) {
    __extends(NodeCollapsedEvent, _super);
    function NodeCollapsedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCollapsedEvent;
}(NodeEvent));
exports.NodeCollapsedEvent = NodeCollapsedEvent;
var MenuItemSelectedEvent = /** @class */ (function (_super) {
    __extends(MenuItemSelectedEvent, _super);
    function MenuItemSelectedEvent(node, selectedItem) {
        var _this = _super.call(this, node) || this;
        _this.selectedItem = selectedItem;
        return _this;
    }
    return MenuItemSelectedEvent;
}(NodeEvent));
exports.MenuItemSelectedEvent = MenuItemSelectedEvent;
var LoadNextLevelEvent = /** @class */ (function (_super) {
    __extends(LoadNextLevelEvent, _super);
    function LoadNextLevelEvent(node) {
        return _super.call(this, node) || this;
    }
    return LoadNextLevelEvent;
}(NodeEvent));
exports.LoadNextLevelEvent = LoadNextLevelEvent;
var NodeCheckedEvent = /** @class */ (function (_super) {
    __extends(NodeCheckedEvent, _super);
    function NodeCheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCheckedEvent;
}(NodeEvent));
exports.NodeCheckedEvent = NodeCheckedEvent;
var NodeUncheckedEvent = /** @class */ (function (_super) {
    __extends(NodeUncheckedEvent, _super);
    function NodeUncheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUncheckedEvent;
}(NodeEvent));
exports.NodeUncheckedEvent = NodeUncheckedEvent;
var NodeIndeterminateEvent = /** @class */ (function (_super) {
    __extends(NodeIndeterminateEvent, _super);
    function NodeIndeterminateEvent(node, indeterminate) {
        var _this = _super.call(this, node) || this;
        _this.indeterminate = indeterminate;
        return _this;
    }
    return NodeIndeterminateEvent;
}(NodeEvent));
exports.NodeIndeterminateEvent = NodeIndeterminateEvent;
var NodeRenameKeydownEvent = /** @class */ (function (_super) {
    __extends(NodeRenameKeydownEvent, _super);
    function NodeRenameKeydownEvent(node, domEvent) {
        var _this = _super.call(this, node) || this;
        _this.domEvent = domEvent;
        return _this;
    }
    return NodeRenameKeydownEvent;
}(NodeEvent));
exports.NodeRenameKeydownEvent = NodeRenameKeydownEvent;
var NodeRenameInputChangeEvent = /** @class */ (function (_super) {
    __extends(NodeRenameInputChangeEvent, _super);
    function NodeRenameInputChangeEvent(node, domEvent) {
        var _this = _super.call(this, node) || this;
        _this.domEvent = domEvent;
        return _this;
    }
    return NodeRenameInputChangeEvent;
}(NodeEvent));
exports.NodeRenameInputChangeEvent = NodeRenameInputChangeEvent;
//# sourceMappingURL=tree.events.js.map