import { LoadNextLevelEvent, MenuItemSelectedEvent, NodeCheckedEvent, NodeCollapsedEvent, NodeCreatedEvent, NodeDoubleClickedEvent, NodeExpandedEvent, NodeIndeterminateEvent, NodeMovedEvent, NodeRemovedEvent, NodeRenamedEvent, NodeSelectedEvent, NodeUncheckedEvent, NodeUnselectedEvent } from './tree.events';
import { RenamableNode } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ElementRef } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEvent, NodeDragStartEvent } from './draggable/draggable.events';
export declare class TreeService {
    private nodeDraggableService;
    nodeMoved$: Subject<NodeMovedEvent>;
    nodeMoveStarted$: Subject<NodeDragStartEvent>;
    nodeRemoved$: Subject<NodeRemovedEvent>;
    nodeRenamed$: Subject<NodeRenamedEvent>;
    nodeCreated$: Subject<NodeCreatedEvent>;
    nodeDoubleClicked$: Subject<NodeDoubleClickedEvent>;
    nodeSelected$: Subject<NodeSelectedEvent>;
    nodeUnselected$: Subject<NodeUnselectedEvent>;
    nodeExpanded$: Subject<NodeExpandedEvent>;
    nodeCollapsed$: Subject<NodeCollapsedEvent>;
    menuItemSelected$: Subject<MenuItemSelectedEvent>;
    loadNextLevel$: Subject<LoadNextLevelEvent>;
    nodeChecked$: Subject<NodeCheckedEvent>;
    nodeUnchecked$: Subject<NodeUncheckedEvent>;
    nodeIndeterminate$: Subject<NodeIndeterminateEvent>;
    private controllers;
    constructor(nodeDraggableService: NodeDraggableService);
    unselectStream(tree: Tree): Observable<NodeSelectedEvent>;
    fireNodeRemoved(tree: Tree): void;
    fireNodeCreated(tree: Tree): void;
    fireNodeDoubleClicked(tree: Tree, e: MouseEvent): void;
    fireNodeSelected(tree: Tree): void;
    fireNodeUnselected(tree: Tree): void;
    fireNodeRenamed(oldValue: RenamableNode | string, tree: Tree): void;
    fireNodeMoved(tree: Tree, parent: Tree, previousPosition?: number): void;
    fireMenuItemSelected(tree: Tree, selectedItem: string): void;
    fireNodeSwitchFoldingType(tree: Tree): void;
    private fireNodeExpanded(tree);
    private fireNodeCollapsed(tree);
    private fireLoadNextLevel(tree);
    fireNodeChecked(tree: Tree): void;
    fireNodeUnchecked(tree: Tree): void;
    fireNodeIndeterminate(tree: Tree, indeterminate: boolean): void;
    draggedStream(tree: Tree, element: ElementRef): Observable<NodeDraggableEvent>;
    setController(id: string | number, controller: TreeController): void;
    deleteController(id: string | number): void;
    getController(id: string | number): TreeController;
    hasController(id: string | number): boolean;
    private shouldFireLoadNextLevel(tree);
}
