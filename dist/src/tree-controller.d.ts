import { Tree } from './tree';
import { TreeModel } from './tree.types';
import { TreeInternalComponent } from './tree-internal.component';
export declare class TreeController {
    private component;
    private tree;
    private treeService;
    constructor(component: TreeInternalComponent);
    select(): void;
    unselect(): void;
    isSelected(): boolean;
    expand(): void;
    expandToParent(tree?: any): void;
    isExpanded(): boolean;
    collapse(): void;
    isCollapsed(): boolean;
    toTreeModel(): TreeModel;
    rename(newValue: string): void;
    remove(): void;
    addChild(newNode: TreeModel): void;
    addChildAsync(newNode: TreeModel): Promise<Tree>;
    changeNodeId(id: string | number): void;
    reloadChildren(): void;
    setChildren(children: TreeModel[]): void;
    startRenaming(): void;
    check(): void;
    uncheck(ignoreChildren?: boolean): void;
    updateCheckboxState(): void;
    isChecked(): boolean;
    isIndeterminate(): boolean;
    allowSelection(): void;
    forbidSelection(): void;
    isSelectionAllowed(): boolean;
}
