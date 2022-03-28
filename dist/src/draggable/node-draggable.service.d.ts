import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CapturedNode } from './captured-node';
import { NodeDraggableEvent, DropPosition, NodeDragStartEvent } from './draggable.events';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NodeDraggableService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NodeDraggableService>;
}
