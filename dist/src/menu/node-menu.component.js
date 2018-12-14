"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var node_menu_service_1 = require("./node-menu.service");
var menu_events_1 = require("./menu.events");
var event_utils_1 = require("../utils/event.utils");
var NodeMenuComponent = (function () {
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
        this.displayAboveOrBelow();
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
    NodeMenuComponent.prototype.displayAboveOrBelow = function () {
        var _this = this;
        var menuContainerElem = this.menuContainer.nativeElement;
        var elemBCR = menuContainerElem.getBoundingClientRect();
        var elemTop = elemBCR.top;
        var elemHeight = elemBCR.height;
        var defaultDisplay = menuContainerElem.style.display;
        menuContainerElem.style.display = 'none';
        var scrollContainer = this.getScrollParent(menuContainerElem);
        menuContainerElem.style.display = defaultDisplay;
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
        menuContainerElem.setAttribute('style', style);
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
        var containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || event_utils_1.isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
        }
    };
    NodeMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'node-menu',
                    template: "\n    <div class=\"node-menu\"  [ngStyle]=\"{'visibility': visibility}\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NodeMenuComponent.ctorParameters = function () { return [
        { type: core_1.Renderer2, decorators: [{ type: core_1.Inject, args: [core_1.Renderer2,] },] },
        { type: node_menu_service_1.NodeMenuService, decorators: [{ type: core_1.Inject, args: [node_menu_service_1.NodeMenuService,] },] },
    ]; };
    NodeMenuComponent.propDecorators = {
        "menuItemSelected": [{ type: core_1.Output },],
        "menuItems": [{ type: core_1.Input },],
        "menuContainer": [{ type: core_1.ViewChild, args: ['menuContainer',] },],
    };
    return NodeMenuComponent;
}());
exports.NodeMenuComponent = NodeMenuComponent;
//# sourceMappingURL=node-menu.component.js.map