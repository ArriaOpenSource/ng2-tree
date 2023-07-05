"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeInternalComponent = void 0;
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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var i0 = require("@angular/core");
var i1 = require("./menu/node-menu.service");
var i2 = require("./tree.service");
var i3 = require("./draggable/node-draggable.service");
var i4 = require("@angular/common");
var i5 = require("./draggable/node-draggable.directive");
var i6 = require("@angular/material/tooltip");
var i7 = require("./editable/node-editable.directive");
var i8 = require("./menu/node-menu.component");
var i9 = require("./utils/safe-html.pipe");
var _c0 = ["checkbox"];
function TreeInternalComponent_ul_0_div_3_Template(rf, ctx) { if (rf & 1) {
    var _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelementStart(1, "input", 15, 16);
    i0.ɵɵlistener("change", function TreeInternalComponent_ul_0_div_3_Template_input_change_1_listener() { i0.ɵɵrestoreView(_r13); var ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.switchNodeCheckStatus(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r1.isReadOnly)("checked", ctx_r1.tree.checked);
} }
function TreeInternalComponent_ul_0_div_5_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 23);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    var ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r14.tree.nodeTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_div_5_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 24);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    var ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r15.tree.value), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_div_5_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 25);
} }
function TreeInternalComponent_ul_0_div_5_ng_template_5_Template(rf, ctx) { }
var _c1 = function (a0) { return { $implicit: a0 }; };
function TreeInternalComponent_ul_0_div_5_Template(rf, ctx) { if (rf & 1) {
    var _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵlistener("dblclick", function TreeInternalComponent_ul_0_div_5_Template_div_dblclick_0_listener($event) { i0.ɵɵrestoreView(_r19); var ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.onNodeDoubleClicked($event); })("click", function TreeInternalComponent_ul_0_div_5_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r19); var ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.onNodeSelected($event); });
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtemplate(2, TreeInternalComponent_ul_0_div_5_div_2_Template, 2, 3, "div", 19);
    i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_5_span_3_Template, 2, 3, "span", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, TreeInternalComponent_ul_0_div_5_span_4_Template, 1, 0, "span", 21);
    i0.ɵɵtemplate(5, TreeInternalComponent_ul_0_div_5_ng_template_5_Template, 0, 0, "ng-template", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("node-selected", ctx_r2.isSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r2.tree.tooltip)("matTooltipPosition", ctx_r2.tree.tooltipPosition);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.tree.nodeTemplate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.template);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.tree.childrenAreBeingLoaded());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(9, _c1, ctx_r2.tree.node));
} }
function TreeInternalComponent_ul_0_input_6_Template(rf, ctx) { if (rf & 1) {
    var _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 26);
    i0.ɵɵlistener("keydown", function TreeInternalComponent_ul_0_input_6_Template_input_keydown_0_listener($event) { i0.ɵɵrestoreView(_r22); var ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.keydownHandler($event); })("input", function TreeInternalComponent_ul_0_input_6_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r22); var ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.inputChangeHandler($event); })("valueChanged", function TreeInternalComponent_ul_0_input_6_Template_input_valueChanged_0_listener($event) { i0.ɵɵrestoreView(_r22); var ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.applyNewValue($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeEditable", ctx_r3.tree.value);
} }
function TreeInternalComponent_ul_0_div_7_Template(rf, ctx) { if (rf & 1) {
    var _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_div_7_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r26); var ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.showLeftMenu($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r4.tree.leftMenuTemplate, i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_8_Template(rf, ctx) { if (rf & 1) {
    var _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 28);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_8_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r28); var ctx_r27 = i0.ɵɵnextContext(2); return ctx_r27.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} }
function TreeInternalComponent_ul_0_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 29);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    var ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r6.tree.dragTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_10_Template(rf, ctx) { if (rf & 1) {
    var _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 30);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_10_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r30); var ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("cursorCoordinates", ctx_r7.cursorCoordinates);
} }
function TreeInternalComponent_ul_0_node_menu_11_Template(rf, ctx) { if (rf & 1) {
    var _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 31);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_11_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r32); var ctx_r31 = i0.ɵɵnextContext(2); return ctx_r31.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("menuItems", ctx_r8.tree.menuItems)("cursorCoordinates", ctx_r8.cursorCoordinates);
} }
function TreeInternalComponent_ul_0_div_12_tree_internal_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 34);
} if (rf & 2) {
    var child_r34 = ctx.$implicit;
    var ctx_r33 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r34)("template", ctx_r33.template)("settings", ctx_r33.settings);
} }
var _c2 = function (a0) { return { "display": a0 }; };
function TreeInternalComponent_ul_0_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_12_tree_internal_1_Template, 1, 3, "tree-internal", 33);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c2, ctx_r9.tree.isNodeExpanded() ? "block" : "none"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r9.tree.childrenAsync));
} }
function TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 34);
} if (rf & 2) {
    var child_r36 = ctx.$implicit;
    var ctx_r35 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r36)("template", ctx_r35.template)("settings", ctx_r35.settings);
} }
function TreeInternalComponent_ul_0_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template, 1, 3, "tree-internal", 33);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    var ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(1, 1, ctx_r10.tree.childrenAsync));
} }
var _c3 = function (a0) { return { rootless: a0 }; };
var _c4 = function (a0, a1) { return { rootless: a0, checked: a1 }; };
function TreeInternalComponent_ul_0_Template(rf, ctx) { if (rf & 1) {
    var _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ul", 1);
    i0.ɵɵelementStart(1, "li");
    i0.ɵɵelementStart(2, "div", 2);
    i0.ɵɵlistener("contextmenu", function TreeInternalComponent_ul_0_Template_div_contextmenu_2_listener($event) { i0.ɵɵrestoreView(_r38); var ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.showRightMenu($event); });
    i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_3_Template, 3, 2, "div", 3);
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_Template_div_click_4_listener() { i0.ɵɵrestoreView(_r38); var ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.onSwitchFoldingType(); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, TreeInternalComponent_ul_0_div_5_Template, 6, 11, "div", 5);
    i0.ɵɵtemplate(6, TreeInternalComponent_ul_0_input_6_Template, 1, 1, "input", 6);
    i0.ɵɵtemplate(7, TreeInternalComponent_ul_0_div_7_Template, 1, 1, "div", 7);
    i0.ɵɵtemplate(8, TreeInternalComponent_ul_0_node_menu_8_Template, 1, 0, "node-menu", 8);
    i0.ɵɵtemplate(9, TreeInternalComponent_ul_0_div_9_Template, 2, 3, "div", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, TreeInternalComponent_ul_0_node_menu_10_Template, 1, 1, "node-menu", 10);
    i0.ɵɵtemplate(11, TreeInternalComponent_ul_0_node_menu_11_Template, 1, 2, "node-menu", 11);
    i0.ɵɵtemplate(12, TreeInternalComponent_ul_0_div_12_Template, 3, 6, "div", 12);
    i0.ɵɵtemplate(13, TreeInternalComponent_ul_0_ng_template_13_Template, 2, 3, "ng-template", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c3, ctx_r0.isRootHidden()));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r0.isSelected);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(19, _c4, ctx_r0.isRootHidden(), ctx_r0.tree.checked))("nodeDraggable", ctx_r0.nodeElementRef)("tree", ctx_r0.tree);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.settings.showCheckboxes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r0.tree.foldingCssClass);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.shouldShowInputForTreeValue());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.shouldShowInputForTreeValue());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tree.hasLeftMenu());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tree.hasLeftMenu() && ctx_r0.isLeftMenuVisible && !ctx_r0.hasCustomMenu());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tree.hasDragIcon());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isRightMenuVisible && !ctx_r0.hasCustomMenu());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasCustomMenu() && (ctx_r0.isRightMenuVisible || ctx_r0.isLeftMenuVisible));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tree.keepNodesInDOM());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tree.isNodeExpanded() && !ctx_r0.tree.keepNodesInDOM());
} }
var TreeInternalComponent = /** @class */ (function () {
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
            this.nodeDraggableService.addCheckedNode(new captured_node_1.CapturedNode(this.nodeElementRef, this.tree));
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
            _this.hideMenus();
        }));
        this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function () { return (_this.isSelected = false); }));
        this.subscriptions.push(this.treeService
            .draggedStream(this.tree, this.nodeElementRef)
            .subscribe(function (e) { return _this.nodeDraggedHandler(e); }));
        this.subscriptions.push(rxjs_1.merge(this.treeService.nodeChecked$, this.treeService.nodeUnchecked$)
            .pipe(operators_1.filter(function (e) { return _this.eventContainsId(e) && _this.tree.hasChild(e.node); }))
            .subscribe(function (e) { return _this.updateCheckboxState(); }));
    };
    TreeInternalComponent.prototype.ngOnChanges = function (changes) {
        this.controller = new tree_controller_1.TreeController(this);
    };
    TreeInternalComponent.prototype.ngOnDestroy = function () {
        if (fn_utils_1.get(this.tree, 'node.id', '') && !(this.tree.parent && this.tree.parent.children.indexOf(this.tree) > -1)) {
            this.treeService.deleteController(this.tree.node.id);
        }
        this.nodeDraggableService.releaseDraggedNode();
        this.nodeDraggableService.releaseCheckedNodes();
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    TreeInternalComponent.prototype.nodeDraggedHandler = function (e) {
        // Remove child nodes if parent is being moved (child nodes will move with the parent)
        var nodesToMove = e.captured.filter(function (cn) { return !cn.tree.parent || !cn.tree.parent.checked; });
        var i = nodesToMove.length;
        while (i--) {
            var node = nodesToMove[i];
            if (node.tree.id) {
                var ctrl = this.treeService.getController(node.tree.id);
                if (ctrl.isChecked()) {
                    ctrl.uncheck();
                }
            }
            if (this.tree.isBranch() && e.position === draggable_events_1.DropPosition.Into) {
                this.moveNodeToThisTreeAndRemoveFromPreviousOne(node.tree, this.tree);
            }
            else if (this.tree.hasSibling(node.tree)) {
                this.moveSibling(node.tree, this.tree, e.position);
            }
            else {
                this.moveNodeToParentTreeAndRemoveFromPreviousOne(node.tree, this.tree, e.position);
            }
        }
        if (!this.tree.isRoot()) {
            var parentCtrl = this.treeService.getController(this.tree.parent.id);
            if (parentCtrl) {
                parentCtrl.updateCheckboxState();
            }
        }
    };
    TreeInternalComponent.prototype.hideMenus = function () {
        this.cursorCoordinates = undefined;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.moveSibling = function (sibling, tree, position) {
        var previousPositionInParent = sibling.positionInParent;
        if (position === draggable_events_1.DropPosition.Above) {
            tree.moveSiblingAbove(sibling);
        }
        else if (position === draggable_events_1.DropPosition.Below) {
            tree.moveSiblingBelow(sibling);
        }
        else {
            console.error("Invalid drop position: " + draggable_events_1.DropPosition[position]);
            return;
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
    TreeInternalComponent.prototype.onNodeDoubleClicked = function (e) {
        this.treeService.fireNodeDoubleClicked(this.tree, e);
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (!this.tree.selectionAllowed) {
            if (this.tree.isBranch()) {
                // Expand/collapse folder on click
                this.onSwitchFoldingType();
            }
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
            this.setCursorCoordinates(e);
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
    TreeInternalComponent.prototype.setCursorCoordinates = function (e) {
        this.cursorCoordinates = { x: e.clientX, y: e.clientY };
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === menu_events_1.NodeMenuItemAction.NewFolder);
        this.hideMenus();
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.hideMenus();
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        var nodeId = fn_utils_1.get(this.tree, 'node.id', '');
        this.nodeDraggableService.removeCheckedNodeById(nodeId);
        this.treeService.deleteController(nodeId);
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.onCustomSelected = function () {
        this.hideMenus();
    };
    TreeInternalComponent.prototype.onSwitchFoldingType = function () {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    };
    TreeInternalComponent.prototype.keydownHandler = function (e) {
        this.treeService.fireNodeRenameKeydownEvent(this.tree, e);
    };
    TreeInternalComponent.prototype.inputChangeHandler = function (e) {
        this.treeService.fireNodeRenameInputChanged(this.tree, e);
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
    TreeInternalComponent.ɵfac = function TreeInternalComponent_Factory(t) { return new (t || TreeInternalComponent)(i0.ɵɵdirectiveInject(i1.NodeMenuService), i0.ɵɵdirectiveInject(i2.TreeService), i0.ɵɵdirectiveInject(i3.NodeDraggableService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    TreeInternalComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TreeInternalComponent, selectors: [["tree-internal"]], viewQuery: function TreeInternalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 1);
        } if (rf & 2) {
            var _t = void 0;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.checkboxElementRef = _t.first);
        } }, inputs: { tree: "tree", settings: "settings", template: "template" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "tree", 3, "ngClass", 4, "ngIf"], [1, "tree", 3, "ngClass"], [1, "value-container", 3, "ngClass", "nodeDraggable", "tree", "contextmenu"], ["class", "node-checkbox", 4, "ngIf"], [1, "folding", 3, "ngClass", "click"], ["class", "node-value", 3, "node-selected", "dblclick", "click", 4, "ngIf"], ["type", "text", "class", "node-value", "id", "rename-input", 3, "nodeEditable", "keydown", "input", "valueChanged", 4, "ngIf"], ["class", "node-left-menu", 3, "innerHTML", "click", 4, "ngIf"], [3, "menuItemSelected", 4, "ngIf"], ["class", "drag-template", 3, "innerHTML", 4, "ngIf"], [3, "cursorCoordinates", "menuItemSelected", 4, "ngIf"], [3, "menuItems", "cursorCoordinates", "menuItemSelected", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngIf"], [1, "node-checkbox"], ["checkbox", "", "type", "checkbox", 3, "disabled", "checked", "change"], ["checkbox", ""], [1, "node-value", 3, "dblclick", "click"], ["matTooltipClass", "ng2-tree-tooltip", 3, "matTooltip", "matTooltipPosition"], ["class", "node-template", 3, "innerHTML", 4, "ngIf"], ["class", "node-name", 3, "innerHTML", 4, "ngIf"], ["class", "loading-children", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node-template", 3, "innerHTML"], [1, "node-name", 3, "innerHTML"], [1, "loading-children"], ["type", "text", "id", "rename-input", 1, "node-value", 3, "nodeEditable", "keydown", "input", "valueChanged"], [1, "node-left-menu", 3, "innerHTML", "click"], [3, "menuItemSelected"], [1, "drag-template", 3, "innerHTML"], [3, "cursorCoordinates", "menuItemSelected"], [3, "menuItems", "cursorCoordinates", "menuItemSelected"], [3, "ngStyle"], [3, "tree", "template", "settings", 4, "ngFor", "ngForOf"], [3, "tree", "template", "settings"]], template: function TreeInternalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_Template, 14, 22, "ul", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.tree);
        } }, directives: [i4.NgIf, i4.NgClass, i5.NodeDraggableDirective, i6.MatTooltip, i4.NgTemplateOutlet, i7.NodeEditableDirective, i8.NodeMenuComponent, i4.NgStyle, i4.NgForOf, TreeInternalComponent], pipes: [i9.SafeHtmlPipe, i4.AsyncPipe], encapsulation: 2 });
    return TreeInternalComponent;
}());
exports.TreeInternalComponent = TreeInternalComponent;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeInternalComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'tree-internal',
                template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden(), checked: tree.checked}\"\n        [class.selected]=\"isSelected\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"nodeElementRef\"\n        [tree]=\"tree\">\n\n        <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n          <input checkbox  type=\"checkbox\" [disabled]=\"isReadOnly\" [checked]=\"tree.checked\" (change)=\"switchNodeCheckStatus()\" #checkbox />\n        </div>\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (dblclick)=\"onNodeDoubleClicked($event)\"\n          (click)=\"onNodeSelected($event)\">\n            <div [matTooltip]=\"tree.tooltip\" [matTooltipPosition]=\"tree.tooltipPosition\" matTooltipClass=\"ng2-tree-tooltip\">\n              <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n              <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            </div>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"></ng-template>\n        </div>\n\n        <input type=\"text\" class=\"node-value\" id=\"rename-input\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (keydown)=\"keydownHandler($event)\"\n           (input)=\"inputChangeHandler($event)\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n        <div class=\"drag-template\" *ngIf=\"tree.hasDragIcon()\" [innerHTML]=\"tree.dragTemplate | safeHtml\"></div>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\"\n           [cursorCoordinates]=\"cursorCoordinates\">\n      </node-menu>\n\n      <node-menu *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n           [menuItems]=\"tree.menuItems\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\"\n           [cursorCoordinates]=\"cursorCoordinates\">\n      </node-menu>\n\n      <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{'display': tree.isNodeExpanded() ? 'block' : 'none'}\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </div>\n      <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
            }]
    }], function () { return [{ type: i1.NodeMenuService }, { type: i2.TreeService }, { type: i3.NodeDraggableService }, { type: i0.ElementRef }]; }, { tree: [{
            type: core_1.Input
        }], settings: [{
            type: core_1.Input
        }], template: [{
            type: core_1.Input
        }], checkboxElementRef: [{
            type: core_1.ViewChild,
            args: ['checkbox']
        }] }); })();
//# sourceMappingURL=tree-internal.component.js.map