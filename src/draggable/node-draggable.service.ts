import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CapturedNode } from './captured-node';
import { NodeDraggableEvent } from './draggable.events';

@Injectable()
export class NodeDraggableService {
  public draggableNodeEvents$: Subject<NodeDraggableEvent> = new Subject<NodeDraggableEvent>();

  private capturedNodes: CapturedNode[] = [];

  public fireNodeDragged(captured: CapturedNode[], target: ElementRef): void {
    if (captured.length === 0 || captured.every(cn => !cn.tree || cn.tree.isStatic())) {
      return;
    }

    this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target));
  }

  public addNode(node: CapturedNode): void {
    this.capturedNodes.push(node);
  }

  public removeNode(node: CapturedNode): void {
    const i = this.capturedNodes.indexOf(node);
    if (i > -1) {
      this.capturedNodes.splice(i, 1);
    }
  }

  public removeNodeByTreeId(id: string | number): void {
    const i = this.capturedNodes.findIndex(cn => cn.tree.id === id);
    if (i > -1) {
      this.capturedNodes.splice(i, 1);
    }
  }

  public getCapturedNodes(): CapturedNode[] {
    return this.capturedNodes;
  }

  public releaseCapturedNodes(): void {
    this.capturedNodes = [];
  }
}
