import { LoadNextLevelEvent, MenuItemSelectedEvent, NodeCheckedEvent, NodeCollapsedEvent, NodeCreatedEvent, NodeDoubleClickedEvent, NodeExpandedEvent, NodeIndeterminateEvent, NodeMovedEvent, NodeRemovedEvent, NodeRenamedEvent, NodeSelectedEvent, NodeUncheckedEvent, NodeUnselectedEvent, NodeRenameKeydownEvent, NodeRenameInputChangeEvent } from './tree.events';
import { Inject, Injectable } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { isEmpty } from './utils/fn.utils';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./draggable/node-draggable.service";
export class TreeService {
    constructor(nodeDraggableService) {
        this.nodeDraggableService = nodeDraggableService;
        this.nodeMoved$ = new Subject();
        this.nodeMoveStarted$ = new Subject();
        this.nodeRemoved$ = new Subject();
        this.nodeRenamed$ = new Subject();
        this.nodeCreated$ = new Subject();
        this.nodeDoubleClicked$ = new Subject();
        this.nodeSelected$ = new Subject();
        this.nodeUnselected$ = new Subject();
        this.nodeExpanded$ = new Subject();
        this.nodeCollapsed$ = new Subject();
        this.menuItemSelected$ = new Subject();
        this.loadNextLevel$ = new Subject();
        this.nodeChecked$ = new Subject();
        this.nodeUnchecked$ = new Subject();
        this.nodeIndeterminate$ = new Subject();
        this.nodeRenameKeydown$ = new Subject();
        this.nodeRenameInputChange$ = new Subject();
        this.controllers = new Map();
        this.nodeRemoved$.subscribe((e) => e.node.removeItselfFromParent());
        this.nodeDraggableService.nodeDragStartEvents$.subscribe((e) => {
            this.nodeMoveStarted$.next(e);
        });
    }
    unselectStream(tree) {
        return this.nodeSelected$.pipe(filter((e) => tree !== e.node));
    }
    fireNodeRenameKeydownEvent(tree, e) {
        this.nodeRenameKeydown$.next(new NodeRenameKeydownEvent(tree, e));
    }
    fireNodeRenameInputChanged(tree, e) {
        this.nodeRenameInputChange$.next(new NodeRenameInputChangeEvent(tree, e));
    }
    fireNodeRemoved(tree) {
        this.nodeRemoved$.next(new NodeRemovedEvent(tree, tree.positionInParent));
    }
    fireNodeCreated(tree) {
        this.nodeCreated$.next(new NodeCreatedEvent(tree));
    }
    fireNodeDoubleClicked(tree, e) {
        this.nodeDoubleClicked$.next(new NodeDoubleClickedEvent(tree, e));
    }
    fireNodeSelected(tree) {
        this.nodeSelected$.next(new NodeSelectedEvent(tree));
    }
    fireNodeUnselected(tree) {
        this.nodeUnselected$.next(new NodeUnselectedEvent(tree));
    }
    fireNodeRenamed(oldValue, tree) {
        this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
    }
    fireNodeMoved(tree, parent, previousPosition) {
        this.nodeMoved$.next(new NodeMovedEvent(tree, parent, previousPosition));
    }
    fireMenuItemSelected(tree, selectedItem) {
        this.menuItemSelected$.next(new MenuItemSelectedEvent(tree, selectedItem));
    }
    fireNodeSwitchFoldingType(tree) {
        if (tree.isNodeExpanded()) {
            this.fireNodeExpanded(tree);
            if (this.shouldFireLoadNextLevel(tree)) {
                this.fireLoadNextLevel(tree);
            }
        }
        else if (tree.isNodeCollapsed()) {
            this.fireNodeCollapsed(tree);
        }
    }
    fireNodeExpanded(tree) {
        this.nodeExpanded$.next(new NodeExpandedEvent(tree));
    }
    fireNodeCollapsed(tree) {
        this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
    }
    fireLoadNextLevel(tree) {
        this.loadNextLevel$.next(new LoadNextLevelEvent(tree));
    }
    fireNodeChecked(tree) {
        this.nodeChecked$.next(new NodeCheckedEvent(tree));
    }
    fireNodeUnchecked(tree) {
        this.nodeUnchecked$.next(new NodeUncheckedEvent(tree));
    }
    fireNodeIndeterminate(tree, indeterminate) {
        this.nodeIndeterminate$.next(new NodeIndeterminateEvent(tree, indeterminate));
    }
    draggedStream(tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$.pipe(filter((e) => e.target === element), filter((e) => !e.captured.some(cn => cn.tree.hasChild(tree))));
    }
    setController(id, controller) {
        this.controllers.set(id, controller);
    }
    deleteController(id) {
        if (this.controllers.has(id)) {
            this.controllers.delete(id);
        }
    }
    getController(id) {
        if (this.controllers.has(id)) {
            return this.controllers.get(id);
        }
        return null;
    }
    hasController(id) {
        return this.controllers.has(id);
    }
    shouldFireLoadNextLevel(tree) {
        const shouldLoadNextLevel = tree.node.emitLoadNextLevel &&
            !tree.node.loadChildren &&
            !tree.childrenAreBeingLoaded() &&
            isEmpty(tree.children);
        if (shouldLoadNextLevel) {
            tree.loadingChildrenRequested();
        }
        return shouldLoadNextLevel;
    }
}
TreeService.ɵfac = function TreeService_Factory(t) { return new (t || TreeService)(i0.ɵɵinject(NodeDraggableService)); };
TreeService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TreeService, factory: TreeService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeService, [{
        type: Injectable
    }], function () { return [{ type: i1.NodeDraggableService, decorators: [{
                type: Inject,
                args: [NodeDraggableService]
            }] }]; }, null); })();
//# sourceMappingURL=tree.service.js.map