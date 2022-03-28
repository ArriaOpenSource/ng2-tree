import './rxjs-imports';
import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeInternalComponent } from './tree-internal.component';
import { CommonModule } from '@angular/common';
import { NodeDraggableDirective } from './draggable/node-draggable.directive';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeEditableDirective } from './editable/node-editable.directive';
import { NodeMenuComponent } from './menu/node-menu.component';
import { NodeMenuService } from './menu/node-menu.service';
import { TreeService } from './tree.service';
import { SafeHtmlPipe } from './utils/safe-html.pipe';
import * as i0 from "@angular/core";
export class TreeModule {
}
TreeModule.ɵfac = function TreeModule_Factory(t) { return new (t || TreeModule)(); };
TreeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TreeModule });
TreeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [NodeDraggableService, NodeMenuService, TreeService], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [
                    NodeDraggableDirective,
                    TreeComponent,
                    NodeEditableDirective,
                    NodeMenuComponent,
                    TreeInternalComponent,
                    SafeHtmlPipe
                ],
                exports: [TreeComponent],
                providers: [NodeDraggableService, NodeMenuService, TreeService]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TreeModule, { declarations: [NodeDraggableDirective,
        TreeComponent,
        NodeEditableDirective,
        NodeMenuComponent,
        TreeInternalComponent,
        SafeHtmlPipe], imports: [CommonModule], exports: [TreeComponent] }); })();
//# sourceMappingURL=tree.module.js.map