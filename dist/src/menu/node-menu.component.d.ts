import { EventEmitter, OnDestroy, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuItemAction, NodeMenuItemSelectedEvent } from './menu.events';
import * as i0 from "@angular/core";
export declare class NodeMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    private renderer;
    private nodeMenuService;
    visibility: string;
    menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent>;
    menuItems: NodeMenuItem[];
    cursorCoordinates?: ICursorCoordinates;
    menuContent: any;
    menuContainer: any;
    availableMenuItems: NodeMenuItem[];
    private disposersForGlobalListeners;
    constructor(renderer: Renderer2, nodeMenuService: NodeMenuService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void;
    private positionMenu;
    private getScrollParent;
    private closeMenu;
    static ɵfac: i0.ɵɵFactoryDeclaration<NodeMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NodeMenuComponent, "node-menu", never, { "menuItems": { "alias": "menuItems"; "required": false; }; "cursorCoordinates": { "alias": "cursorCoordinates"; "required": false; }; }, { "menuItemSelected": "menuItemSelected"; }, never, never, false, never>;
}
export interface NodeMenuItem {
    name: string;
    action: NodeMenuItemAction;
    cssClass?: string;
}
export interface ICursorCoordinates {
    x?: number;
    y?: number;
}
