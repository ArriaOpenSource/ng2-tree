import { EventEmitter, OnDestroy, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuItemAction, NodeMenuItemSelectedEvent } from './menu.events';
export declare class NodeMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    private renderer;
    private nodeMenuService;
    visibility: string;
    menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent>;
    menuItems: NodeMenuItem[];
    menuContainer: any;
    availableMenuItems: NodeMenuItem[];
    private disposersForGlobalListeners;
    constructor(renderer: Renderer2, nodeMenuService: NodeMenuService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void;
    private displayAboveOrBelow();
    private getScrollParent(node);
    private closeMenu(e);
}
export interface NodeMenuItem {
    name: string;
    action: NodeMenuItemAction;
    cssClass?: string;
}
