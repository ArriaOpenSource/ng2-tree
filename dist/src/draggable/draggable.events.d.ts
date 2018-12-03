import { ElementRef } from '@angular/core';
import { CapturedNode } from './captured-node';
export declare enum DropPosition {
    Above = 0,
    Into = 1,
    Below = 2,
}
export declare class NodeDraggableEvent {
    captured: CapturedNode[];
    target: ElementRef;
    position: DropPosition;
    constructor(captured: CapturedNode[], target: ElementRef, position: DropPosition);
}
export declare class NodeDragStartEvent {
    captured: CapturedNode[];
    target: ElementRef;
    constructor(captured: CapturedNode[], target: ElementRef);
}
