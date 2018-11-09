import { ElementRef } from '@angular/core';
import { CapturedNode } from './captured-node';
export declare enum NodeDropType {
    DropOn = 0,
    DropAfter = 1,
}
export declare class NodeDraggableEvent {
    captured: CapturedNode[];
    target: ElementRef;
    type: NodeDropType;
    constructor(captured: CapturedNode[], target: ElementRef, type: NodeDropType);
}
