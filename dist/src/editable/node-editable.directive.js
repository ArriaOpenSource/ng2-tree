"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEditableDirective = void 0;
var core_1 = require("@angular/core");
var editable_events_1 = require("./editable.events");
var i0 = require("@angular/core");
var NodeEditableDirective = /** @class */ (function () {
    function NodeEditableDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        /* eslint-enable @angular-eslint/no-input-rename */
        this.valueChanged = new core_1.EventEmitter(false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        if (nativeElement) {
            nativeElement.focus();
        }
        this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
    };
    NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    };
    NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    };
    NodeEditableDirective.prototype.cancelEditing = function () {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: editable_events_1.NodeEditableEventAction.Cancel
        });
    };
    NodeEditableDirective.ɵfac = function NodeEditableDirective_Factory(t) { return new (t || NodeEditableDirective)(i0.ɵɵdirectiveInject(core_1.Renderer2), i0.ɵɵdirectiveInject(core_1.ElementRef)); };
    NodeEditableDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NodeEditableDirective, selectors: [["", "nodeEditable", ""]], hostBindings: function NodeEditableDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keyup.enter", function NodeEditableDirective_keyup_enter_HostBindingHandler($event) { return ctx.applyNewValue($event.target.value); })("blur", function NodeEditableDirective_blur_HostBindingHandler($event) { return ctx.applyNewValueByLoosingFocus($event.target.value); })("keyup.esc", function NodeEditableDirective_keyup_esc_HostBindingHandler() { return ctx.cancelEditing(); });
        } }, inputs: { nodeValue: ["nodeEditable", "nodeValue"] }, outputs: { valueChanged: "valueChanged" } });
    return NodeEditableDirective;
}());
exports.NodeEditableDirective = NodeEditableDirective;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeEditableDirective, [{
        type: core_1.Directive,
        args: [{
                selector: '[nodeEditable]'
            }]
    }], function () { return [{ type: i0.Renderer2, decorators: [{
                type: core_1.Inject,
                args: [core_1.Renderer2]
            }] }, { type: i0.ElementRef, decorators: [{
                type: core_1.Inject,
                args: [core_1.ElementRef]
            }] }]; }, { nodeValue: [{
            type: core_1.Input,
            args: ['nodeEditable']
        }], valueChanged: [{
            type: core_1.Output
        }], applyNewValue: [{
            type: core_1.HostListener,
            args: ['keyup.enter', ['$event.target.value']]
        }], applyNewValueByLoosingFocus: [{
            type: core_1.HostListener,
            args: ['blur', ['$event.target.value']]
        }], cancelEditing: [{
            type: core_1.HostListener,
            args: ['keyup.esc']
        }] }); })();
//# sourceMappingURL=node-editable.directive.js.map