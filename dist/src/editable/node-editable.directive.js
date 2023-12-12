import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2 } from '@angular/core';
import { NodeEditableEventAction } from './editable.events';
import * as i0 from "@angular/core";
export class NodeEditableDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        /* eslint-enable @angular-eslint/no-input-rename */
        this.valueChanged = new EventEmitter(false);
    }
    ngOnInit() {
        const nativeElement = this.elementRef.nativeElement;
        if (nativeElement) {
            nativeElement.focus();
        }
        this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
    }
    applyNewValue(newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    }
    applyNewValueByLoosingFocus(newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    }
    cancelEditing() {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: NodeEditableEventAction.Cancel
        });
    }
    static { this.ɵfac = function NodeEditableDirective_Factory(t) { return new (t || NodeEditableDirective)(i0.ɵɵdirectiveInject(Renderer2), i0.ɵɵdirectiveInject(ElementRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NodeEditableDirective, selectors: [["", "nodeEditable", ""]], hostBindings: function NodeEditableDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keyup.enter", function NodeEditableDirective_keyup_enter_HostBindingHandler($event) { return ctx.applyNewValue($event.target.value); })("blur", function NodeEditableDirective_blur_HostBindingHandler($event) { return ctx.applyNewValueByLoosingFocus($event.target.value); })("keyup.esc", function NodeEditableDirective_keyup_esc_HostBindingHandler() { return ctx.cancelEditing(); });
        } }, inputs: { nodeValue: ["nodeEditable", "nodeValue"] }, outputs: { valueChanged: "valueChanged" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeEditableDirective, [{
        type: Directive,
        args: [{
                selector: '[nodeEditable]'
            }]
    }], () => [{ type: i0.Renderer2, decorators: [{
                type: Inject,
                args: [Renderer2]
            }] }, { type: i0.ElementRef, decorators: [{
                type: Inject,
                args: [ElementRef]
            }] }], { nodeValue: [{
            type: Input,
            args: ['nodeEditable']
        }], valueChanged: [{
            type: Output
        }], applyNewValue: [{
            type: HostListener,
            args: ['keyup.enter', ['$event.target.value']]
        }], applyNewValueByLoosingFocus: [{
            type: HostListener,
            args: ['blur', ['$event.target.value']]
        }], cancelEditing: [{
            type: HostListener,
            args: ['keyup.esc']
        }] }); })();
//# sourceMappingURL=node-editable.directive.js.map