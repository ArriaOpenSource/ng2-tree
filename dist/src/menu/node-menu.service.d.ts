import { ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NodeMenuAction, NodeMenuEvent } from './menu.events';
import * as i0 from "@angular/core";
export declare class NodeMenuService {
    nodeMenuEvents$: Subject<NodeMenuEvent>;
    fireMenuEvent(sender: HTMLElement, action: NodeMenuAction): void;
    hideMenuStream(treeElementRef: ElementRef): Observable<any>;
    hideMenuForAllNodesExcept(treeElementRef: ElementRef): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NodeMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NodeMenuService>;
}
