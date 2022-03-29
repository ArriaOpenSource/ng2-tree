"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeComponent = void 0;
var core_1 = require("@angular/core");
var tree_service_1 = require("./tree.service");
var TreeTypes = require("./tree.types");
var tree_1 = require("./tree");
var i0 = require("@angular/core");
var i1 = require("./tree-internal.component");
var i2 = require("./tree.service");
var _c0 = ["rootComponent"];
var TreeComponent = /** @class */ (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new core_1.EventEmitter();
        this.nodeRemoved = new core_1.EventEmitter();
        this.nodeRenamed = new core_1.EventEmitter();
        this.nodeDoubleClicked = new core_1.EventEmitter();
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeUnselected = new core_1.EventEmitter();
        this.nodeDragStarted = new core_1.EventEmitter();
        this.nodeMoved = new core_1.EventEmitter();
        this.nodeExpanded = new core_1.EventEmitter();
        this.nodeCollapsed = new core_1.EventEmitter();
        this.loadNextLevel = new core_1.EventEmitter();
        this.nodeChecked = new core_1.EventEmitter();
        this.nodeUnchecked = new core_1.EventEmitter();
        this.nodeRenameKeydown = new core_1.EventEmitter();
        this.nodeRenameInputChange = new core_1.EventEmitter();
        this.menuItemSelected = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    TreeComponent.prototype.ngOnChanges = function (changes) {
        if (!this.treeModel) {
            this.tree = TreeComponent.EMPTY_TREE;
        }
        else {
            this.tree = new tree_1.Tree(this.treeModel);
        }
    };
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeDoubleClicked$.subscribe(function (e) {
            _this.nodeDoubleClicked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnselected$.subscribe(function (e) {
            _this.nodeUnselected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoveStarted$.subscribe(function (e) {
            _this.nodeDragStarted.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeExpanded$.subscribe(function (e) {
            _this.nodeExpanded.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCollapsed$.subscribe(function (e) {
            _this.nodeCollapsed.emit(e);
        }));
        this.subscriptions.push(this.treeService.menuItemSelected$.subscribe(function (e) {
            _this.menuItemSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.loadNextLevel$.subscribe(function (e) {
            _this.loadNextLevel.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeChecked$.subscribe(function (e) {
            _this.nodeChecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnchecked$.subscribe(function (e) {
            _this.nodeUnchecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenameKeydown$.subscribe(function (e) {
            _this.nodeRenameKeydown.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenameInputChange$.subscribe(function (e) {
            _this.nodeRenameInputChange.emit(e);
        }));
    };
    TreeComponent.prototype.getController = function () {
        return this.rootComponent.controller;
    };
    TreeComponent.prototype.getControllerByNodeId = function (id) {
        return this.treeService.getController(id);
    };
    TreeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    TreeComponent.EMPTY_TREE = new tree_1.Tree({ value: '' });
    TreeComponent.ɵfac = function TreeComponent_Factory(t) { return new (t || TreeComponent)(i0.ɵɵdirectiveInject(tree_service_1.TreeService)); };
    TreeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TreeComponent, selectors: [["tree"]], contentQueries: function TreeComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, core_1.TemplateRef, 5);
        } if (rf & 2) {
            var _t = void 0;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
        } }, viewQuery: function TreeComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            var _t = void 0;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.rootComponent = _t.first);
        } }, inputs: { treeModel: ["tree", "treeModel"], settings: "settings" }, outputs: { nodeCreated: "nodeCreated", nodeRemoved: "nodeRemoved", nodeRenamed: "nodeRenamed", nodeDoubleClicked: "nodeDoubleClicked", nodeSelected: "nodeSelected", nodeUnselected: "nodeUnselected", nodeDragStarted: "nodeDragStarted", nodeMoved: "nodeMoved", nodeExpanded: "nodeExpanded", nodeCollapsed: "nodeCollapsed", loadNextLevel: "loadNextLevel", nodeChecked: "nodeChecked", nodeUnchecked: "nodeUnchecked", nodeRenameKeydown: "nodeRenameKeydown", nodeRenameInputChange: "nodeRenameInputChange", menuItemSelected: "menuItemSelected" }, features: [i0.ɵɵProvidersFeature([tree_service_1.TreeService]), i0.ɵɵNgOnChangesFeature], decls: 2, vars: 3, consts: [[3, "tree", "settings", "template"], ["rootComponent", ""]], template: function TreeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "tree-internal", 0, 1);
        } if (rf & 2) {
            i0.ɵɵproperty("tree", ctx.tree)("settings", ctx.settings)("template", ctx.template);
        } }, directives: [i1.TreeInternalComponent], encapsulation: 2 });
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'tree',
                template: "<tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>",
                providers: [tree_service_1.TreeService]
            }]
    }], function () { return [{ type: i2.TreeService, decorators: [{
                type: core_1.Inject,
                args: [tree_service_1.TreeService]
            }] }]; }, { treeModel: [{
            type: core_1.Input,
            args: ['tree']
        }], settings: [{
            type: core_1.Input
        }], nodeCreated: [{
            type: core_1.Output
        }], nodeRemoved: [{
            type: core_1.Output
        }], nodeRenamed: [{
            type: core_1.Output
        }], nodeDoubleClicked: [{
            type: core_1.Output
        }], nodeSelected: [{
            type: core_1.Output
        }], nodeUnselected: [{
            type: core_1.Output
        }], nodeDragStarted: [{
            type: core_1.Output
        }], nodeMoved: [{
            type: core_1.Output
        }], nodeExpanded: [{
            type: core_1.Output
        }], nodeCollapsed: [{
            type: core_1.Output
        }], loadNextLevel: [{
            type: core_1.Output
        }], nodeChecked: [{
            type: core_1.Output
        }], nodeUnchecked: [{
            type: core_1.Output
        }], nodeRenameKeydown: [{
            type: core_1.Output
        }], nodeRenameInputChange: [{
            type: core_1.Output
        }], menuItemSelected: [{
            type: core_1.Output
        }], rootComponent: [{
            type: core_1.ViewChild,
            args: ['rootComponent']
        }], template: [{
            type: core_1.ContentChild,
            args: [core_1.TemplateRef]
        }] }); })();
//# sourceMappingURL=tree.component.js.map