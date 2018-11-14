import { ElementRef } from '@angular/core';
import { CapturedNode } from './captured-node';

export enum DropPosition {
  Above,
  Into,
  Below
}

export class NodeDraggableEvent {
  public constructor(public captured: CapturedNode[], public target: ElementRef, public position: DropPosition) {}
}

export class NodeDragStartEvent {
  public constructor(public captured: CapturedNode[], public target: ElementRef) {}
}
