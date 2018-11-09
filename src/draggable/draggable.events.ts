import { ElementRef } from '@angular/core';
import { CapturedNode } from './captured-node';

export enum NodeDropType {
  DropOn,
  DropAfter
}

export class NodeDraggableEvent {
  public constructor(public captured: CapturedNode[], public target: ElementRef, public type: NodeDropType) {}
}
