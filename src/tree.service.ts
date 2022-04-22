import {
  LoadNextLevelEvent,
  MenuItemSelectedEvent,
  NodeCheckedEvent,
  NodeCollapsedEvent,
  NodeCreatedEvent,
  NodeDoubleClickedEvent,
  NodeExpandedEvent,
  NodeIndeterminateEvent,
  NodeMovedEvent,
  NodeRemovedEvent,
  NodeRenamedEvent,
  NodeSelectedEvent,
  NodeUncheckedEvent,
  NodeUnselectedEvent,
  NodeRenameKeydownEvent,
  NodeRenameInputChangeEvent
} from './tree.events';
import { RenamableNode } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEvent, NodeDragStartEvent } from './draggable/draggable.events';
import { isEmpty } from './utils/fn.utils';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class TreeService {
  public nodeMoved$: Subject<NodeMovedEvent> = new Subject();
  public nodeMoveStarted$: Subject<NodeDragStartEvent> = new Subject();
  public nodeRemoved$: Subject<NodeRemovedEvent> = new Subject();
  public nodeRenamed$: Subject<NodeRenamedEvent> = new Subject();
  public nodeCreated$: Subject<NodeCreatedEvent> = new Subject();
  public nodeDoubleClicked$: Subject<NodeDoubleClickedEvent> = new Subject();
  public nodeSelected$: Subject<NodeSelectedEvent> = new Subject();
  public nodeUnselected$: Subject<NodeUnselectedEvent> = new Subject();
  public nodeExpanded$: Subject<NodeExpandedEvent> = new Subject();
  public nodeCollapsed$: Subject<NodeCollapsedEvent> = new Subject();
  public menuItemSelected$: Subject<MenuItemSelectedEvent> = new Subject();
  public loadNextLevel$: Subject<LoadNextLevelEvent> = new Subject();
  public nodeChecked$: Subject<NodeCheckedEvent> = new Subject();
  public nodeUnchecked$: Subject<NodeUncheckedEvent> = new Subject();
  public nodeIndeterminate$: Subject<NodeIndeterminateEvent> = new Subject();
  public nodeRenameKeydown$: Subject<NodeRenameKeydownEvent> = new Subject();
  public nodeRenameInputChange$: Subject<NodeRenameInputChangeEvent> = new Subject();

  private controllers: Map<string | number, TreeController> = new Map();

  public constructor(@Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService) {
    this.nodeRemoved$.subscribe((e: NodeRemovedEvent) => e.node.removeItselfFromParent());
    this.nodeDraggableService.nodeDragStartEvents$.subscribe((e: NodeDragStartEvent) => {
      this.nodeMoveStarted$.next(e);
    });
  }

  public unselectStream(tree: Tree): Observable<NodeSelectedEvent> {
    return this.nodeSelected$.pipe(filter((e: NodeSelectedEvent) => tree !== e.node));
  }

  public fireNodeRenameKeydownEvent(tree: Tree, e: KeyboardEvent): void {
    this.nodeRenameKeydown$.next(new NodeRenameKeydownEvent(tree, e));
  }

  public fireNodeRenameInputChanged(tree: Tree, e: Event): void {
    this.nodeRenameInputChange$.next(new NodeRenameInputChangeEvent(tree, e));
  }

  public fireNodeRemoved(tree: Tree): void {
    this.nodeRemoved$.next(new NodeRemovedEvent(tree, tree.positionInParent));
  }

  public fireNodeCreated(tree: Tree): void {
    this.nodeCreated$.next(new NodeCreatedEvent(tree));
  }

  public fireNodeDoubleClicked(tree: Tree, e: MouseEvent): void {
    this.nodeDoubleClicked$.next(new NodeDoubleClickedEvent(tree, e));
  }

  public fireNodeSelected(tree: Tree): void {
    this.nodeSelected$.next(new NodeSelectedEvent(tree));
  }

  public fireNodeUnselected(tree: Tree): void {
    this.nodeUnselected$.next(new NodeUnselectedEvent(tree));
  }

  public fireNodeRenamed(oldValue: RenamableNode | string, tree: Tree): void {
    this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
  }

  public fireNodeMoved(tree: Tree, parent: Tree, previousPosition?: number): void {
    this.nodeMoved$.next(new NodeMovedEvent(tree, parent, previousPosition));
  }

  public fireMenuItemSelected(tree: Tree, selectedItem: string): void {
    this.menuItemSelected$.next(new MenuItemSelectedEvent(tree, selectedItem));
  }

  public fireNodeSwitchFoldingType(tree: Tree): void {
    if (tree.isNodeExpanded()) {
      this.fireNodeExpanded(tree);
      if (this.shouldFireLoadNextLevel(tree)) {
        this.fireLoadNextLevel(tree);
      }
    } else if (tree.isNodeCollapsed()) {
      this.fireNodeCollapsed(tree);
    }
  }

  private fireNodeExpanded(tree: Tree): void {
    this.nodeExpanded$.next(new NodeExpandedEvent(tree));
  }

  private fireNodeCollapsed(tree: Tree): void {
    this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
  }

  private fireLoadNextLevel(tree: Tree): void {
    this.loadNextLevel$.next(new LoadNextLevelEvent(tree));
  }

  public fireNodeChecked(tree: Tree): void {
    this.nodeChecked$.next(new NodeCheckedEvent(tree));
  }

  public fireNodeUnchecked(tree: Tree): void {
    this.nodeUnchecked$.next(new NodeUncheckedEvent(tree));
  }

  public fireNodeIndeterminate(tree: Tree, indeterminate: boolean): void {
    this.nodeIndeterminate$.next(new NodeIndeterminateEvent(tree, indeterminate));
  }

  public draggedStream(tree: Tree, element: ElementRef): Observable<NodeDraggableEvent> {
    return this.nodeDraggableService.draggableNodeEvents$.pipe(
      filter((e: NodeDraggableEvent) => e.target === element),
      filter((e: NodeDraggableEvent) => !e.captured.some(cn => cn.tree.hasChild(tree)))
    );
  }

  public setController(id: string | number, controller: TreeController): void {
    this.controllers.set(id, controller);
  }

  public deleteController(id: string | number): void {
    if (this.controllers.has(id)) {
      this.controllers.delete(id);
    }
  }

  public getController(id: string | number): TreeController {
    if (this.controllers.has(id)) {
      return this.controllers.get(id);
    }

    return null;
  }

  public hasController(id: string | number): boolean {
    return this.controllers.has(id);
  }

  private shouldFireLoadNextLevel(tree: Tree): boolean {
    const shouldLoadNextLevel =
      tree.node.emitLoadNextLevel &&
      !tree.node.loadChildren &&
      !tree.childrenAreBeingLoaded() &&
      isEmpty(tree.children);

    if (shouldLoadNextLevel) {
      tree.loadingChildrenRequested();
    }

    return shouldLoadNextLevel;
  }
}
