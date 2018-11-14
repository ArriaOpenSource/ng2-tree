import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CapturedNode } from './captured-node';
import { NodeDraggableEvent, DropPosition, NodeDragStartEvent } from './draggable.events';
export declare class NodeDraggableService {
    draggableNodeEvents$: Subject<NodeDraggableEvent>;
    nodeDragStartEvents$: Subject<NodeDragStartEvent>;
    private checkedNodes;
    private draggedNode;
    fireNodeDragged(captured: CapturedNode[], target: ElementRef, position: DropPosition): void;
    fireNodeDragStart(captured: CapturedNode[], target: ElementRef): void;
    addCheckedNode(node: CapturedNode): void;
    setDraggedNode(node: CapturedNode): void;
    removeCheckedNode(node: CapturedNode): void;
    removeCheckedNodeById(id: string | number): void;
    getCheckedNodes(): CapturedNode[];
    getDraggedNode(): CapturedNode;
    releaseCheckedNodes(): void;
    releaseDraggedNode(): void;
}
