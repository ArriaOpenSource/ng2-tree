"use strict";
/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("@angular/common");
var i2 = require("./editable/node-editable.directive");
var i3 = require("./menu/node-menu.component.ngfactory");
var i4 = require("./menu/node-menu.component");
var i5 = require("./menu/node-menu.service");
var i6 = require("./tree-internal.component");
var i7 = require("./tree.service");
var i8 = require("./draggable/node-draggable.service");
var i9 = require("./draggable/node-draggable.directive");
var i10 = require("./utils/safe-html.pipe");
var i11 = require("@angular/platform-browser");
var styles_TreeInternalComponent = [];
var RenderType_TreeInternalComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_TreeInternalComponent, data: {} });
exports.RenderType_TreeInternalComponent = RenderType_TreeInternalComponent;
function View_TreeInternalComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["class", "node-checkbox"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, [[1, 0], ["checkbox", 1]], null, 0, "input", [["checkbox", ""], ["type", "checkbox"]], [[8, "disabled", 0], [8, "checked", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.switchNodeCheckStatus() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isReadOnly; var currVal_1 = _co.tree.checked; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_TreeInternalComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["class", "node-template"]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵppd(1, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵunv(_v, 0, 0, _ck(_v, 1, 0, i0.ɵnov(_v.parent.parent.parent, 0), _co.tree.nodeTemplate)); _ck(_v, 0, 0, currVal_0); }); }
function View_TreeInternalComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "node-name"]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵppd(1, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵunv(_v, 0, 0, _ck(_v, 1, 0, i0.ɵnov(_v.parent.parent.parent, 0), _co.tree.value)); _ck(_v, 0, 0, currVal_0); }); }
function View_TreeInternalComponent_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "loading-children"]], null, null, null, null, null))], null, null); }
function View_TreeInternalComponent_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(0, null, null, 0))], null, null); }
function View_TreeInternalComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 9, "div", [["class", "node-value"]], [[2, "node-selected", null]], [[null, "dblclick"], [null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("dblclick" === en)) {
        var pd_0 = (_co.onNodeDoubleClicked($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.onNodeSelected($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_4)), i0.ɵdid(2, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_5)), i0.ɵdid(4, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_6)), i0.ɵdid(6, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_TreeInternalComponent_7)), i0.ɵdid(8, 540672, null, 0, i1.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(9, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.tree.nodeTemplate; _ck(_v, 2, 0, currVal_1); var currVal_2 = !_co.template; _ck(_v, 4, 0, currVal_2); var currVal_3 = _co.tree.childrenAreBeingLoaded(); _ck(_v, 6, 0, currVal_3); var currVal_4 = _ck(_v, 9, 0, _co.tree.node); var currVal_5 = _co.template; _ck(_v, 8, 0, currVal_4, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isSelected; _ck(_v, 0, 0, currVal_0); }); }
function View_TreeInternalComponent_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "input", [["class", "node-value"], ["type", "text"]], null, [[null, "valueChanged"], [null, "keyup.enter"], [null, "blur"], [null, "keyup.esc"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup.enter" === en)) {
        var pd_0 = (i0.ɵnov(_v, 1).applyNewValue($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 1).applyNewValueByLoosingFocus($event.target.value) !== false);
        ad = (pd_1 && ad);
    } if (("keyup.esc" === en)) {
        var pd_2 = (i0.ɵnov(_v, 1).cancelEditing() !== false);
        ad = (pd_2 && ad);
    } if (("valueChanged" === en)) {
        var pd_3 = (_co.applyNewValue($event) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 81920, null, 0, i2.NodeEditableDirective, [i0.Renderer2, i0.ElementRef], { nodeValue: [0, "nodeValue"] }, { valueChanged: "valueChanged" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tree.value; _ck(_v, 1, 0, currVal_0); }, null); }
function View_TreeInternalComponent_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "div", [["class", "node-left-menu"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showLeftMenu($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tree.leftMenuTemplate; _ck(_v, 0, 0, currVal_0); }); }
function View_TreeInternalComponent_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "node-menu", [], null, [[null, "menuItemSelected"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("menuItemSelected" === en)) {
        var pd_0 = (_co.onMenuItemSelected($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i3.View_NodeMenuComponent_0, i3.RenderType_NodeMenuComponent)), i0.ɵdid(1, 4440064, null, 0, i4.NodeMenuComponent, [i0.Renderer2, i5.NodeMenuService], null, { menuItemSelected: "menuItemSelected" })], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_TreeInternalComponent_11(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["class", "drag-template"]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵppd(1, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵunv(_v, 0, 0, _ck(_v, 1, 0, i0.ɵnov(_v.parent.parent, 0), _co.tree.dragTemplate)); _ck(_v, 0, 0, currVal_0); }); }
function View_TreeInternalComponent_12(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "node-menu", [], null, [[null, "menuItemSelected"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("menuItemSelected" === en)) {
        var pd_0 = (_co.onMenuItemSelected($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i3.View_NodeMenuComponent_0, i3.RenderType_NodeMenuComponent)), i0.ɵdid(1, 4440064, null, 0, i4.NodeMenuComponent, [i0.Renderer2, i5.NodeMenuService], null, { menuItemSelected: "menuItemSelected" })], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_TreeInternalComponent_13(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "node-menu", [], null, [[null, "menuItemSelected"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("menuItemSelected" === en)) {
        var pd_0 = (_co.onMenuItemSelected($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i3.View_NodeMenuComponent_0, i3.RenderType_NodeMenuComponent)), i0.ɵdid(1, 4440064, null, 0, i4.NodeMenuComponent, [i0.Renderer2, i5.NodeMenuService], { menuItems: [0, "menuItems"] }, { menuItemSelected: "menuItemSelected" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tree.menuItems; _ck(_v, 1, 0, currVal_0); }, null); }
function View_TreeInternalComponent_15(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "tree-internal", [], null, null, null, View_TreeInternalComponent_0, RenderType_TreeInternalComponent)), i0.ɵdid(1, 4964352, null, 0, i6.TreeInternalComponent, [i5.NodeMenuService, i7.TreeService, i8.NodeDraggableService, i0.ElementRef], { tree: [0, "tree"], settings: [1, "settings"], template: [2, "template"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.settings; var currVal_2 = _co.template; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_TreeInternalComponent_14(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "div", [], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(2, { "display": 0 }), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_TreeInternalComponent_15)), i0.ɵdid(4, 802816, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), i0.ɵpid(131072, i1.AsyncPipe, [i0.ChangeDetectorRef])], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, (_co.tree.isNodeExpanded() ? "block" : "none")); _ck(_v, 1, 0, currVal_0); var currVal_1 = i0.ɵunv(_v, 4, 0, i0.ɵnov(_v, 5).transform(_co.tree.childrenAsync)); _ck(_v, 4, 0, currVal_1); }, null); }
function View_TreeInternalComponent_17(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "tree-internal", [], null, null, null, View_TreeInternalComponent_0, RenderType_TreeInternalComponent)), i0.ɵdid(1, 4964352, null, 0, i6.TreeInternalComponent, [i5.NodeMenuService, i7.TreeService, i8.NodeDraggableService, i0.ElementRef], { tree: [0, "tree"], settings: [1, "settings"], template: [2, "template"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.settings; var currVal_2 = _co.template; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_TreeInternalComponent_16(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 2, null, View_TreeInternalComponent_17)), i0.ɵdid(1, 802816, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), i0.ɵpid(131072, i1.AsyncPipe, [i0.ChangeDetectorRef]), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵunv(_v, 1, 0, i0.ɵnov(_v, 2).transform(_co.tree.childrenAsync)); _ck(_v, 1, 0, currVal_0); }, null); }
function View_TreeInternalComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 29, "ul", [["class", "tree"]], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { rootless: 0 }), (_l()(), i0.ɵeld(3, 0, null, null, 26, "li", [], null, null, null, null, null)), (_l()(), i0.ɵeld(4, 0, null, null, 17, "div", [["class", "value-container"]], [[2, "selected", null]], [[null, "contextmenu"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("contextmenu" === en)) {
        var pd_0 = (_co.showRightMenu($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(6, { rootless: 0, checked: 1 }), i0.ɵdid(7, 212992, null, 0, i9.NodeDraggableDirective, [i0.ElementRef, i8.NodeDraggableService, i0.Renderer2], { nodeDraggable: [0, "nodeDraggable"], tree: [1, "tree"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_2)), i0.ɵdid(9, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(10, 0, null, null, 1, "div", [["class", "folding"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onSwitchFoldingType() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(11, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_3)), i0.ɵdid(13, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_8)), i0.ɵdid(15, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_9)), i0.ɵdid(17, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_10)), i0.ɵdid(19, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_11)), i0.ɵdid(21, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_12)), i0.ɵdid(23, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_13)), i0.ɵdid(25, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_14)), i0.ɵdid(27, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_16)), i0.ɵdid(29, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "tree"; var currVal_1 = _ck(_v, 2, 0, _co.isRootHidden()); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_3 = "value-container"; var currVal_4 = _ck(_v, 6, 0, _co.isRootHidden(), _co.tree.checked); _ck(_v, 5, 0, currVal_3, currVal_4); var currVal_5 = _co.nodeElementRef; var currVal_6 = _co.tree; _ck(_v, 7, 0, currVal_5, currVal_6); var currVal_7 = _co.settings.showCheckboxes; _ck(_v, 9, 0, currVal_7); var currVal_8 = "folding"; var currVal_9 = _co.tree.foldingCssClass; _ck(_v, 11, 0, currVal_8, currVal_9); var currVal_10 = !_co.shouldShowInputForTreeValue(); _ck(_v, 13, 0, currVal_10); var currVal_11 = _co.shouldShowInputForTreeValue(); _ck(_v, 15, 0, currVal_11); var currVal_12 = _co.tree.hasLeftMenu(); _ck(_v, 17, 0, currVal_12); var currVal_13 = ((_co.tree.hasLeftMenu() && _co.isLeftMenuVisible) && !_co.hasCustomMenu()); _ck(_v, 19, 0, currVal_13); var currVal_14 = _co.tree.hasDragIcon(); _ck(_v, 21, 0, currVal_14); var currVal_15 = (_co.isRightMenuVisible && !_co.hasCustomMenu()); _ck(_v, 23, 0, currVal_15); var currVal_16 = (_co.hasCustomMenu() && (_co.isRightMenuVisible || _co.isLeftMenuVisible)); _ck(_v, 25, 0, currVal_16); var currVal_17 = _co.tree.keepNodesInDOM(); _ck(_v, 27, 0, currVal_17); var currVal_18 = (_co.tree.isNodeExpanded() && !_co.tree.keepNodesInDOM()); _ck(_v, 29, 0, currVal_18); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.isSelected; _ck(_v, 4, 0, currVal_2); }); }
function View_TreeInternalComponent_0(_l) { return i0.ɵvid(0, [i0.ɵpid(0, i10.SafeHtmlPipe, [i11.DomSanitizer]), i0.ɵqud(671088640, 1, { checkboxElementRef: 0 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TreeInternalComponent_1)), i0.ɵdid(3, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tree; _ck(_v, 3, 0, currVal_0); }, null); }
exports.View_TreeInternalComponent_0 = View_TreeInternalComponent_0;
function View_TreeInternalComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "tree-internal", [], null, null, null, View_TreeInternalComponent_0, RenderType_TreeInternalComponent)), i0.ɵdid(1, 4964352, null, 0, i6.TreeInternalComponent, [i5.NodeMenuService, i7.TreeService, i8.NodeDraggableService, i0.ElementRef], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_TreeInternalComponent_Host_0 = View_TreeInternalComponent_Host_0;
var TreeInternalComponentNgFactory = i0.ɵccf("tree-internal", i6.TreeInternalComponent, View_TreeInternalComponent_Host_0, { tree: "tree", settings: "settings", template: "template" }, {}, []);
exports.TreeInternalComponentNgFactory = TreeInternalComponentNgFactory;
//# sourceMappingURL=tree-internal.component.ngfactory.js.map