"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMenuService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var menu_events_1 = require("./menu.events");
var i0 = require("@angular/core");
var NodeMenuService = /** @class */ (function () {
    function NodeMenuService() {
        this.nodeMenuEvents$ = new rxjs_1.Subject();
    }
    NodeMenuService.prototype.fireMenuEvent = function (sender, action) {
        var nodeMenuEvent = { sender: sender, action: action };
        this.nodeMenuEvents$.next(nodeMenuEvent);
    };
    NodeMenuService.prototype.hideMenuStream = function (treeElementRef) {
        return this.nodeMenuEvents$.pipe((0, operators_1.filter)(function (e) { return treeElementRef.nativeElement !== e.sender; }), (0, operators_1.filter)(function (e) { return e.action === menu_events_1.NodeMenuAction.Close; }));
    };
    NodeMenuService.prototype.hideMenuForAllNodesExcept = function (treeElementRef) {
        this.nodeMenuEvents$.next({
            sender: treeElementRef.nativeElement,
            action: menu_events_1.NodeMenuAction.Close
        });
    };
    NodeMenuService.ɵfac = function NodeMenuService_Factory(t) { return new (t || NodeMenuService)(); };
    NodeMenuService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NodeMenuService, factory: NodeMenuService.ɵfac });
    return NodeMenuService;
}());
exports.NodeMenuService = NodeMenuService;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuService, [{
        type: core_1.Injectable
    }], null, null); })();
//# sourceMappingURL=node-menu.service.js.map