import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CapturedNode } from './captured-node';
import { NodeDraggableEvent, DropPosition, NodeDragStartEvent } from './draggable.events';

@Injectable()
export class NodeDraggableService {
  public draggableNodeEvents$: Subject<NodeDraggableEvent> = new Subject<NodeDraggableEvent>();
  public nodeDragStartEvents$: Subject<NodeDragStartEvent> = new Subject<NodeDragStartEvent>();

  private checkedNodes: CapturedNode[] = [];
  private draggedNode: CapturedNode;

  public fireNodeDragged(captured: CapturedNode[], target: ElementRef, position: DropPosition): void {
    if (captured.length === 0 || captured.every(cn => !cn.tree || cn.tree.isStatic())) {
      return;
    }

    this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target, position));
  }

  public fireNodeDragStart(captured: CapturedNode[], target: ElementRef): void {
    if (captured.length === 0 || captured.every(cn => !cn.tree || cn.tree.isStatic())) {
      return;
    }

    this.nodeDragStartEvents$.next(new NodeDragStartEvent(captured, target));
  }

  public addCheckedNode(node: CapturedNode): void {
    this.checkedNodes.push(node);
  }

  public setDraggedNode(node: CapturedNode): void {
    this.draggedNode = node;
  }

  public removeCheckedNode(node: CapturedNode): void {
    const i = this.checkedNodes.indexOf(node);
    if (i > -1) {
      this.checkedNodes.splice(i, 1);
    }
  }

  public removeCheckedNodeById(id: string | number): void {
    const i = this.checkedNodes.findIndex(cn => cn.tree.id === id);
    if (i > -1) {
      this.checkedNodes.splice(i, 1);
    }
  }

  public getCheckedNodes(): CapturedNode[] {
    return this.checkedNodes;
  }

  public getDraggedNode(): CapturedNode {
    return this.draggedNode;
  }

  public releaseCheckedNodes(): void {
    this.checkedNodes = [];
  }

  public releaseDraggedNode(): void {
    this.draggedNode = null;
  }
}
