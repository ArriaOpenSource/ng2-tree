import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { Tree } from '../tree';
export declare class NodeDraggableDirective implements OnDestroy, OnInit {
    element: ElementRef;
    private nodeDraggableService;
    private renderer;
    static DATA_TRANSFER_STUB_DATA: string;
    nodeDraggable: ElementRef;
    tree: Tree;
    private nodeNativeElement;
    private disposersForDragListeners;
    constructor(element: ElementRef, nodeDraggableService: NodeDraggableService, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleDragStart(e);
    private handleDragOver(e);
    private handleDragEnter(e);
    private handleDragLeave(e);
    private handleDragEnd(e);
    private handleDrop(e);
    private getDragOverClassName();
    private isDropPossible(e);
    private releaseNodes();
    private containsElementAt(e);
    private addClasses(classNames);
    private removeClasses(classNames);
    private notifyThatNodeWasDropped();
}
