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
import * as i5 from "@angular/material/tooltip";
import * as i6 from "./draggable/node-draggable.directive";
import * as i7 from "./editable/node-editable.directive";
import * as i8 from "./menu/node-menu.component";
import * as i9 from "./utils/safe-html.pipe";
const _c0 = ["checkbox"];
const _c1 = a0 => ({ rootless: a0 });
const _c2 = (a0, a1) => ({ rootless: a0, checked: a1 });
const _c3 = a0 => ({ $implicit: a0 });
const _c4 = a0 => ({ "display": a0 });
function TreeInternalComponent_ul_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "input", 16, 0);
    i0.ɵɵlistener("change", function TreeInternalComponent_ul_0_div_3_Template_input_change_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.switchNodeCheckStatus()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isReadOnly)("checked", ctx_r1.tree.checked);
} }
function TreeInternalComponent_ul_0_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 22);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r1.tree.nodeTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_div_5_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 23);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, ctx_r1.tree.value), i0.ɵɵsanitizeHtml)("matTooltip", ctx_r1.tree.tooltip)("matTooltipPosition", ctx_r1.tree.tooltipPosition);
} }
function TreeInternalComponent_ul_0_div_5_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 24);
} }
function TreeInternalComponent_ul_0_div_5_ng_template_4_Template(rf, ctx) { }
function TreeInternalComponent_ul_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵlistener("dblclick", function TreeInternalComponent_ul_0_div_5_Template_div_dblclick_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onNodeDoubleClicked($event)); })("click", function TreeInternalComponent_ul_0_div_5_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onNodeSelected($event)); });
    i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_5_div_1_Template, 2, 3, "div", 18)(2, TreeInternalComponent_ul_0_div_5_span_2_Template, 2, 5, "span", 19)(3, TreeInternalComponent_ul_0_div_5_span_3_Template, 1, 0, "span", 20)(4, TreeInternalComponent_ul_0_div_5_ng_template_4_Template, 0, 0, "ng-template", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("node-selected", ctx_r1.isSelected);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.nodeTemplate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.template);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.childrenAreBeingLoaded());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c3, ctx_r1.tree.node));
} }
function TreeInternalComponent_ul_0_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 25);
    i0.ɵɵlistener("keydown", function TreeInternalComponent_ul_0_input_6_Template_input_keydown_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.keydownHandler($event)); })("input", function TreeInternalComponent_ul_0_input_6_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.inputChangeHandler($event)); })("valueChanged", function TreeInternalComponent_ul_0_input_6_Template_input_valueChanged_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyNewValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeEditable", ctx_r1.tree.value);
} }
function TreeInternalComponent_ul_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_div_7_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showLeftMenu($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r1.tree.leftMenuTemplate, i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 27);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_8_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onMenuItemSelected($event)); });
    i0.ɵɵelementEnd();
} }
function TreeInternalComponent_ul_0_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 28);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r1.tree.dragTemplate), i0.ɵɵsanitizeHtml);
} }
function TreeInternalComponent_ul_0_node_menu_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 29);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_10_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onMenuItemSelected($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("cursorCoordinates", ctx_r1.cursorCoordinates);
} }
function TreeInternalComponent_ul_0_node_menu_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "node-menu", 30);
    i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_11_Template_node_menu_menuItemSelected_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onMenuItemSelected($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("menuItems", ctx_r1.tree.menuItems)("cursorCoordinates", ctx_r1.cursorCoordinates);
} }
function TreeInternalComponent_ul_0_div_12_tree_internal_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 33);
} if (rf & 2) {
    const child_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r10)("template", ctx_r1.template)("settings", ctx_r1.settings);
} }
function TreeInternalComponent_ul_0_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_12_tree_internal_1_Template, 1, 3, "tree-internal", 32);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c4, ctx_r1.tree.isNodeExpanded() ? "block" : "none"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r1.tree.childrenAsync));
} }
function TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tree-internal", 33);
} if (rf & 2) {
    const child_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tree", child_r11)("template", ctx_r1.template)("settings", ctx_r1.settings);
} }
function TreeInternalComponent_ul_0_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template, 1, 3, "tree-internal", 32);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(1, 1, ctx_r1.tree.childrenAsync));
} }
function TreeInternalComponent_ul_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ul", 2)(1, "li")(2, "div", 3);
    i0.ɵɵlistener("contextmenu", function TreeInternalComponent_ul_0_Template_div_contextmenu_2_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showRightMenu($event)); });
    i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_3_Template, 3, 2, "div", 4);
    i0.ɵɵelementStart(4, "div", 5);
    i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_Template_div_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSwitchFoldingType()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, TreeInternalComponent_ul_0_div_5_Template, 5, 9, "div", 6)(6, TreeInternalComponent_ul_0_input_6_Template, 1, 1, "input", 7)(7, TreeInternalComponent_ul_0_div_7_Template, 1, 1, "div", 8)(8, TreeInternalComponent_ul_0_node_menu_8_Template, 1, 0, "node-menu", 9)(9, TreeInternalComponent_ul_0_div_9_Template, 2, 3, "div", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, TreeInternalComponent_ul_0_node_menu_10_Template, 1, 1, "node-menu", 11)(11, TreeInternalComponent_ul_0_node_menu_11_Template, 1, 2, "node-menu", 12)(12, TreeInternalComponent_ul_0_div_12_Template, 3, 6, "div", 13)(13, TreeInternalComponent_ul_0_ng_template_13_Template, 2, 3, "ng-template", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c1, ctx_r1.isRootHidden()));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r1.isSelected);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(19, _c2, ctx_r1.isRootHidden(), ctx_r1.tree.checked))("nodeDraggable", ctx_r1.nodeElementRef)("tree", ctx_r1.tree);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.settings.showCheckboxes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.tree.foldingCssClass);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.shouldShowInputForTreeValue());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.shouldShowInputForTreeValue());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.hasLeftMenu());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.hasLeftMenu() && ctx_r1.isLeftMenuVisible && !ctx_r1.hasCustomMenu());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.hasDragIcon());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isRightMenuVisible && !ctx_r1.hasCustomMenu());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.hasCustomMenu() && (ctx_r1.isRightMenuVisible || ctx_r1.isLeftMenuVisible));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.keepNodesInDOM());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tree.isNodeExpanded() && !ctx_r1.tree.keepNodesInDOM());
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
            this.hideMenus();
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
    hideMenus() {
        this.cursorCoordinates = undefined;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
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
            this.setCursorCoordinates(e);
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
    setCursorCoordinates(e) {
        this.cursorCoordinates = { x: e.clientX, y: e.clientY };
    }
    onNewSelected(e) {
        this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
        this.hideMenus();
    }
    onRenameSelected() {
        this.tree.markAsBeingRenamed();
        this.hideMenus();
    }
    onRemoveSelected() {
        const nodeId = get(this.tree, 'node.id', '');
        this.nodeDraggableService.removeCheckedNodeById(nodeId);
        this.treeService.deleteController(nodeId);
        this.treeService.fireNodeRemoved(this.tree);
    }
    onCustomSelected() {
        this.hideMenus();
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
    static { this.ɵfac = function TreeInternalComponent_Factory(t) { return new (t || TreeInternalComponent)(i0.ɵɵdirectiveInject(i1.NodeMenuService), i0.ɵɵdirectiveInject(i2.TreeService), i0.ɵɵdirectiveInject(i3.NodeDraggableService), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TreeInternalComponent, selectors: [["tree-internal"]], viewQuery: function TreeInternalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.checkboxElementRef = _t.first);
        } }, inputs: { tree: "tree", settings: "settings", template: "template" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["checkbox", ""], ["class", "tree", 3, "ngClass", 4, "ngIf"], [1, "tree", 3, "ngClass"], [1, "value-container", 3, "contextmenu", "ngClass", "nodeDraggable", "tree"], ["class", "node-checkbox", 4, "ngIf"], [1, "folding", 3, "click", "ngClass"], ["class", "node-value", 3, "node-selected", "dblclick", "click", 4, "ngIf"], ["type", "text", "class", "node-value", "id", "rename-input", 3, "nodeEditable", "keydown", "input", "valueChanged", 4, "ngIf"], ["class", "node-left-menu", 3, "innerHTML", "click", 4, "ngIf"], [3, "menuItemSelected", 4, "ngIf"], ["class", "drag-template", 3, "innerHTML", 4, "ngIf"], [3, "cursorCoordinates", "menuItemSelected", 4, "ngIf"], [3, "menuItems", "cursorCoordinates", "menuItemSelected", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngIf"], [1, "node-checkbox"], ["checkbox", "", "type", "checkbox", 3, "change", "disabled", "checked"], [1, "node-value", 3, "dblclick", "click"], ["class", "node-template", 3, "innerHTML", 4, "ngIf"], ["class", "node-name", "matTooltipClass", "ng2-tree-tooltip", 3, "innerHTML", "matTooltip", "matTooltipPosition", 4, "ngIf"], ["class", "loading-children", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node-template", 3, "innerHTML"], ["matTooltipClass", "ng2-tree-tooltip", 1, "node-name", 3, "innerHTML", "matTooltip", "matTooltipPosition"], [1, "loading-children"], ["type", "text", "id", "rename-input", 1, "node-value", 3, "keydown", "input", "valueChanged", "nodeEditable"], [1, "node-left-menu", 3, "click", "innerHTML"], [3, "menuItemSelected"], [1, "drag-template", 3, "innerHTML"], [3, "menuItemSelected", "cursorCoordinates"], [3, "menuItemSelected", "menuItems", "cursorCoordinates"], [3, "ngStyle"], [3, "tree", "template", "settings", 4, "ngFor", "ngForOf"], [3, "tree", "template", "settings"]], template: function TreeInternalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_Template, 14, 22, "ul", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.tree);
        } }, dependencies: [i4.NgClass, i4.NgForOf, i4.NgIf, i4.NgTemplateOutlet, i4.NgStyle, i5.MatTooltip, i6.NodeDraggableDirective, i7.NodeEditableDirective, i8.NodeMenuComponent, TreeInternalComponent, i4.AsyncPipe, i9.SafeHtmlPipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeInternalComponent, [{
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
            <span *ngIf="!template" class="node-name"
                  [innerHTML]="tree.value | safeHtml"
                  [matTooltip]="tree.tooltip"
                  [matTooltipPosition]="tree.tooltipPosition"
                  matTooltipClass="ng2-tree-tooltip"></span>
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
           (menuItemSelected)="onMenuItemSelected($event)"
           [cursorCoordinates]="cursorCoordinates">
      </node-menu>

      <node-menu *ngIf="hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)"
           [menuItems]="tree.menuItems"
           (menuItemSelected)="onMenuItemSelected($event)"
           [cursorCoordinates]="cursorCoordinates">
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
    }], () => [{ type: i1.NodeMenuService }, { type: i2.TreeService }, { type: i3.NodeDraggableService }, { type: i0.ElementRef }], { tree: [{
            type: Input
        }], settings: [{
            type: Input
        }], template: [{
            type: Input
        }], checkboxElementRef: [{
            type: ViewChild,
            args: ['checkbox']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TreeInternalComponent, { className: "TreeInternalComponent", filePath: "src\\tree-internal.component.ts", lineNumber: 101 }); })();
//# sourceMappingURL=tree-internal.component.js.map