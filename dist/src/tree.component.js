"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_service_1 = require("./tree.service");
var TreeTypes = require("./tree.types");
var tree_1 = require("./tree");
var TreeComponent = (function () {
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
    TreeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree',
                    template: "<tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>",
                    providers: [tree_service_1.TreeService]
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: tree_service_1.TreeService, decorators: [{ type: core_1.Inject, args: [tree_service_1.TreeService,] },] },
    ]; };
    TreeComponent.propDecorators = {
        "treeModel": [{ type: core_1.Input, args: ['tree',] },],
        "settings": [{ type: core_1.Input },],
        "nodeCreated": [{ type: core_1.Output },],
        "nodeRemoved": [{ type: core_1.Output },],
        "nodeRenamed": [{ type: core_1.Output },],
        "nodeDoubleClicked": [{ type: core_1.Output },],
        "nodeSelected": [{ type: core_1.Output },],
        "nodeUnselected": [{ type: core_1.Output },],
        "nodeDragStarted": [{ type: core_1.Output },],
        "nodeMoved": [{ type: core_1.Output },],
        "nodeExpanded": [{ type: core_1.Output },],
        "nodeCollapsed": [{ type: core_1.Output },],
        "loadNextLevel": [{ type: core_1.Output },],
        "nodeChecked": [{ type: core_1.Output },],
        "nodeUnchecked": [{ type: core_1.Output },],
        "nodeRenameKeydown": [{ type: core_1.Output },],
        "nodeRenameInputChange": [{ type: core_1.Output },],
        "menuItemSelected": [{ type: core_1.Output },],
        "rootComponent": [{ type: core_1.ViewChild, args: ['rootComponent',] },],
        "template": [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
    };
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map