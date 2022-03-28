import { Component, ContentChild, EventEmitter, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeService } from './tree.service';
import * as TreeTypes from './tree.types';
import { Tree } from './tree';
import * as i0 from "@angular/core";
import * as i1 from "./tree-internal.component";
import * as i2 from "./tree.service";
const _c0 = ["rootComponent"];
export class TreeComponent {
    constructor(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new EventEmitter();
        this.nodeRemoved = new EventEmitter();
        this.nodeRenamed = new EventEmitter();
        this.nodeDoubleClicked = new EventEmitter();
        this.nodeSelected = new EventEmitter();
        this.nodeUnselected = new EventEmitter();
        this.nodeDragStarted = new EventEmitter();
        this.nodeMoved = new EventEmitter();
        this.nodeExpanded = new EventEmitter();
        this.nodeCollapsed = new EventEmitter();
        this.loadNextLevel = new EventEmitter();
        this.nodeChecked = new EventEmitter();
        this.nodeUnchecked = new EventEmitter();
        this.nodeRenameKeydown = new EventEmitter();
        this.nodeRenameInputChange = new EventEmitter();
        this.menuItemSelected = new EventEmitter();
        this.subscriptions = [];
    }
    ngOnChanges(changes) {
        if (!this.treeModel) {
            this.tree = TreeComponent.EMPTY_TREE;
        }
        else {
            this.tree = new Tree(this.treeModel);
        }
    }
    ngOnInit() {
        this.subscriptions.push(this.treeService.nodeRemoved$.subscribe((e) => {
            this.nodeRemoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenamed$.subscribe((e) => {
            this.nodeRenamed.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCreated$.subscribe((e) => {
            this.nodeCreated.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeDoubleClicked$.subscribe((e) => {
            this.nodeDoubleClicked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeSelected$.subscribe((e) => {
            this.nodeSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnselected$.subscribe((e) => {
            this.nodeUnselected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoveStarted$.subscribe((e) => {
            this.nodeDragStarted.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoved$.subscribe((e) => {
            this.nodeMoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeExpanded$.subscribe((e) => {
            this.nodeExpanded.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCollapsed$.subscribe((e) => {
            this.nodeCollapsed.emit(e);
        }));
        this.subscriptions.push(this.treeService.menuItemSelected$.subscribe((e) => {
            this.menuItemSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.loadNextLevel$.subscribe((e) => {
            this.loadNextLevel.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeChecked$.subscribe((e) => {
            this.nodeChecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnchecked$.subscribe((e) => {
            this.nodeUnchecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenameKeydown$.subscribe((e) => {
            this.nodeRenameKeydown.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenameInputChange$.subscribe((e) => {
            this.nodeRenameInputChange.emit(e);
        }));
    }
    getController() {
        return this.rootComponent.controller;
    }
    getControllerByNodeId(id) {
        return this.treeService.getController(id);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }
}
TreeComponent.EMPTY_TREE = new Tree({ value: '' });
TreeComponent.ɵfac = function TreeComponent_Factory(t) { return new (t || TreeComponent)(i0.ɵɵdirectiveInject(TreeService)); };
TreeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TreeComponent, selectors: [["tree"]], contentQueries: function TreeComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, viewQuery: function TreeComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.rootComponent = _t.first);
    } }, inputs: { treeModel: ["tree", "treeModel"], settings: "settings" }, outputs: { nodeCreated: "nodeCreated", nodeRemoved: "nodeRemoved", nodeRenamed: "nodeRenamed", nodeDoubleClicked: "nodeDoubleClicked", nodeSelected: "nodeSelected", nodeUnselected: "nodeUnselected", nodeDragStarted: "nodeDragStarted", nodeMoved: "nodeMoved", nodeExpanded: "nodeExpanded", nodeCollapsed: "nodeCollapsed", loadNextLevel: "loadNextLevel", nodeChecked: "nodeChecked", nodeUnchecked: "nodeUnchecked", nodeRenameKeydown: "nodeRenameKeydown", nodeRenameInputChange: "nodeRenameInputChange", menuItemSelected: "menuItemSelected" }, features: [i0.ɵɵProvidersFeature([TreeService]), i0.ɵɵNgOnChangesFeature], decls: 2, vars: 3, consts: [[3, "tree", "settings", "template"], ["rootComponent", ""]], template: function TreeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "tree-internal", 0, 1);
    } if (rf & 2) {
        i0.ɵɵproperty("tree", ctx.tree)("settings", ctx.settings)("template", ctx.template);
    } }, directives: [i1.TreeInternalComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeComponent, [{
        type: Component,
        args: [{
                selector: 'tree',
                template: `<tree-internal #rootComponent [tree]="tree" [settings]="settings" [template]="template"></tree-internal>`,
                providers: [TreeService]
            }]
    }], function () { return [{ type: i2.TreeService, decorators: [{
                type: Inject,
                args: [TreeService]
            }] }]; }, { treeModel: [{
            type: Input,
            args: ['tree']
        }], settings: [{
            type: Input
        }], nodeCreated: [{
            type: Output
        }], nodeRemoved: [{
            type: Output
        }], nodeRenamed: [{
            type: Output
        }], nodeDoubleClicked: [{
            type: Output
        }], nodeSelected: [{
            type: Output
        }], nodeUnselected: [{
            type: Output
        }], nodeDragStarted: [{
            type: Output
        }], nodeMoved: [{
            type: Output
        }], nodeExpanded: [{
            type: Output
        }], nodeCollapsed: [{
            type: Output
        }], loadNextLevel: [{
            type: Output
        }], nodeChecked: [{
            type: Output
        }], nodeUnchecked: [{
            type: Output
        }], nodeRenameKeydown: [{
            type: Output
        }], nodeRenameInputChange: [{
            type: Output
        }], menuItemSelected: [{
            type: Output
        }], rootComponent: [{
            type: ViewChild,
            args: ['rootComponent']
        }], template: [{
            type: ContentChild,
            args: [TemplateRef]
        }] }); })();
//# sourceMappingURL=tree.component.js.map