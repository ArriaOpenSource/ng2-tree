import { NodeMenuItemAction } from './menu/menu.events';
import { MouseButtons } from './utils/event.utils';
import { get } from './utils/fn.utils';
export class TreeController {
    constructor(component) {
        this.component = component;
        this.tree = this.component.tree;
        this.treeService = this.component.treeService;
    }
    select() {
        if (!this.isSelected()) {
            this.component.onNodeSelected({ button: MouseButtons.Left });
        }
    }
    unselect() {
        if (this.isSelected()) {
            this.component.onNodeUnselected({ button: MouseButtons.Left });
        }
    }
    isSelected() {
        return this.component.isSelected;
    }
    expand() {
        if (this.isCollapsed()) {
            this.component.onSwitchFoldingType();
        }
    }
    expandToParent(tree = this.tree) {
        if (tree) {
            const controller = this.treeService.getController(tree.id);
            if (controller) {
                requestAnimationFrame(() => {
                    controller.expand();
                    this.expandToParent(tree.parent);
                });
            }
        }
    }
    isExpanded() {
        return this.tree.isNodeExpanded();
    }
    collapse() {
        if (this.isExpanded()) {
            this.component.onSwitchFoldingType();
        }
    }
    isCollapsed() {
        return this.tree.isNodeCollapsed();
    }
    toTreeModel() {
        return this.tree.toTreeModel();
    }
    rename(newValue) {
        this.tree.markAsBeingRenamed();
        this.component.applyNewValue({ type: 'keyup', value: newValue });
    }
    remove() {
        this.component.onMenuItemSelected({ nodeMenuItemAction: NodeMenuItemAction.Remove });
    }
    addChild(newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return;
        }
        const newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
    }
    addChildAsync(newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return Promise.reject(new Error('This node loads its children asynchronously, hence child cannot be added this way'));
        }
        const newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
        // This will give TreeInternalComponent to set up a controller for the node
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(newTree);
            });
        });
    }
    changeNodeId(id) {
        if (!id) {
            throw Error('You should supply an id!');
        }
        if (this.treeService.hasController(id)) {
            throw Error(`Controller already exists for the given id: ${id}`);
        }
        this.treeService.deleteController(this.tree.id);
        this.tree.id = id;
        this.treeService.setController(this.tree.id, this);
    }
    reloadChildren() {
        this.tree.reloadChildren();
    }
    setChildren(children) {
        if (!this.tree.isLeaf()) {
            this.tree.setChildren(children);
        }
    }
    startRenaming() {
        this.tree.markAsBeingRenamed();
    }
    check() {
        this.component.onNodeChecked();
    }
    uncheck(ignoreChildren = false) {
        this.component.onNodeUnchecked(ignoreChildren);
    }
    updateCheckboxState() {
        this.component.updateCheckboxState();
    }
    isChecked() {
        return this.tree.checked;
    }
    isIndeterminate() {
        return get(this.component, 'checkboxElementRef.nativeElement.indeterminate');
    }
    allowSelection() {
        this.tree.selectionAllowed = true;
    }
    forbidSelection() {
        this.tree.selectionAllowed = false;
    }
    isSelectionAllowed() {
        return this.tree.selectionAllowed;
    }
}
//# sourceMappingURL=tree-controller.js.map