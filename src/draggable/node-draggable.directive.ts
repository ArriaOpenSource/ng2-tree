import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { CapturedNode } from './captured-node';
import { Tree } from '../tree';
import { DropPosition } from './draggable.events';

@Directive({
  selector: '[nodeDraggable]'
})
export class NodeDraggableDirective implements OnDestroy, OnInit {
  public static DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';

  @Input() public nodeDraggable: ElementRef;
  @Input() public tree: Tree;

  private nodeNativeElement: HTMLElement;
  private disposersForDragListeners: Function[] = [];
  private currentDropPosition: DropPosition;

  public constructor(
    @Inject(ElementRef) public element: ElementRef,
    @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
    @Inject(Renderer2) private renderer: Renderer2
  ) {
    this.nodeNativeElement = element.nativeElement;
  }

  public ngOnInit(): void {
    if (!this.tree.isStatic()) {
      this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this))
      );
    }
  }

  public ngOnDestroy(): void {
    this.disposersForDragListeners.forEach(dispose => dispose());
  }

  private handleDragStart(e: DragEvent): any {
    if (this.tree.isBeingRenamed()) {
      e.preventDefault();
      return;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (!this.tree.checked) {
      this.nodeDraggableService.setDraggedNode(new CapturedNode(this.nodeDraggable, this.tree));
    }

    this.notifyThatNodeIsBeingDragged();

    if (this.tree.node.settings.dragImageId) {
      const elem = document.getElementById(this.tree.node.settings.dragImageId);
      if (elem) {
        e.dataTransfer.setDragImage(elem, 0, 0);
      }
    }

    this.applyDraggedNodeClasses();

    e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
    e.dataTransfer.effectAllowed = 'move';
  }

  private handleDragOver(e: DragEvent): any {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    if (draggedNode && draggedNode.contains({ nativeElement: e.currentTarget })) {
      // Cannot drag and drop on itself
      return;
    }

    if (!draggedNode && this.tree.checked) {
      // Cannot drop multiple items onto themselves
      return;
    }

    const newDropPosition = this.determineDropPosition(e);
    this.removeClasses([this.getDropPositionClassName(this.currentDropPosition)]);

    if (this.tree.isBranch() && this.tree.isNodeExpanded() && newDropPosition === DropPosition.Below) {
      // Cannot drop below a branch node if it's expanded
      return;
    }
    if (
      draggedNode &&
      this.tree.isBranch() &&
      this.tree.hasChild(draggedNode.tree) &&
      newDropPosition === DropPosition.Into
    ) {
      // Cannot drop into it's own parent
      return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.addClasses([this.getDropPositionClassName(newDropPosition)]);
    this.currentDropPosition = newDropPosition;
  }

  private handleDragEnter(e: DragEvent): any {
    e.preventDefault();
    if (this.containsElementAt(e)) {
      this.addClasses(['over-drop-target', this.getDragOverClassName()]);
    }
  }

  private handleDragLeave(e: DragEvent): any {
    if (!this.containsElementAt(e)) {
      this.removeClasses([
        'over-drop-target',
        this.getDragOverClassName(),
        this.getDropPositionClassName(this.currentDropPosition)
      ]);
    }
  }

  private handleDragEnd(e: DragEvent): any {
    this.removeClasses([
      'over-drop-target',
      this.getDragOverClassName(),
      this.getDropPositionClassName(this.currentDropPosition)
    ]);
    this.removeDraggedNodeClasses();
    this.nodeDraggableService.releaseDraggedNode();
  }

  private handleDrop(e: DragEvent): any {
    e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    this.removeClasses([
      'over-drop-target',
      this.getDragOverClassName(),
      this.getDropPositionClassName(this.currentDropPosition)
    ]);

    if (!this.isDropPossible(e)) {
      return false;
    }

    if (this.nodeDraggableService.getDraggedNode() || this.nodeDraggableService.getCheckedNodes().length > 0) {
      this.removeDraggedNodeClasses();
      this.notifyThatNodeWasDropped();
      this.releaseNodes();
    }
  }

  private determineDropPosition(e: DragEvent): DropPosition {
    let dropPosition: DropPosition;
    const currentTarget = e.currentTarget as HTMLElement;
    const elemHeight = currentTarget.offsetHeight;
    const relativeMousePosition = e.clientY - currentTarget.getBoundingClientRect().top;
    if (this.tree.isBranch()) {
      const third = elemHeight / 3;
      const twoThirds = third * 2;
      if (relativeMousePosition < third) {
        dropPosition = DropPosition.Above;
      } else if (relativeMousePosition >= third && relativeMousePosition <= twoThirds) {
        dropPosition = DropPosition.Into;
      } else {
        dropPosition = DropPosition.Below;
      }
    } else {
      const half = elemHeight / 2;
      if (relativeMousePosition <= half) {
        dropPosition = DropPosition.Above;
      } else {
        dropPosition = DropPosition.Below;
      }
    }
    return dropPosition;
  }

  private getDragOverClassName(): string {
    return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
  }

  private getDropPositionClassName(dropPosition: DropPosition): string {
    switch (dropPosition) {
      case DropPosition.Above:
        return 'over-drop-above';
      case DropPosition.Into:
        return 'over-drop-into';
      case DropPosition.Below:
        return 'over-drop-below';
    }
  }

  private isDropPossible(e: DragEvent): boolean {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    if (draggedNode) {
      return draggedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
    } else {
      const capturedNodes = this.nodeDraggableService.getCheckedNodes();
      return (
        capturedNodes.length > 0 &&
        capturedNodes.some(cn => cn.canBeDroppedAt(this.nodeDraggable)) &&
        this.containsElementAt(e)
      );
    }
  }

  private releaseNodes(): void {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    if (draggedNode) {
      this.nodeDraggableService.releaseDraggedNode();
    } else {
      this.nodeDraggableService.releaseCheckedNodes();
    }
  }

  private applyDraggedNodeClasses(): void {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    if (draggedNode) {
      draggedNode.element.nativeElement.classList.add('being-dragged');
    } else {
      this.nodeDraggableService.getCheckedNodes().forEach(n => n.element.nativeElement.classList.add('being-dragged'));
    }
  }

  private removeDraggedNodeClasses(): void {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    if (draggedNode) {
      draggedNode.element.nativeElement.classList.remove('being-dragged');
    } else {
      this.nodeDraggableService
        .getCheckedNodes()
        .forEach(n => n.element.nativeElement.classList.remove('being-dragged'));
    }
  }

  private containsElementAt(e: DragEvent): boolean {
    const { x = e.clientX, y = e.clientY } = e;
    return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
  }

  private addClasses(classNames: string[]): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.add(...classNames);
  }

  private removeClasses(classNames: string[]): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.remove(...classNames);
  }

  private notifyThatNodeWasDropped(): void {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    const nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
    this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, this.currentDropPosition);
  }

  private notifyThatNodeIsBeingDragged(): void {
    const draggedNode = this.nodeDraggableService.getDraggedNode();
    const nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
    this.nodeDraggableService.fireNodeDragStart(nodes, this.nodeDraggable);
  }
}
