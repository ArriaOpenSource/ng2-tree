"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMenuComponent = void 0;
var core_1 = require("@angular/core");
var node_menu_service_1 = require("./node-menu.service");
var menu_events_1 = require("./menu.events");
var event_utils_1 = require("../utils/event.utils");
var i0 = require("@angular/core");
var i1 = require("./node-menu.service");
var i2 = require("@angular/common");
var _c0 = ["menuContent"];
var _c1 = ["menuContainer"];
function NodeMenuComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    var _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 5);
    i0.ɵɵlistener("click", function NodeMenuComponent_li_4_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r5); var menuItem_r3 = ctx.$implicit; var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onMenuItemSelected($event, menuItem_r3); });
    i0.ɵɵelement(1, "div");
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var menuItem_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("node-menu-item-icon ", menuItem_r3.cssClass, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(menuItem_r3.name);
} }
var _c2 = function (a0) { return { "visibility": a0 }; };
var NodeMenuComponent = /** @class */ (function () {
    function NodeMenuComponent(renderer, nodeMenuService) {
        this.renderer = renderer;
        this.nodeMenuService = nodeMenuService;
        this.visibility = 'hidden';
        this.menuItemSelected = new core_1.EventEmitter();
        this.availableMenuItems = [
            {
                name: 'New tag',
                action: menu_events_1.NodeMenuItemAction.NewTag,
                cssClass: 'new-tag'
            },
            {
                name: 'New folder',
                action: menu_events_1.NodeMenuItemAction.NewFolder,
                cssClass: 'new-folder'
            },
            {
                name: 'Rename',
                action: menu_events_1.NodeMenuItemAction.Rename,
                cssClass: 'rename'
            },
            {
                name: 'Remove',
                action: menu_events_1.NodeMenuItemAction.Remove,
                cssClass: 'remove'
            }
        ];
        this.disposersForGlobalListeners = [];
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        this.availableMenuItems = this.menuItems || this.availableMenuItems;
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
    };
    NodeMenuComponent.prototype.ngAfterViewInit = function () {
        this.positionMenu();
    };
    NodeMenuComponent.prototype.ngOnDestroy = function () {
        this.disposersForGlobalListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
        if (event_utils_1.isLeftButtonClicked(e)) {
            this.menuItemSelected.emit({
                nodeMenuItemAction: selectedMenuItem.action,
                nodeMenuItemSelected: selectedMenuItem.name
            });
            this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
        }
    };
    NodeMenuComponent.prototype.positionMenu = function () {
        var _this = this;
        var menuContentElem = this.menuContent.nativeElement;
        var elemBCR = menuContentElem.getBoundingClientRect();
        var elemTop = elemBCR.top;
        var elemHeight = elemBCR.height;
        var defaultDisplay = menuContentElem.style.display;
        menuContentElem.style.display = 'none';
        var scrollContainer = this.getScrollParent(menuContentElem);
        menuContentElem.style.display = defaultDisplay;
        var viewportBottom;
        if (scrollContainer) {
            var containerBCR = scrollContainer.getBoundingClientRect();
            var containerBottom = containerBCR.top + containerBCR.height;
            viewportBottom = containerBottom > window.innerHeight ? window.innerHeight : containerBottom;
        }
        else {
            viewportBottom = window.innerHeight;
        }
        var style = elemTop + elemHeight > viewportBottom ? 'bottom: 0' : 'top: 0';
        menuContentElem.setAttribute('style', style);
        if (this.cursorCoordinates && this.cursorCoordinates.x && this.cursorCoordinates.y) {
            var menuContainerElem = this.menuContainer.nativeElement;
            menuContainerElem.setAttribute('style', "position: fixed; top: " + this.cursorCoordinates.y + "px; left: " + this.cursorCoordinates.x + "px");
        }
        setTimeout(function () { return (_this.visibility = 'visible'); });
    };
    NodeMenuComponent.prototype.getScrollParent = function (node) {
        if (node == null) {
            return null;
        }
        if (node.clientHeight && node.clientHeight < node.scrollHeight) {
            return node;
        }
        else {
            return this.getScrollParent(node.parentElement);
        }
    };
    NodeMenuComponent.prototype.closeMenu = function (e) {
        var mouseClicked = e instanceof MouseEvent;
        // Check if the click is fired on an element inside a menu
        var containingTarget = this.menuContent.nativeElement !== e.target && this.menuContent.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || event_utils_1.isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
        }
    };
    NodeMenuComponent.ɵfac = function NodeMenuComponent_Factory(t) { return new (t || NodeMenuComponent)(i0.ɵɵdirectiveInject(core_1.Renderer2), i0.ɵɵdirectiveInject(node_menu_service_1.NodeMenuService)); };
    NodeMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NodeMenuComponent, selectors: [["node-menu"]], viewQuery: function NodeMenuComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 1);
            i0.ɵɵviewQuery(_c1, 1);
        } if (rf & 2) {
            var _t = void 0;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContent = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContainer = _t.first);
        } }, inputs: { menuItems: "menuItems", cursorCoordinates: "cursorCoordinates" }, outputs: { menuItemSelected: "menuItemSelected" }, decls: 5, vars: 4, consts: [[1, "node-menu", 3, "ngStyle"], ["menuContainer", ""], [1, "node-menu-content"], ["menuContent", ""], ["class", "node-menu-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "node-menu-item", 3, "click"], [1, "node-menu-item-value"]], template: function NodeMenuComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵelementStart(2, "ul", 2, 3);
            i0.ɵɵtemplate(4, NodeMenuComponent_li_4_Template, 4, 4, "li", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx.visibility));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.availableMenuItems);
        } }, directives: [i2.NgStyle, i2.NgForOf], encapsulation: 2 });
    return NodeMenuComponent;
}());
exports.NodeMenuComponent = NodeMenuComponent;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'node-menu',
                template: "\n    <div class=\"node-menu\" [ngStyle]=\"{'visibility': visibility}\" #menuContainer>\n      <ul class=\"node-menu-content\" #menuContent>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
            }]
    }], function () { return [{ type: i0.Renderer2, decorators: [{
                type: core_1.Inject,
                args: [core_1.Renderer2]
            }] }, { type: i1.NodeMenuService, decorators: [{
                type: core_1.Inject,
                args: [node_menu_service_1.NodeMenuService]
            }] }]; }, { menuItemSelected: [{
            type: core_1.Output
        }], menuItems: [{
            type: core_1.Input
        }], cursorCoordinates: [{
            type: core_1.Input
        }], menuContent: [{
            type: core_1.ViewChild,
            args: ['menuContent']
        }], menuContainer: [{
            type: core_1.ViewChild,
            args: ['menuContainer']
        }] }); })();
//# sourceMappingURL=node-menu.component.js.map