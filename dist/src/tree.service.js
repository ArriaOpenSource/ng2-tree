"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeService = void 0;
var tree_events_1 = require("./tree.events");
var core_1 = require("@angular/core");
var node_draggable_service_1 = require("./draggable/node-draggable.service");
var fn_utils_1 = require("./utils/fn.utils");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var i0 = require("@angular/core");
var i1 = require("./draggable/node-draggable.service");
var TreeService = /** @class */ (function () {
    function TreeService(nodeDraggableService) {
        var _this = this;
        this.nodeDraggableService = nodeDraggableService;
        this.nodeMoved$ = new rxjs_1.Subject();
        this.nodeMoveStarted$ = new rxjs_1.Subject();
        this.nodeRemoved$ = new rxjs_1.Subject();
        this.nodeRenamed$ = new rxjs_1.Subject();
        this.nodeCreated$ = new rxjs_1.Subject();
        this.nodeDoubleClicked$ = new rxjs_1.Subject();
        this.nodeSelected$ = new rxjs_1.Subject();
        this.nodeUnselected$ = new rxjs_1.Subject();
        this.nodeExpanded$ = new rxjs_1.Subject();
        this.nodeCollapsed$ = new rxjs_1.Subject();
        this.menuItemSelected$ = new rxjs_1.Subject();
        this.loadNextLevel$ = new rxjs_1.Subject();
        this.nodeChecked$ = new rxjs_1.Subject();
        this.nodeUnchecked$ = new rxjs_1.Subject();
        this.nodeIndeterminate$ = new rxjs_1.Subject();
        this.nodeRenameKeydown$ = new rxjs_1.Subject();
        this.nodeRenameInputChange$ = new rxjs_1.Subject();
        this.controllers = new Map();
        this.nodeRemoved$.subscribe(function (e) { return e.node.removeItselfFromParent(); });
        this.nodeDraggableService.nodeDragStartEvents$.subscribe(function (e) {
            _this.nodeMoveStarted$.next(e);
        });
    }
    TreeService.prototype.unselectStream = function (tree) {
        return this.nodeSelected$.pipe((0, operators_1.filter)(function (e) { return tree !== e.node; }));
    };
    TreeService.prototype.fireNodeRenameKeydownEvent = function (tree, e) {
        this.nodeRenameKeydown$.next(new tree_events_1.NodeRenameKeydownEvent(tree, e));
    };
    TreeService.prototype.fireNodeRenameInputChanged = function (tree, e) {
        this.nodeRenameInputChange$.next(new tree_events_1.NodeRenameInputChangeEvent(tree, e));
    };
    TreeService.prototype.fireNodeRemoved = function (tree) {
        this.nodeRemoved$.next(new tree_events_1.NodeRemovedEvent(tree, tree.positionInParent));
    };
    TreeService.prototype.fireNodeCreated = function (tree) {
        this.nodeCreated$.next(new tree_events_1.NodeCreatedEvent(tree));
    };
    TreeService.prototype.fireNodeDoubleClicked = function (tree, e) {
        this.nodeDoubleClicked$.next(new tree_events_1.NodeDoubleClickedEvent(tree, e));
    };
    TreeService.prototype.fireNodeSelected = function (tree) {
        this.nodeSelected$.next(new tree_events_1.NodeSelectedEvent(tree));
    };
    TreeService.prototype.fireNodeUnselected = function (tree) {
        this.nodeUnselected$.next(new tree_events_1.NodeUnselectedEvent(tree));
    };
    TreeService.prototype.fireNodeRenamed = function (oldValue, tree) {
        this.nodeRenamed$.next(new tree_events_1.NodeRenamedEvent(tree, oldValue, tree.value));
    };
    TreeService.prototype.fireNodeMoved = function (tree, parent, previousPosition) {
        this.nodeMoved$.next(new tree_events_1.NodeMovedEvent(tree, parent, previousPosition));
    };
    TreeService.prototype.fireMenuItemSelected = function (tree, selectedItem) {
        this.menuItemSelected$.next(new tree_events_1.MenuItemSelectedEvent(tree, selectedItem));
    };
    TreeService.prototype.fireNodeSwitchFoldingType = function (tree) {
        if (tree.isNodeExpanded()) {
            this.fireNodeExpanded(tree);
            if (this.shouldFireLoadNextLevel(tree)) {
                this.fireLoadNextLevel(tree);
            }
        }
        else if (tree.isNodeCollapsed()) {
            this.fireNodeCollapsed(tree);
        }
    };
    TreeService.prototype.fireNodeExpanded = function (tree) {
        this.nodeExpanded$.next(new tree_events_1.NodeExpandedEvent(tree));
    };
    TreeService.prototype.fireNodeCollapsed = function (tree) {
        this.nodeCollapsed$.next(new tree_events_1.NodeCollapsedEvent(tree));
    };
    TreeService.prototype.fireLoadNextLevel = function (tree) {
        this.loadNextLevel$.next(new tree_events_1.LoadNextLevelEvent(tree));
    };
    TreeService.prototype.fireNodeChecked = function (tree) {
        this.nodeChecked$.next(new tree_events_1.NodeCheckedEvent(tree));
    };
    TreeService.prototype.fireNodeUnchecked = function (tree) {
        this.nodeUnchecked$.next(new tree_events_1.NodeUncheckedEvent(tree));
    };
    TreeService.prototype.fireNodeIndeterminate = function (tree, indeterminate) {
        this.nodeIndeterminate$.next(new tree_events_1.NodeIndeterminateEvent(tree, indeterminate));
    };
    TreeService.prototype.draggedStream = function (tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$.pipe((0, operators_1.filter)(function (e) { return e.target === element; }), (0, operators_1.filter)(function (e) { return !e.captured.some(function (cn) { return cn.tree.hasChild(tree); }); }));
    };
    TreeService.prototype.setController = function (id, controller) {
        this.controllers.set(id, controller);
    };
    TreeService.prototype.deleteController = function (id) {
        if (this.controllers.has(id)) {
            this.controllers.delete(id);
        }
    };
    TreeService.prototype.getController = function (id) {
        if (this.controllers.has(id)) {
            return this.controllers.get(id);
        }
        return null;
    };
    TreeService.prototype.hasController = function (id) {
        return this.controllers.has(id);
    };
    TreeService.prototype.shouldFireLoadNextLevel = function (tree) {
        var shouldLoadNextLevel = tree.node.emitLoadNextLevel &&
            !tree.node.loadChildren &&
            !tree.childrenAreBeingLoaded() &&
            (0, fn_utils_1.isEmpty)(tree.children);
        if (shouldLoadNextLevel) {
            tree.loadingChildrenRequested();
        }
        return shouldLoadNextLevel;
    };
    TreeService.ɵfac = function TreeService_Factory(t) { return new (t || TreeService)(i0.ɵɵinject(node_draggable_service_1.NodeDraggableService)); };
    TreeService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TreeService, factory: TreeService.ɵfac });
    return TreeService;
}());
exports.TreeService = TreeService;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeService, [{
        type: core_1.Injectable
    }], function () { return [{ type: i1.NodeDraggableService, decorators: [{
                type: core_1.Inject,
                args: [node_draggable_service_1.NodeDraggableService]
            }] }]; }, null); })();
//# sourceMappingURL=tree.service.js.map