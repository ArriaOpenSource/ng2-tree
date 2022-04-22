import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { NodeEditableEvent } from './editable.events';
import * as i0 from "@angular/core";
export declare class NodeEditableDirective implements OnInit {
    private renderer;
    private elementRef;
    nodeValue: string;
    valueChanged: EventEmitter<NodeEditableEvent>;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
    applyNewValue(newNodeValue: string): void;
    applyNewValueByLoosingFocus(newNodeValue: string): void;
    cancelEditing(): void;
    static ɵfac: i0.ɵɵFactoryDef<NodeEditableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NodeEditableDirective, "[nodeEditable]", never, { "nodeValue": "nodeEditable"; }, { "valueChanged": "valueChanged"; }, never>;
}
