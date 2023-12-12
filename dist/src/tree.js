import { defaultsDeep, get, has, includes, isEmpty, isFunction, isNil, omit, once, size, trim } from './utils/fn.utils';
import { FoldingType, TreeModelSettings, TreeStatus } from './tree.types';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
var ChildrenLoadingState;
(function (ChildrenLoadingState) {
    ChildrenLoadingState[ChildrenLoadingState["NotStarted"] = 0] = "NotStarted";
    ChildrenLoadingState[ChildrenLoadingState["Loading"] = 1] = "Loading";
    ChildrenLoadingState[ChildrenLoadingState["Completed"] = 2] = "Completed";
})(ChildrenLoadingState || (ChildrenLoadingState = {}));
export class Tree {
    // STATIC METHODS ----------------------------------------------------------------------------------------------------
    /**
     * Check that value passed is not empty (it doesn't consist of only whitespace symbols).
     * @param {string} value - A value that should be checked.
     * @returns {boolean} - A flag indicating that value is empty or not.
     * @static
     */
    static isValueEmpty(value) {
        return isEmpty(trim(value));
    }
    /**
     * Check whether a given value can be considered RenamableNode.
     * @param {any} value - A value to check.
     * @returns {boolean} - A flag indicating whether given value is Renamable node or not.
     * @static
     */
    static isRenamable(value) {
        return (has(value, 'setName') &&
            isFunction(value.setName) &&
            (has(value, 'toString') && isFunction(value.toString) && value.toString !== Object.toString));
    }
    static cloneTreeShallow(origin) {
        const tree = new Tree(Object.assign({}, origin.node));
        tree._children = origin._children;
        return tree;
    }
    static applyNewValueToRenamable(value, newValue) {
        const renamableValue = Object.assign({}, value);
        renamableValue.setName(newValue);
        return renamableValue;
    }
    /**
     * Build an instance of Tree from an object implementing TreeModel interface.
     * @param {TreeModel} model - A model that is used to build a tree.
     * @param {Tree} [parent] - An optional parent if you want to build a tree from the model that should be a child of an existing Tree instance.
     * @param {boolean} [isBranch] - An option that makes a branch from created tree. Branch can have children.
     */
    constructor(node, parent = null, isBranch = false) {
        this._childrenLoadingState = ChildrenLoadingState.NotStarted;
        this._childrenAsyncOnce = once(() => {
            return new Observable((observer) => {
                setTimeout(() => {
                    this._childrenLoadingState = ChildrenLoadingState.Loading;
                    this._loadChildren((children) => {
                        this._children = (children || []).map((child) => new Tree(child, this));
                        this._childrenLoadingState = ChildrenLoadingState.Completed;
                        observer.next(this.children);
                        observer.complete();
                    });
                });
            });
        });
        this.buildTreeFromModel(node, parent, isBranch || Array.isArray(node.children));
    }
    buildTreeFromModel(model, parent, isBranch) {
        this.parent = parent;
        this.node = Object.assign(omit(model, 'children'), { settings: TreeModelSettings.merge(model, get(parent, 'node')) }, { emitLoadNextLevel: model.emitLoadNextLevel === true });
        if (isFunction(this.node.loadChildren)) {
            this._loadChildren = this.node.loadChildren;
        }
        else {
            get(model, 'children', []).forEach((child, index) => {
                this._addChild(new Tree(child, this), index);
            });
        }
        if (!Array.isArray(this._children)) {
            this._children = this.node.loadChildren || isBranch ? [] : null;
        }
    }
    hasDeferredChildren() {
        return typeof this._loadChildren === 'function';
    }
    /* Setting the children loading state to Loading since a request was dispatched to the client */
    loadingChildrenRequested() {
        this._childrenLoadingState = ChildrenLoadingState.Loading;
    }
    /**
     * Check whether children of the node are being loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children are being loaded.
     */
    childrenAreBeingLoaded() {
        return this._childrenLoadingState === ChildrenLoadingState.Loading;
    }
    /**
     * Check whether children of the node were loaded.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children were loaded.
     */
    childrenWereLoaded() {
        return this._childrenLoadingState === ChildrenLoadingState.Completed;
    }
    canLoadChildren() {
        return (this._childrenLoadingState === ChildrenLoadingState.NotStarted &&
            this.foldingType === FoldingType.Expanded &&
            !!this._loadChildren);
    }
    /**
     * Check whether children of the node should be loaded and not loaded yet.
     * Makes sense only for nodes that define `loadChildren` function.
     * @returns {boolean} A flag indicating that children should be loaded for the current node.
     */
    childrenShouldBeLoaded() {
        return !this.childrenWereLoaded() && (!!this._loadChildren || this.node.emitLoadNextLevel === true);
    }
    /**
     * Get children of the current tree.
     * @returns {Tree[]} The children of the current tree.
     */
    get children() {
        return this._children;
    }
    /**
     * By getting value from this property you start process of loading node's children using `loadChildren` function.
     * Once children are loaded `loadChildren` function won't be called anymore and loaded for the first time children are emitted in case of subsequent calls.
     * @returns {Observable<Tree[]>} An observable which emits children once they are loaded.
     */
    get childrenAsync() {
        if (this.canLoadChildren()) {
            return this._childrenAsyncOnce();
        }
        return of(this.children);
    }
    /**
     * By calling this method you start process of loading node's children using `loadChildren` function.
     */
    reloadChildren() {
        if (this.childrenShouldBeLoaded()) {
            this._childrenLoadingState = ChildrenLoadingState.Loading;
            this._loadChildren((children) => {
                this._children = children && children.map((child) => new Tree(child, this));
                this._childrenLoadingState = ChildrenLoadingState.Completed;
            });
        }
    }
    /**
     * By calling this method you will remove all current children of a treee and create new.
     */
    setChildren(children) {
        this._children = children && children.map((child) => new Tree(child, this));
        if (this.childrenShouldBeLoaded()) {
            this._childrenLoadingState = ChildrenLoadingState.Completed;
        }
    }
    /**
     * Create a new node in the current tree.
     * @param {boolean} isBranch - A flag that indicates whether a new node should be a "Branch". "Leaf" node will be created by default
     * @param {TreeModel} model - Tree model of the new node which will be inserted. Empty node will be created by default and it will fire edit mode of this node
     * @returns {Tree} A newly created child node.
     */
    createNode(isBranch, model = { value: '' }) {
        const tree = new Tree(model, this, isBranch);
        if (!model.id) {
            tree.markAsNew();
        }
        tree.id = tree.id || uuidv4();
        if (this.childrenShouldBeLoaded() && !(this.childrenAreBeingLoaded() || this.childrenWereLoaded())) {
            return null;
        }
        if (this.isLeaf()) {
            return this.addSibling(tree);
        }
        else {
            return this.addChild(tree);
        }
    }
    /**
     * Get the value of the current node
     * @returns {(string|RenamableNode)} The value of the node.
     */
    get value() {
        return this.node.value;
    }
    set checked(checked) {
        this.node.settings = Object.assign({}, this.node.settings, { checked });
    }
    get checked() {
        return !!get(this.node.settings, 'checked');
    }
    get checkedChildren() {
        return this.hasLoadedChildren() ? this.children.filter(child => child.checked) : [];
    }
    set selectionAllowed(selectionAllowed) {
        this.node.settings = Object.assign({}, this.node.settings, { selectionAllowed });
    }
    get selectionAllowed() {
        const value = get(this.node.settings, 'selectionAllowed');
        return isNil(value) ? true : !!value;
    }
    hasLoadedChildren() {
        return !isEmpty(this.children);
    }
    loadedChildrenAmount() {
        return size(this.children);
    }
    checkedChildrenAmount() {
        return size(this.checkedChildren);
    }
    /**
     * Set the value of the current node
     * @param {(string|RenamableNode)} value - The new value of the node.
     */
    set value(value) {
        if (typeof value !== 'string' && !Tree.isRenamable(value)) {
            return;
        }
        const stringifiedValue = '' + value;
        if (Tree.isRenamable(this.value)) {
            this.node.value = Tree.applyNewValueToRenamable(this.value, stringifiedValue);
        }
        else {
            this.node.value = Tree.isValueEmpty(stringifiedValue) ? this.node.value : stringifiedValue;
        }
    }
    /**
     * Add a sibling node for the current node. This won't work if the current node is a root.
     * @param {Tree} sibling - A node that should become a sibling.
     * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in a parent.
     * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
     */
    addSibling(sibling, position) {
        if (Array.isArray(get(this.parent, 'children'))) {
            return this.parent.addChild(sibling, position);
        }
        return null;
    }
    /**
     * Add a child node for the current node.
     * @param {Tree} child - A node that should become a child.
     * @param [number] position - Position in which child will be inserted. By default it will be inserted at the last position in a parent.
     * @returns {Tree} A newly inserted child.
     */
    addChild(child, position) {
        const newborn = this._addChild(Tree.cloneTreeShallow(child), position);
        this._setFoldingType();
        if (this.isNodeCollapsed()) {
            this.switchFoldingType();
        }
        return newborn;
    }
    _addChild(child, position = size(this._children) || 0) {
        child.parent = this;
        if (Array.isArray(this._children)) {
            this._children.splice(position, 0, child);
        }
        else {
            this._children = [child];
        }
        return child;
    }
    /**
     * Moves a given sibling above the this node.
     * If node passed as a parameter is not a sibling - nothing happens.
     * @param {Tree} sibling - A sibling to move
     */
    moveSiblingAbove(sibling) {
        if (!this.hasSibling(sibling)) {
            return;
        }
        const siblings = this.parent._children;
        const siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
        const insertAtIndex = this.positionInParent;
        siblings.splice(insertAtIndex, 0, siblingToMove);
    }
    /**
     * Moves a given sibling below the this node.
     * If node passed as a parameter is not a sibling - nothing happens.
     * @param {Tree} sibling - A sibling to move
     */
    moveSiblingBelow(sibling) {
        if (!this.hasSibling(sibling)) {
            return;
        }
        const siblings = this.parent._children;
        const siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
        const insertAtIndex = this.positionInParent + 1;
        siblings.splice(insertAtIndex, 0, siblingToMove);
    }
    /**
     * Get a node's position in its parent.
     * @returns {number} The position inside a parent.
     */
    get positionInParent() {
        if (this.isRoot()) {
            return -1;
        }
        return this.parent.children ? this.parent.children.indexOf(this) : -1;
    }
    /**
     * Check whether or not this tree is static.
     * @returns {boolean} A flag indicating whether or not this tree is static.
     */
    isStatic() {
        return get(this.node.settings, 'static', false);
    }
    /**
     * Check whether or not this tree has a left menu.
     * @returns {boolean} A flag indicating whether or not this tree has a left menu.
     */
    hasLeftMenu() {
        return !get(this.node.settings, 'static', false) && get(this.node.settings, 'leftMenu', false);
    }
    /**
     * Check whether or not this tree has a right menu.
     * @returns {boolean} A flag indicating whether or not this tree has a right menu.
     */
    hasRightMenu() {
        return !get(this.node.settings, 'static', false) && get(this.node.settings, 'rightMenu', false);
    }
    /**
     * Check whether or not this tree should show a drag icon.
     * @returns {boolean} A flag indicating whether or not this tree has a left menu.
     */
    hasDragIcon() {
        return !get(this.node.settings, 'static', false) && get(this.node.settings, 'dragIcon', false);
    }
    /**
     * Check whether this tree is "Leaf" or not.
     * @returns {boolean} A flag indicating whether or not this tree is a "Leaf".
     */
    isLeaf() {
        return !this.isBranch();
    }
    /**
     * Get menu items of the current tree.
     * @returns {NodeMenuItem[]} The menu items of the current tree.
     */
    get menuItems() {
        return get(this.node.settings, 'menuItems');
    }
    /**
     * Check whether or not this tree has a custom menu.
     * @returns {boolean} A flag indicating whether or not this tree has a custom menu.
     */
    hasCustomMenu() {
        return !this.isStatic() && !!get(this.node.settings, 'menuItems', false);
    }
    /**
     * Check whether this tree is "Branch" or not. "Branch" is a node that has children.
     * @returns {boolean} A flag indicating whether or not this tree is a "Branch".
     */
    isBranch() {
        return this.node.emitLoadNextLevel === true || Array.isArray(this._children);
    }
    /**
     * Check whether this tree has children.
     * @returns {boolean} A flag indicating whether or not this tree has children.
     */
    hasChildren() {
        return !isEmpty(this._children) || this.childrenShouldBeLoaded();
    }
    /**
     * Check whether this tree is a root or not. The root is the tree (node) that doesn't have parent (or technically its parent is null).
     * @returns {boolean} A flag indicating whether or not this tree is the root.
     */
    isRoot() {
        return isNil(this.parent);
    }
    /**
     * Check whether provided tree is a sibling of the current tree. Sibling trees (nodes) are the trees that have the same parent.
     * @param {Tree} tree - A tree that should be tested on a siblingness.
     * @returns {boolean} A flag indicating whether or not provided tree is the sibling of the current one.
     */
    hasSibling(tree) {
        return !this.isRoot() && includes(this.parent.children, tree);
    }
    /**
     * Check whether provided tree is a child of the current tree.
     * This method tests that provided tree is a <strong>direct</strong> child of the current tree.
     * @param {Tree} tree - A tree that should be tested (child candidate).
     * @returns {boolean} A flag indicating whether provided tree is a child or not.
     */
    hasChild(tree) {
        return includes(this._children, tree);
    }
    /**
     * Remove given tree from the current tree.
     * The given tree will be removed only in case it is a direct child of the current tree (@see {@link hasChild}).
     * @param {Tree} tree - A tree that should be removed.
     */
    removeChild(tree) {
        if (!this.hasChildren()) {
            return;
        }
        const childIndex = this._children.findIndex((child) => child === tree);
        if (childIndex >= 0) {
            this._children.splice(childIndex, 1);
        }
        this._setFoldingType();
    }
    /**
     * Remove current tree from its parent.
     */
    removeItselfFromParent() {
        if (!this.parent) {
            return;
        }
        this.parent.removeChild(this);
    }
    /**
     * Switch folding type of the current tree. "Leaf" node cannot switch its folding type cause it doesn't have children, hence nothing to fold.
     * If node is a "Branch" and it is expanded, then by invoking current method state of the tree should be switched to "collapsed" and vice versa.
     */
    switchFoldingType() {
        if (this.isLeaf() || !this.hasChildren()) {
            return;
        }
        this.disableCollapseOnInit();
        this.node._foldingType = this.isNodeExpanded() ? FoldingType.Collapsed : FoldingType.Expanded;
    }
    /**
     * Check that tree is expanded.
     * @returns {boolean} A flag indicating whether current tree is expanded. Always returns false for the "Leaf" tree and for an empty tree.
     */
    isNodeExpanded() {
        return this.foldingType === FoldingType.Expanded;
    }
    /**
     * Check that tree is collapsed.
     * @returns {boolean} A flag indicating whether current tree is collapsed. Always returns false for the "Leaf" tree and for an empty tree.
     */
    isNodeCollapsed() {
        return this.foldingType === FoldingType.Collapsed;
    }
    /**
     * Set a current folding type: expanded, collapsed or leaf.
     */
    _setFoldingType() {
        if (this.childrenShouldBeLoaded()) {
            this.node._foldingType = FoldingType.Collapsed;
        }
        else if (this._children && !isEmpty(this._children)) {
            this.node._foldingType = this.isCollapsedOnInit() ? FoldingType.Collapsed : FoldingType.Expanded;
        }
        else if (Array.isArray(this._children)) {
            this.node._foldingType = FoldingType.Empty;
        }
        else {
            this.node._foldingType = FoldingType.Leaf;
        }
    }
    /**
     * Get a current folding type: expanded, collapsed or leaf.
     * @returns {FoldingType} A folding type of the current tree.
     */
    get foldingType() {
        if (!this.node._foldingType) {
            this._setFoldingType();
        }
        return this.node._foldingType;
    }
    /**
     * Get a css class for element which displayes folding state - expanded, collapsed or leaf
     * @returns {string} A string icontaining css class (classes)
     */
    get foldingCssClass() {
        return this.getCssClassesFromSettings() || this.foldingType.cssClass;
    }
    getCssClassesFromSettings() {
        if (!this.node._foldingType) {
            this._setFoldingType();
        }
        if (this.node._foldingType === FoldingType.Collapsed) {
            return get(this.node.settings, 'cssClasses.collapsed', null);
        }
        else if (this.node._foldingType === FoldingType.Expanded) {
            return get(this.node.settings, 'cssClasses.expanded', null);
        }
        else if (this.node._foldingType === FoldingType.Empty) {
            return get(this.node.settings, 'cssClasses.empty', null);
        }
        return get(this.node.settings, 'cssClasses.leaf', null);
    }
    /**
     * Get a html template to render before every node's name.
     * @returns {string} A string representing a html template.
     */
    get nodeTemplate() {
        return this.getTemplateFromSettings();
    }
    getTemplateFromSettings() {
        if (this.isLeaf()) {
            return get(this.node.settings, 'templates.leaf', '');
        }
        else {
            return get(this.node.settings, 'templates.node', '');
        }
    }
    /**
     * Get a html template to render for an element activatin left menu of a node.
     * @returns {string} A string representing a html template.
     */
    get leftMenuTemplate() {
        if (this.hasLeftMenu()) {
            return get(this.node.settings, 'templates.leftMenu', '<span></span>');
        }
        return '';
    }
    get dragTemplate() {
        return get(this.node.settings, 'templates.dragIcon', '<span></span>');
    }
    disableCollapseOnInit() {
        if (this.node.settings) {
            this.node.settings.isCollapsedOnInit = false;
        }
    }
    isCollapsedOnInit() {
        return !!get(this.node.settings, 'isCollapsedOnInit');
    }
    keepNodesInDOM() {
        return get(this.node.settings, 'keepNodesInDOM');
    }
    /**
     * Check that current tree is newly created (added by user via menu for example). Tree that was built from the TreeModel is not marked as new.
     * @returns {boolean} A flag whether the tree is new.
     */
    isNew() {
        return this.node._status === TreeStatus.New;
    }
    get id() {
        return get(this.node, 'id');
    }
    set id(id) {
        this.node.id = id;
    }
    /**
     * Mark current tree as new (@see {@link isNew}).
     */
    markAsNew() {
        this.node._status = TreeStatus.New;
    }
    /**
     * Check that current tree is being renamed (it is in the process of its value renaming initiated by a user).
     * @returns {boolean} A flag whether the tree is being renamed.
     */
    isBeingRenamed() {
        return this.node._status === TreeStatus.IsBeingRenamed;
    }
    /**
     * Mark current tree as being renamed (@see {@link isBeingRenamed}).
     */
    markAsBeingRenamed() {
        this.node._status = TreeStatus.IsBeingRenamed;
    }
    /**
     * Check that current tree is modified (for example it was renamed).
     * @returns {boolean} A flag whether the tree is modified.
     */
    isModified() {
        return this.node._status === TreeStatus.Modified;
    }
    /**
     * Mark current tree as modified (@see {@link isModified}).
     */
    markAsModified() {
        this.node._status = TreeStatus.Modified;
    }
    /**
     * Makes a clone of an underlying TreeModel instance
     * @returns {TreeModel} a clone of an underlying TreeModel instance
     */
    toTreeModel() {
        const model = defaultsDeep(this.isLeaf() ? {} : { children: [] }, this.node);
        if (this.children) {
            this.children.forEach(child => {
                model.children.push(child.toTreeModel());
            });
        }
        return model;
    }
}
//# sourceMappingURL=tree.js.map