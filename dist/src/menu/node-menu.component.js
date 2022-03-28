import { Component, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuAction, NodeMenuItemAction } from './menu.events';
import { isEscapePressed, isLeftButtonClicked } from '../utils/event.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./node-menu.service";
const _c0 = ["menuContainer"];
function NodeMenuComponent_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵlistener("click", function NodeMenuComponent_li_3_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r4); const menuItem_r2 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.onMenuItemSelected($event, menuItem_r2); });
    i0.ɵɵelement(1, "div");
    i0.ɵɵelementStart(2, "span", 5);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const menuItem_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("node-menu-item-icon ", menuItem_r2.cssClass, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(menuItem_r2.name);
} }
const _c1 = function (a0) { return { "visibility": a0 }; };
export class NodeMenuComponent {
    constructor(renderer, nodeMenuService) {
        this.renderer = renderer;
        this.nodeMenuService = nodeMenuService;
        this.visibility = 'hidden';
        this.menuItemSelected = new EventEmitter();
        this.availableMenuItems = [
            {
                name: 'New tag',
                action: NodeMenuItemAction.NewTag,
                cssClass: 'new-tag'
            },
            {
                name: 'New folder',
                action: NodeMenuItemAction.NewFolder,
                cssClass: 'new-folder'
            },
            {
                name: 'Rename',
                action: NodeMenuItemAction.Rename,
                cssClass: 'rename'
            },
            {
                name: 'Remove',
                action: NodeMenuItemAction.Remove,
                cssClass: 'remove'
            }
        ];
        this.disposersForGlobalListeners = [];
    }
    ngOnInit() {
        this.availableMenuItems = this.menuItems || this.availableMenuItems;
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
    }
    ngAfterViewInit() {
        this.displayAboveOrBelow();
    }
    ngOnDestroy() {
        this.disposersForGlobalListeners.forEach((dispose) => dispose());
    }
    onMenuItemSelected(e, selectedMenuItem) {
        if (isLeftButtonClicked(e)) {
            this.menuItemSelected.emit({
                nodeMenuItemAction: selectedMenuItem.action,
                nodeMenuItemSelected: selectedMenuItem.name
            });
            this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
        }
    }
    displayAboveOrBelow() {
        const menuContainerElem = this.menuContainer.nativeElement;
        const elemBCR = menuContainerElem.getBoundingClientRect();
        const elemTop = elemBCR.top;
        const elemHeight = elemBCR.height;
        const defaultDisplay = menuContainerElem.style.display;
        menuContainerElem.style.display = 'none';
        const scrollContainer = this.getScrollParent(menuContainerElem);
        menuContainerElem.style.display = defaultDisplay;
        let viewportBottom;
        if (scrollContainer) {
            const containerBCR = scrollContainer.getBoundingClientRect();
            const containerBottom = containerBCR.top + containerBCR.height;
            viewportBottom = containerBottom > window.innerHeight ? window.innerHeight : containerBottom;
        }
        else {
            viewportBottom = window.innerHeight;
        }
        const style = elemTop + elemHeight > viewportBottom ? 'bottom: 0' : 'top: 0';
        menuContainerElem.setAttribute('style', style);
        setTimeout(() => (this.visibility = 'visible'));
    }
    getScrollParent(node) {
        if (node == null) {
            return null;
        }
        if (node.clientHeight && node.clientHeight < node.scrollHeight) {
            return node;
        }
        else {
            return this.getScrollParent(node.parentElement);
        }
    }
    closeMenu(e) {
        const mouseClicked = e instanceof MouseEvent;
        // Check if the click is fired on an element inside a menu
        const containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
        }
    }
}
NodeMenuComponent.ɵfac = function NodeMenuComponent_Factory(t) { return new (t || NodeMenuComponent)(i0.ɵɵdirectiveInject(Renderer2), i0.ɵɵdirectiveInject(NodeMenuService)); };
NodeMenuComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NodeMenuComponent, selectors: [["node-menu"]], viewQuery: function NodeMenuComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContainer = _t.first);
    } }, inputs: { menuItems: "menuItems" }, outputs: { menuItemSelected: "menuItemSelected" }, decls: 4, vars: 4, consts: [[1, "node-menu", 3, "ngStyle"], [1, "node-menu-content"], ["menuContainer", ""], ["class", "node-menu-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "node-menu-item", 3, "click"], [1, "node-menu-item-value"]], template: function NodeMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "ul", 1, 2);
        i0.ɵɵtemplate(3, NodeMenuComponent_li_3_Template, 4, 4, "li", 3);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c1, ctx.visibility));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.availableMenuItems);
    } }, directives: [i1.NgStyle, i1.NgForOf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuComponent, [{
        type: Component,
        args: [{
                selector: 'node-menu',
                template: `
    <div class="node-menu"  [ngStyle]="{'visibility': visibility}">
      <ul class="node-menu-content" #menuContainer>
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
            }]
    }], function () { return [{ type: i0.Renderer2, decorators: [{
                type: Inject,
                args: [Renderer2]
            }] }, { type: i2.NodeMenuService, decorators: [{
                type: Inject,
                args: [NodeMenuService]
            }] }]; }, { menuItemSelected: [{
            type: Output
        }], menuItems: [{
            type: Input
        }], menuContainer: [{
            type: ViewChild,
            args: ['menuContainer']
        }] }); })();
//# sourceMappingURL=node-menu.component.js.map