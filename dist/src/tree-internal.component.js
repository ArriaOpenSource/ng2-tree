"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TreeTypes = require("./tree.types");
var tree_types_1 = require("./tree.types");
var tree_1 = require("./tree");
var tree_controller_1 = require("./tree-controller");
var node_menu_service_1 = require("./menu/node-menu.service");
var menu_events_1 = require("./menu/menu.events");
var editable_events_1 = require("./editable/editable.events");
var tree_service_1 = require("./tree.service");
var EventUtils = require("./utils/event.utils");
var draggable_events_1 = require("./draggable/draggable.events");
var fn_utils_1 = require("./utils/fn.utils");
var node_draggable_service_1 = require("./draggable/node-draggable.service");
var captured_node_1 = require("./draggable/captured-node");
var TreeInternalComponent = (function () {
    function TreeInternalComponent(nodeMenuService, treeService, nodeDraggableService, nodeElementRef) {
        this.nodeMenuService = nodeMenuService;
        this.treeService = treeService;
        this.nodeDraggableService = nodeDraggableService;
        this.nodeElementRef = nodeElementRef;
        this.isSelected = false;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
        this.isReadOnly = false;
        this.subscriptions = [];
    }
    TreeInternalComponent.prototype.ngAfterViewInit = function () {
        if (this.tree.checked && !this.tree.firstCheckedFired) {
            this.tree.firstCheckedFired = true;
            this.treeService.fireNodeChecked(this.tree);
        }
    };
    TreeInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var nodeId = fn_utils_1.get(this.tree, 'node.id', '');
        if (nodeId) {
            this.controller = new tree_controller_1.TreeController(this);
            this.treeService.setController(nodeId, this.controller);
        }
        this.settings = this.settings || new tree_types_1.Ng2TreeSettings();
        this.isReadOnly = !fn_utils_1.get(this.settings, 'enableCheckboxes', true);
        if (this.tree.isRoot() && this.settings.rootIsVisible === false) {
            this.tree.disableCollapseOnInit();
        }
        this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(function () {
            _this.isRightMenuVisible = false;
            _this.isLeftMenuVisible = false;
        }));
        this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function () { return (_this.isSelected = false); }));
        this.subscriptions.push(this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe(function (e) {
            // Remove child nodes if parent is being moved (child nodes will move with the parent)
            var nodesToMove = e.captured.filter(function (cn) { return !cn.tree.parent.checked; });
            var i = nodesToMove.length;
            while (i--) {
                var node = nodesToMove[i];
                var ctrl = _this.treeService.getController(node.tree.id);
                if (ctrl.isChecked()) {
                    ctrl.uncheck();
                }
                if (_this.tree.isBranch() && e.position === draggable_events_1.DropPosition.Into) {
                    _this.moveNodeToThisTreeAndRemoveFromPreviousOne(node.tree, _this.tree);
                }
                else if (_this.tree.hasSibling(node.tree)) {
                    _this.moveSibling(node.tree, _this.tree, e.position);
                }
                else {
                    _this.moveNodeToParentTreeAndRemoveFromPreviousOne(node.tree, _this.tree, e.position);
                }
            }
            var parentCtrl = _this.treeService.getController(_this.tree.parent.id);
            if (parentCtrl) {
                parentCtrl.updateCheckboxState();
            }
        }));
        this.subscriptions.push(this.treeService.nodeChecked$
            .merge(this.treeService.nodeUnchecked$)
            .filter(function (e) { return _this.eventContainsId(e) && _this.tree.hasChild(e.node); })
            .subscribe(function (e) { return _this.updateCheckboxState(); }));
    };
    TreeInternalComponent.prototype.ngOnChanges = function (changes) {
        this.controller = new tree_controller_1.TreeController(this);
    };
    TreeInternalComponent.prototype.ngOnDestroy = function () {
        if (fn_utils_1.get(this.tree, 'node.id', '') && !(this.tree.parent && this.tree.parent.children.indexOf(this.tree) > -1)) {
            this.treeService.deleteController(this.tree.node.id);
        }
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    TreeInternalComponent.prototype.moveSibling = function (sibling, tree, position) {
        var previousPositionInParent = sibling.positionInParent;
        if (position === draggable_events_1.DropPosition.Above) {
            tree.moveSiblingAbove(sibling);
        }
        else {
            tree.moveSiblingBelow(sibling);
        }
        this.treeService.fireNodeMoved(sibling, sibling.parent, previousPositionInParent);
    };
    TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function (capturedTree, moveToTree) {
        var _this = this;
        capturedTree.removeItselfFromParent();
        setTimeout(function () {
            var addedChild = moveToTree.addChild(capturedTree);
            _this.treeService.fireNodeMoved(addedChild, capturedTree.parent);
        });
    };
    TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function (capturedTree, moveToTree, position) {
        var _this = this;
        capturedTree.removeItselfFromParent();
        setTimeout(function () {
            var insertAtIndex = moveToTree.positionInParent;
            if (position === draggable_events_1.DropPosition.Below) {
                insertAtIndex++;
            }
            var addedSibling = moveToTree.addSibling(capturedTree, insertAtIndex);
            _this.treeService.fireNodeMoved(addedSibling, capturedTree.parent);
        });
    };
    TreeInternalComponent.prototype.onNodeDoubleClicked = function () {
        if (!this.tree.selectionAllowed) {
            return;
        }
        this.treeService.fireNodeDoubleClicked(this.tree);
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = true;
            this.treeService.fireNodeSelected(this.tree);
        }
    };
    TreeInternalComponent.prototype.onNodeUnselected = function (e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = false;
            this.treeService.fireNodeUnselected(this.tree);
        }
    };
    TreeInternalComponent.prototype.showRightMenu = function (e) {
        if (!this.tree.hasRightMenu()) {
            return;
        }
        if (EventUtils.isRightButtonClicked(e)) {
            this.isRightMenuVisible = !this.isRightMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.showLeftMenu = function (e) {
        if (!this.tree.hasLeftMenu()) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isLeftMenuVisible = !this.isLeftMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
            if (this.isLeftMenuVisible) {
                e.preventDefault();
            }
        }
    };
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case menu_events_1.NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
            case menu_events_1.NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
            case menu_events_1.NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
            case menu_events_1.NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
            case menu_events_1.NodeMenuItemAction.Custom:
                this.onCustomSelected();
                this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === menu_events_1.NodeMenuItemAction.NewFolder);
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.deleteController(fn_utils_1.get(this.tree, 'node.id', ''));
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.onCustomSelected = function () {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onSwitchFoldingType = function () {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    };
    TreeInternalComponent.prototype.applyNewValue = function (e) {
        if ((e.action === editable_events_1.NodeEditableEventAction.Cancel || this.tree.isNew()) && tree_1.Tree.isValueEmpty(e.value)) {
            return this.treeService.fireNodeRemoved(this.tree);
        }
        if (this.tree.isNew()) {
            this.tree.value = e.value;
            this.treeService.fireNodeCreated(this.tree);
        }
        if (this.tree.isBeingRenamed()) {
            var oldValue = this.tree.value;
            this.tree.value = e.value;
            this.treeService.fireNodeRenamed(oldValue, this.tree);
        }
        this.tree.markAsModified();
    };
    TreeInternalComponent.prototype.shouldShowInputForTreeValue = function () {
        return this.tree.isNew() || this.tree.isBeingRenamed();
    };
    TreeInternalComponent.prototype.isRootHidden = function () {
        return this.tree.isRoot() && !this.settings.rootIsVisible;
    };
    TreeInternalComponent.prototype.hasCustomMenu = function () {
        return this.tree.hasCustomMenu();
    };
    TreeInternalComponent.prototype.switchNodeCheckStatus = function () {
        if (!this.tree.checked) {
            this.onNodeChecked();
        }
        else {
            this.onNodeUnchecked();
        }
    };
    TreeInternalComponent.prototype.onNodeChecked = function (ignoreChildren) {
        if (ignoreChildren === void 0) { ignoreChildren = false; }
        if (!this.checkboxElementRef) {
            return;
        }
        if (!this.tree.checked) {
            this.nodeDraggableService.addCheckedNode(new captured_node_1.CapturedNode(this.nodeElementRef, this.tree));
            this.onNodeIndeterminate(false);
            this.tree.checked = true;
            this.treeService.fireNodeChecked(this.tree);
        }
        if (!ignoreChildren) {
            this.executeOnChildController(function (controller) { return controller.check(); });
        }
    };
    TreeInternalComponent.prototype.onNodeUnchecked = function (ignoreChildren) {
        if (ignoreChildren === void 0) { ignoreChildren = false; }
        if (!this.checkboxElementRef) {
            return;
        }
        if (this.tree.checked) {
            this.nodeDraggableService.removeCheckedNodeById(this.tree.id);
            this.onNodeIndeterminate(false);
            this.tree.checked = false;
            this.treeService.fireNodeUnchecked(this.tree);
        }
        if (!ignoreChildren) {
            this.executeOnChildController(function (controller) { return controller.uncheck(); });
        }
    };
    TreeInternalComponent.prototype.onNodeIndeterminate = function (indeterminate) {
        if (!this.checkboxElementRef || this.checkboxElementRef.nativeElement.indeterminate === indeterminate) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = indeterminate;
        this.treeService.fireNodeIndeterminate(this.tree, indeterminate);
    };
    TreeInternalComponent.prototype.executeOnChildController = function (executor) {
        var _this = this;
        if (this.tree.hasLoadedChildren()) {
            this.tree.children.forEach(function (child) {
                var controller = _this.treeService.getController(child.id);
                if (!fn_utils_1.isNil(controller)) {
                    executor(controller);
                }
            });
        }
    };
    TreeInternalComponent.prototype.updateCheckboxState = function () {
        var _this = this;
        // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
        setTimeout(function () {
            var checkedChildrenAmount = _this.tree.checkedChildrenAmount();
            if (checkedChildrenAmount === 0) {
                _this.onNodeUnchecked(true);
                _this.onNodeIndeterminate(false);
            }
            else if (checkedChildrenAmount === _this.tree.loadedChildrenAmount()) {
                if (!_this.settings.ignoreParentOnCheck) {
                    _this.onNodeChecked(true);
                    _this.onNodeIndeterminate(false);
                }
                else if (!_this.tree.checked) {
                    _this.onNodeIndeterminate(true);
                }
            }
            else {
                _this.onNodeUnchecked(true);
                _this.onNodeIndeterminate(true);
            }
        });
    };
    TreeInternalComponent.prototype.eventContainsId = function (event) {
        if (!event.node.id) {
            console.warn('"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.');
            return false;
        }
        return true;
    };
    TreeInternalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree-internal',
                    template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden(), checked: tree.checked}\"\n        [class.selected]=\"isSelected\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"nodeElementRef\"\n        [tree]=\"tree\">\n\n        <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n          <input checkbox  type=\"checkbox\" [disabled]=\"isReadOnly\" [checked]=\"tree.checked\" (change)=\"switchNodeCheckStatus()\" #checkbox />\n        </div>\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (dblClick)=\"onNodeDoubleClicked()\"\n          (click)=\"onNodeSelected($event)\">\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"></ng-template>\n        </div>\n\n        <input type=\"text\" class=\"node-value\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n        <div class=\"drag-template\" *ngIf=\"tree.hasDragIcon()\" [innerHTML]=\"tree.dragTemplate | safeHtml\"></div>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <node-menu *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n           [menuItems]=\"tree.menuItems\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{'display': tree.isNodeExpanded() ? 'block' : 'none'}\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </div>\n      <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeInternalComponent.ctorParameters = function () { return [
        { type: node_menu_service_1.NodeMenuService, },
        { type: tree_service_1.TreeService, },
        { type: node_draggable_service_1.NodeDraggableService, },
        { type: core_1.ElementRef, },
    ]; };
    TreeInternalComponent.propDecorators = {
        "tree": [{ type: core_1.Input },],
        "settings": [{ type: core_1.Input },],
        "template": [{ type: core_1.Input },],
        "checkboxElementRef": [{ type: core_1.ViewChild, args: ['checkbox',] },],
    };
    return TreeInternalComponent;
}());
exports.TreeInternalComponent = TreeInternalComponent;
//# sourceMappingURL=tree-internal.component.js.map