import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import * as TreeTypes from './tree.types';
import { Ng2TreeSettings } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeMenuItemAction } from './menu/menu.events';
import { NodeEditableEventAction } from './editable/editable.events';
import { TreeService } from './tree.service';
import * as EventUtils from './utils/event.utils';
import { DropPosition } from './draggable/draggable.events';
import { get, isNil } from './utils/fn.utils';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { CapturedNode } from './draggable/captured-node';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./menu/node-menu.service";
import * as i2 from "./tree.service";
import * as i3 from "./draggable/node-draggable.service";
import * as i4 from "@angular/common";
import * as i5 from "./draggable/node-draggable.directive";
import * as i6 from "./editable/node-editable.directive";
import * as i7 from "./menu/node-menu.component";
import * as i8 from "./utils/safe-html.pipe";
const _c0 = ["checkbox"];
function TreeInternalComponent_ul_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "input", 14, 15);
    i0.ɵɵlistener("change", function TreeInternalComponent_ul_0_div_3_Template_input_change_1_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.switchNodeCheckStatus(); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r1.isReadOnly)("checked", ctx_r1.tree.checked);
} }
function TreeInternalComponent_ul_0_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 21);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r14.tree.nodeTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_div_5_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 22);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r15.tree.value), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_div_5_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 23);
} }
function TreeInternalComponent_ul_0_div_5_ng_template_4_Template(rf, ctx) { }
const _c1 = function (a0) { return { $implicit: a0 }; };
function TreeInternalComponent_ul_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵlistener("dblclick", function TreeInternalComponent_ul_0_div_5_Template_div_dblclick_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.onNodeDoubleClicked($event); })("click", function TreeInternalComponent_ul_0_div_5_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r20 = i0.ɵɵnextContext(2); return ctx_r20.onNodeSelected($event); });
    i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_5_div_1_Template, 2, 3, "div", 17);
    i0.ɵɵtemplate(2, TreeInternalComponent_ul_0_div_5_span_2_Template, 2, 3, "span", 18);
    i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_5_span_3_Template, 1, 0, "span", 19);
    i0.ɵɵtemplate(4, TreeInternalComponent_ul_0_div_5_ng_template_4_Template, 0, 0, "ng-template", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("node-selected", ctx_r2.isSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.tree.nodeTemplate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r2.template);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.tree.childrenAreBeingLoaded());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c1, ctx_r2.tree.node));
} }
function TreeInternalComponent_ul_0_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 24);
    i0.ɵɵlistener("keydown", function TreeInternalComponent_ul_0_input_6_Template_input_keydown_0_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.keydownHandler($event); })("input", function TreeInternalComponent_ul_0_input_6_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.inputChangeHandler($event); })("valueChanged", function TreeInternalComponent_ul_0_input_6_Template_input_valueChanged_0_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.applyNewValue($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeEditable", ctx_r3.tree.value);
} }
function TreeInternalComponent_ul_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_div_7_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.showLeftMenu($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r4.tree.leftMenuTemplate, i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_8_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 26);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_8_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r27 = i0.ɵɵnextContext(2); return ctx_r27.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} }
function TreeInternalComponent_ul_0_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 27);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r6.tree.dragTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_10_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 26);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_10_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r30); const ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} }
function TreeInternalComponent_ul_0_node_menu_11_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 28);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_11_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r32); const ctx_r31 = i0.ɵɵnextContext(2); return ctx_r31.onMenuItemSelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("menuItems", ctx_r8.tree.menuItems);
} }
function TreeInternalComponent_ul_0_div_12_tree_internal_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 31);
} if (rf & 2) {
    const child_r34 = ctx.$implicit;
    const ctx_r33 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r34)("template", ctx_r33.template)("settings", ctx_r33.settings);
} }
const _c2 = function (a0) { return { "display": a0 }; };
function TreeInternalComponent_ul_0_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_12_tree_internal_1_Template, 1, 3, "tree-internal", 30);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c2, ctx_r9.tree.isNodeExpanded() ? "block" : "none"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r9.tree.childrenAsync));
} }
function TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 31);
} if (rf & 2) {
    const child_r36 = ctx.$implicit;
    const ctx_r35 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r36)("template", ctx_r35.template)("settings", ctx_r35.settings);
} }
function TreeInternalComponent_ul_0_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template, 1, 3, "tree-internal", 30);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(1, 1, ctx_r10.tree.childrenAsync));
} }
const _c3 = function (a0) { return { rootless: a0 }; };
const _c4 = function (a0, a1) { return { rootless: a0, checked: a1 }; };
function TreeInternalComponent_ul_0_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ul", 1)(1, "li")(2, "div", 2);
    i0.ɵɵlistener("contextmenu", function TreeInternalComponent_ul_0_Template_div_contextmenu_2_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.showRightMenu($event); });
    i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_3_Template, 3, 2, "div", 3);
    i0.ɵɵelementStart(4, "div", 4);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_Template_div_click_4_listener() { i0.ɵɵrestoreView(_r38); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.onSwitchFoldingType(); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, TreeInternalComponent_ul_0_div_5_Template, 5, 9, "div", 5);
    i0.ɵɵtemplate(6, TreeInternalComponent_ul_0_input_6_Template, 1, 1, "input", 6);
    i0.ɵɵtemplate(7, TreeInternalComponent_ul_0_div_7_Template, 1, 1, "div", 7);
    i0.ɵɵtemplate(8, TreeInternalComponent_ul_0_node_menu_8_Template, 1, 0, "node-menu", 8);
    i0.ɵɵtemplate(9, TreeInternalComponent_ul_0_div_9_Template, 2, 3, "div", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, TreeInternalComponent_ul_0_node_menu_10_Template, 1, 0, "node-menu", 8);
    i0.ɵɵtemplate(11, TreeInternalComponent_ul_0_node_menu_11_Template, 1, 1, "node-menu", 10);
    i0.ɵɵtemplate(12, TreeInternalComponent_ul_0_div_12_Template, 3, 6, "div", 11);
    i0.ɵɵtemplate(13, TreeInternalComponent_ul_0_ng_template_13_Template, 2, 3, "ng-template", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
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
export class TreeInternalComponent {
    constructor(nodeMenuService, treeService, nodeDraggableService, nodeElementRef) {
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
    ngAfterViewInit() {
        if (this.tree.checked && !this.tree.firstCheckedFired) {
            this.tree.firstCheckedFired = true;
            this.nodeDraggableService.addCheckedNode(new CapturedNode(this.nodeElementRef, this.tree));
            this.treeService.fireNodeChecked(this.tree);
        }
    }
    ngOnInit() {
        const nodeId = get(this.tree, 'node.id', '');
        if (nodeId) {
            this.controller = new TreeController(this);
            this.treeService.setController(nodeId, this.controller);
        }
        this.settings = this.settings || new Ng2TreeSettings();
        this.isReadOnly = !get(this.settings, 'enableCheckboxes', true);
        if (this.tree.isRoot() && this.settings.rootIsVisible === false) {
            this.tree.disableCollapseOnInit();
        }
        this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(() => {
            this.isRightMenuVisible = false;
            this.isLeftMenuVisible = false;
        }));
        this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(() => (this.isSelected = false)));
        this.subscriptions.push(this.treeService
            .draggedStream(this.tree, this.nodeElementRef)
            .subscribe((e) => this.nodeDraggedHandler(e)));
        this.subscriptions.push(merge(this.treeService.nodeChecked$, this.treeService.nodeUnchecked$)
            .pipe(filter((e) => this.eventContainsId(e) && this.tree.hasChild(e.node)))
            .subscribe((e) => this.updateCheckboxState()));
    }
    ngOnChanges(changes) {
        this.controller = new TreeController(this);
    }
    ngOnDestroy() {
        if (get(this.tree, 'node.id', '') && !(this.tree.parent && this.tree.parent.children.indexOf(this.tree) > -1)) {
            this.treeService.deleteController(this.tree.node.id);
        }
        this.nodeDraggableService.releaseDraggedNode();
        this.nodeDraggableService.releaseCheckedNodes();
        this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }
    nodeDraggedHandler(e) {
        // Remove child nodes if parent is being moved (child nodes will move with the parent)
        const nodesToMove = e.captured.filter(cn => !cn.tree.parent || !cn.tree.parent.checked);
        let i = nodesToMove.length;
        while (i--) {
            const node = nodesToMove[i];
            if (node.tree.id) {
                const ctrl = this.treeService.getController(node.tree.id);
                if (ctrl.isChecked()) {
                    ctrl.uncheck();
                }
            }
            if (this.tree.isBranch() && e.position === DropPosition.Into) {
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
            const parentCtrl = this.treeService.getController(this.tree.parent.id);
            if (parentCtrl) {
                parentCtrl.updateCheckboxState();
            }
        }
    }
    moveSibling(sibling, tree, position) {
        const previousPositionInParent = sibling.positionInParent;
        if (position === DropPosition.Above) {
            tree.moveSiblingAbove(sibling);
        }
        else if (position === DropPosition.Below) {
            tree.moveSiblingBelow(sibling);
        }
        else {
            console.error(`Invalid drop position: ${DropPosition[position]}`);
            return;
        }
        this.treeService.fireNodeMoved(sibling, sibling.parent, previousPositionInParent);
    }
    moveNodeToThisTreeAndRemoveFromPreviousOne(capturedTree, moveToTree) {
        capturedTree.removeItselfFromParent();
        setTimeout(() => {
            const addedChild = moveToTree.addChild(capturedTree);
            this.treeService.fireNodeMoved(addedChild, capturedTree.parent);
        });
    }
    moveNodeToParentTreeAndRemoveFromPreviousOne(capturedTree, moveToTree, position) {
        capturedTree.removeItselfFromParent();
        setTimeout(() => {
            let insertAtIndex = moveToTree.positionInParent;
            if (position === DropPosition.Below) {
                insertAtIndex++;
            }
            const addedSibling = moveToTree.addSibling(capturedTree, insertAtIndex);
            this.treeService.fireNodeMoved(addedSibling, capturedTree.parent);
        });
    }
    onNodeDoubleClicked(e) {
        this.treeService.fireNodeDoubleClicked(this.tree, e);
    }
    onNodeSelected(e) {
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
    }
    onNodeUnselected(e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = false;
            this.treeService.fireNodeUnselected(this.tree);
        }
    }
    showRightMenu(e) {
        if (!this.tree.hasRightMenu()) {
            return;
        }
        if (EventUtils.isRightButtonClicked(e)) {
            this.isRightMenuVisible = !this.isRightMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
        }
        e.preventDefault();
    }
    showLeftMenu(e) {
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
    }
    onMenuItemSelected(e) {
        switch (e.nodeMenuItemAction) {
            case NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
            case NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
            case NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
            case NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
            case NodeMenuItemAction.Custom:
                this.onCustomSelected();
                this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
                break;
            default:
                throw new Error(`Chosen menu item doesn't exist`);
        }
    }
    onNewSelected(e) {
        this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    }
    onRenameSelected() {
        this.tree.markAsBeingRenamed();
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    }
    onRemoveSelected() {
        const nodeId = get(this.tree, 'node.id', '');
        this.nodeDraggableService.removeCheckedNodeById(nodeId);
        this.treeService.deleteController(nodeId);
        this.treeService.fireNodeRemoved(this.tree);
    }
    onCustomSelected() {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    }
    onSwitchFoldingType() {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    }
    keydownHandler(e) {
        this.treeService.fireNodeRenameKeydownEvent(this.tree, e);
    }
    inputChangeHandler(e) {
        this.treeService.fireNodeRenameInputChanged(this.tree, e);
    }
    applyNewValue(e) {
        if ((e.action === NodeEditableEventAction.Cancel || this.tree.isNew()) && Tree.isValueEmpty(e.value)) {
            return this.treeService.fireNodeRemoved(this.tree);
        }
        if (this.tree.isNew()) {
            this.tree.value = e.value;
            this.treeService.fireNodeCreated(this.tree);
        }
        if (this.tree.isBeingRenamed()) {
            const oldValue = this.tree.value;
            this.tree.value = e.value;
            this.treeService.fireNodeRenamed(oldValue, this.tree);
        }
        this.tree.markAsModified();
    }
    shouldShowInputForTreeValue() {
        return this.tree.isNew() || this.tree.isBeingRenamed();
    }
    isRootHidden() {
        return this.tree.isRoot() && !this.settings.rootIsVisible;
    }
    hasCustomMenu() {
        return this.tree.hasCustomMenu();
    }
    switchNodeCheckStatus() {
        if (!this.tree.checked) {
            this.onNodeChecked();
        }
        else {
            this.onNodeUnchecked();
        }
    }
    onNodeChecked(ignoreChildren = false) {
        if (!this.checkboxElementRef) {
            return;
        }
        if (!this.tree.checked) {
            this.nodeDraggableService.addCheckedNode(new CapturedNode(this.nodeElementRef, this.tree));
            this.onNodeIndeterminate(false);
            this.tree.checked = true;
            this.treeService.fireNodeChecked(this.tree);
        }
        if (!ignoreChildren) {
            this.executeOnChildController(controller => controller.check());
        }
    }
    onNodeUnchecked(ignoreChildren = false) {
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
            this.executeOnChildController(controller => controller.uncheck());
        }
    }
    onNodeIndeterminate(indeterminate) {
        if (!this.checkboxElementRef || this.checkboxElementRef.nativeElement.indeterminate === indeterminate) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = indeterminate;
        this.treeService.fireNodeIndeterminate(this.tree, indeterminate);
    }
    executeOnChildController(executor) {
        if (this.tree.hasLoadedChildren()) {
            this.tree.children.forEach((child) => {
                const controller = this.treeService.getController(child.id);
                if (!isNil(controller)) {
                    executor(controller);
                }
            });
        }
    }
    updateCheckboxState() {
        // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
        setTimeout(() => {
            const checkedChildrenAmount = this.tree.checkedChildrenAmount();
            if (checkedChildrenAmount === 0) {
                this.onNodeUnchecked(true);
                this.onNodeIndeterminate(false);
            }
            else if (checkedChildrenAmount === this.tree.loadedChildrenAmount()) {
                if (!this.settings.ignoreParentOnCheck) {
                    this.onNodeChecked(true);
                    this.onNodeIndeterminate(false);
                }
                else if (!this.tree.checked) {
                    this.onNodeIndeterminate(true);
                }
            }
            else {
                this.onNodeUnchecked(true);
                this.onNodeIndeterminate(true);
            }
        });
    }
    eventContainsId(event) {
        if (!event.node.id) {
            console.warn('"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.');
            return false;
        }
        return true;
    }
}
TreeInternalComponent.ɵfac = function TreeInternalComponent_Factory(t) { return new (t || TreeInternalComponent)(i0.ɵɵdirectiveInject(i1.NodeMenuService), i0.ɵɵdirectiveInject(i2.TreeService), i0.ɵɵdirectiveInject(i3.NodeDraggableService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
TreeInternalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TreeInternalComponent, selectors: [["tree-internal"]], viewQuery: function TreeInternalComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.checkboxElementRef = _t.first);
    } }, inputs: { tree: "tree", settings: "settings", template: "template" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "tree", 3, "ngClass", 4, "ngIf"], [1, "tree", 3, "ngClass"], [1, "value-container", 3, "ngClass", "nodeDraggable", "tree", "contextmenu"], ["class", "node-checkbox", 4, "ngIf"], [1, "folding", 3, "ngClass", "click"], ["class", "node-value", 3, "node-selected", "dblclick", "click", 4, "ngIf"], ["type", "text", "class", "node-value", "id", "rename-input", 3, "nodeEditable", "keydown", "input", "valueChanged", 4, "ngIf"], ["class", "node-left-menu", 3, "innerHTML", "click", 4, "ngIf"], [3, "menuItemSelected", 4, "ngIf"], ["class", "drag-template", 3, "innerHTML", 4, "ngIf"], [3, "menuItems", "menuItemSelected", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngIf"], [1, "node-checkbox"], ["checkbox", "", "type", "checkbox", 3, "disabled", "checked", "change"], ["checkbox", ""], [1, "node-value", 3, "dblclick", "click"], ["class", "node-template", 3, "innerHTML", 4, "ngIf"], ["class", "node-name", 3, "innerHTML", 4, "ngIf"], ["class", "loading-children", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node-template", 3, "innerHTML"], [1, "node-name", 3, "innerHTML"], [1, "loading-children"], ["type", "text", "id", "rename-input", 1, "node-value", 3, "nodeEditable", "keydown", "input", "valueChanged"], [1, "node-left-menu", 3, "innerHTML", "click"], [3, "menuItemSelected"], [1, "drag-template", 3, "innerHTML"], [3, "menuItems", "menuItemSelected"], [3, "ngStyle"], [3, "tree", "template", "settings", 4, "ngFor", "ngForOf"], [3, "tree", "template", "settings"]], template: function TreeInternalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_Template, 14, 22, "ul", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.tree);
    } }, directives: [i4.NgIf, i4.NgClass, i5.NodeDraggableDirective, i4.NgTemplateOutlet, i6.NodeEditableDirective, i7.NodeMenuComponent, i4.NgStyle, i4.NgForOf, TreeInternalComponent], pipes: [i8.SafeHtmlPipe, i4.AsyncPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeInternalComponent, [{
        type: Component,
        args: [{
                selector: 'tree-internal',
                template: `
  <ul class="tree" *ngIf="tree" [ngClass]="{rootless: isRootHidden()}">
    <li>
      <div class="value-container"
        [ngClass]="{rootless: isRootHidden(), checked: tree.checked}"
        [class.selected]="isSelected"
        (contextmenu)="showRightMenu($event)"
        [nodeDraggable]="nodeElementRef"
        [tree]="tree">

        <div class="node-checkbox" *ngIf="settings.showCheckboxes">
          <input checkbox  type="checkbox" [disabled]="isReadOnly" [checked]="tree.checked" (change)="switchNodeCheckStatus()" #checkbox />
        </div>

        <div class="folding" (click)="onSwitchFoldingType()" [ngClass]="tree.foldingCssClass"></div>

        <div class="node-value"
          *ngIf="!shouldShowInputForTreeValue()"
          [class.node-selected]="isSelected"
          (dblclick)="onNodeDoubleClicked($event)"
          (click)="onNodeSelected($event)">
            <div *ngIf="tree.nodeTemplate" class="node-template" [innerHTML]="tree.nodeTemplate | safeHtml"></div>
            <span *ngIf="!template" class="node-name" [innerHTML]="tree.value | safeHtml"></span>
            <span class="loading-children" *ngIf="tree.childrenAreBeingLoaded()"></span>
            <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ $implicit: tree.node }"></ng-template>
        </div>

        <input type="text" class="node-value" id="rename-input"
           *ngIf="shouldShowInputForTreeValue()"
           [nodeEditable]="tree.value"
           (keydown)="keydownHandler($event)"
           (input)="inputChangeHandler($event)"
           (valueChanged)="applyNewValue($event)"/>

        <div class="node-left-menu" *ngIf="tree.hasLeftMenu()" (click)="showLeftMenu($event)" [innerHTML]="tree.leftMenuTemplate">
        </div>
        <node-menu *ngIf="tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()"
          (menuItemSelected)="onMenuItemSelected($event)">
        </node-menu>
        <div class="drag-template" *ngIf="tree.hasDragIcon()" [innerHTML]="tree.dragTemplate | safeHtml"></div>
      </div>

      <node-menu *ngIf="isRightMenuVisible && !hasCustomMenu()"
           (menuItemSelected)="onMenuItemSelected($event)">
      </node-menu>

      <node-menu *ngIf="hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)"
           [menuItems]="tree.menuItems"
           (menuItemSelected)="onMenuItemSelected($event)">
      </node-menu>

      <div *ngIf="tree.keepNodesInDOM()" [ngStyle]="{'display': tree.isNodeExpanded() ? 'block' : 'none'}">
        <tree-internal *ngFor="let child of tree.childrenAsync | async" [tree]="child" [template]="template" [settings]="settings"></tree-internal>
      </div>
      <ng-template [ngIf]="tree.isNodeExpanded() && !tree.keepNodesInDOM()">
        <tree-internal *ngFor="let child of tree.childrenAsync | async" [tree]="child" [template]="template" [settings]="settings"></tree-internal>
      </ng-template>
    </li>
  </ul>
  `
            }]
    }], function () { return [{ type: i1.NodeMenuService }, { type: i2.TreeService }, { type: i3.NodeDraggableService }, { type: i0.ElementRef }]; }, { tree: [{
            type: Input
        }], settings: [{
            type: Input
        }], template: [{
            type: Input
        }], checkboxElementRef: [{
            type: ViewChild,
            args: ['checkbox']
        }] }); })();
//# sourceMappingURL=tree-internal.component.js.map