import { defaultsDeep, get, omit } from './utils/fn.utils';
export class FoldingType {
    constructor(_cssClass) {
        this._cssClass = _cssClass;
    }
    get cssClass() {
        return this._cssClass;
    }
}
FoldingType.Expanded = new FoldingType('node-expanded');
FoldingType.Collapsed = new FoldingType('node-collapsed');
FoldingType.Empty = new FoldingType('node-empty');
FoldingType.Leaf = new FoldingType('node-leaf');
export class TreeModelSettings {
    static merge(child, parent) {
        const parentCascadingSettings = omit(get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
        return defaultsDeep({}, get(child, 'settings'), parentCascadingSettings, {
            static: false,
            leftMenu: false,
            rightMenu: true,
            dragIcon: false,
            isCollapsedOnInit: false,
            checked: false,
            keepNodesInDOM: false,
            selectionAllowed: true
        });
    }
}
TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
export class Ng2TreeSettings {
    constructor() {
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
}
export var TreeStatus;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(TreeStatus || (TreeStatus = {}));
//# sourceMappingURL=tree.types.js.map