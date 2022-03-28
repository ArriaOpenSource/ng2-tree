import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NodeMenuAction } from './menu.events';
import * as i0 from "@angular/core";
export class NodeMenuService {
    constructor() {
        this.nodeMenuEvents$ = new Subject();
    }
    fireMenuEvent(sender, action) {
        const nodeMenuEvent = { sender, action };
        this.nodeMenuEvents$.next(nodeMenuEvent);
    }
    hideMenuStream(treeElementRef) {
        return this.nodeMenuEvents$.pipe(filter((e) => treeElementRef.nativeElement !== e.sender), filter((e) => e.action === NodeMenuAction.Close));
    }
    hideMenuForAllNodesExcept(treeElementRef) {
        this.nodeMenuEvents$.next({
            sender: treeElementRef.nativeElement,
            action: NodeMenuAction.Close
        });
    }
}
NodeMenuService.ɵfac = function NodeMenuService_Factory(t) { return new (t || NodeMenuService)(); };
NodeMenuService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NodeMenuService, factory: NodeMenuService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=node-menu.service.js.map