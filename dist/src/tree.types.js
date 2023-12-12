import { defaultsDeep, get, omit } from './utils/fn.utils';
export class FoldingType {
    static { this.Expanded = new FoldingType('node-expanded'); }
    static { this.Collapsed = new FoldingType('node-collapsed'); }
    static { this.Empty = new FoldingType('node-empty'); }
    static { this.Leaf = new FoldingType('node-leaf'); }
    constructor(_cssClass) {
        this._cssClass = _cssClass;
    }
    get cssClass() {
        return this._cssClass;
    }
}
export class TreeModelSettings {
    static { this.NOT_CASCADING_SETTINGS = ['selectionAllowed']; }
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