import { Component, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuAction, NodeMenuItemAction } from './menu.events';
import { isEscapePressed, isLeftButtonClicked } from '../utils/event.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./node-menu.service";
const _c0 = ["menuContent"];
const _c1 = ["menuContainer"];
function NodeMenuComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 5);
    i0.ɵɵlistener("click", function NodeMenuComponent_li_4_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r5); const menuItem_r3 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onMenuItemSelected($event, menuItem_r3)); });
    i0.ɵɵelement(1, "div");
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const menuItem_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("node-menu-item-icon ", menuItem_r3.cssClass, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(menuItem_r3.name);
} }
const _c2 = a0 => ({ "visibility": a0 });
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
        this.positionMenu();
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
    positionMenu() {
        const menuContentElem = this.menuContent.nativeElement;
        const elemBCR = menuContentElem.getBoundingClientRect();
        const elemTop = elemBCR.top;
        const elemHeight = elemBCR.height;
        const defaultDisplay = menuContentElem.style.display;
        menuContentElem.style.display = 'none';
        const scrollContainer = this.getScrollParent(menuContentElem);
        menuContentElem.style.display = defaultDisplay;
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
        menuContentElem.setAttribute('style', style);
        if (this.cursorCoordinates && this.cursorCoordinates.x && this.cursorCoordinates.y) {
            const menuContainerElem = this.menuContainer.nativeElement;
            menuContainerElem.setAttribute('style', `position: fixed; top: ${this.cursorCoordinates.y}px; left: ${this.cursorCoordinates.x}px`);
        }
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
        const containingTarget = this.menuContent.nativeElement !== e.target && this.menuContent.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
        }
    }
    static { this.ɵfac = function NodeMenuComponent_Factory(t) { return new (t || NodeMenuComponent)(i0.ɵɵdirectiveInject(Renderer2), i0.ɵɵdirectiveInject(NodeMenuService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NodeMenuComponent, selectors: [["node-menu"]], viewQuery: function NodeMenuComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContent = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContainer = _t.first);
        } }, inputs: { menuItems: "menuItems", cursorCoordinates: "cursorCoordinates" }, outputs: { menuItemSelected: "menuItemSelected" }, decls: 5, vars: 4, consts: [[1, "node-menu", 3, "ngStyle"], ["menuContainer", ""], [1, "node-menu-content"], ["menuContent", ""], ["class", "node-menu-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "node-menu-item", 3, "click"], [1, "node-menu-item-value"]], template: function NodeMenuComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1)(2, "ul", 2, 3);
            i0.ɵɵtemplate(4, NodeMenuComponent_li_4_Template, 4, 4, "li", 4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx.visibility));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.availableMenuItems);
        } }, dependencies: [i1.NgForOf, i1.NgStyle], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuComponent, [{
        type: Component,
        args: [{
                selector: 'node-menu',
                template: `
    <div class="node-menu" [ngStyle]="{'visibility': visibility}" #menuContainer>
      <ul class="node-menu-content" #menuContent>
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
            }]
    }], () => [{ type: i0.Renderer2, decorators: [{
                type: Inject,
                args: [Renderer2]
            }] }, { type: i2.NodeMenuService, decorators: [{
                type: Inject,
                args: [NodeMenuService]
            }] }], { menuItemSelected: [{
            type: Output
        }], menuItems: [{
            type: Input
        }], cursorCoordinates: [{
            type: Input
        }], menuContent: [{
            type: ViewChild,
            args: ['menuContent']
        }], menuContainer: [{
            type: ViewChild,
            args: ['menuContainer']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NodeMenuComponent, { className: "NodeMenuComponent", filePath: "src\\menu\\node-menu.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=node-menu.component.js.map