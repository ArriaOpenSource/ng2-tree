"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStatus = exports.Ng2TreeSettings = exports.TreeModelSettings = exports.FoldingType = void 0;
var fn_utils_1 = require("./utils/fn.utils");
var FoldingType = /** @class */ (function () {
    function FoldingType(_cssClass) {
        this._cssClass = _cssClass;
    }
    Object.defineProperty(FoldingType.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        enumerable: false,
        configurable: true
    });
    FoldingType.Expanded = new FoldingType('node-expanded');
    FoldingType.Collapsed = new FoldingType('node-collapsed');
    FoldingType.Empty = new FoldingType('node-empty');
    FoldingType.Leaf = new FoldingType('node-leaf');
    return FoldingType;
}());
exports.FoldingType = FoldingType;
var TreeModelSettings = /** @class */ (function () {
    function TreeModelSettings() {
    }
    TreeModelSettings.merge = function (child, parent) {
        var parentCascadingSettings = fn_utils_1.omit(fn_utils_1.get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
        return fn_utils_1.defaultsDeep({}, fn_utils_1.get(child, 'settings'), parentCascadingSettings, {
            static: false,
            leftMenu: false,
            rightMenu: true,
            dragIcon: false,
            isCollapsedOnInit: false,
            checked: false,
            keepNodesInDOM: false,
            selectionAllowed: true
        });
    };
    TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
    return TreeModelSettings;
}());
exports.TreeModelSettings = TreeModelSettings;
var Ng2TreeSettings = /** @class */ (function () {
    function Ng2TreeSettings() {
        /**
         * Indicates root visibility in the tree. When true - root is invisible.
         * @name Ng2TreeSettings#rootIsVisible
         * @type boolean
         */
        /* eslint-disable */
        this.rootIsVisible = true;
        this.showCheckboxes = false;
        this.enableCheckboxes = true;
        this.ignoreParentOnCheck = false;
        /* eslint-enable */
    }
    return Ng2TreeSettings;
}());
exports.Ng2TreeSettings = Ng2TreeSettings;
var TreeStatus;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(TreeStatus = exports.TreeStatus || (exports.TreeStatus = {}));
//# sourceMappingURL=tree.types.js.map