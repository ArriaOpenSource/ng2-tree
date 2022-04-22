!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], ["1d","d","2d","1b","1c"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("b", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.noop = void 0;
  // This forces angular compiler to generate a "rxjs-imports.metadata.json"
  // with a valid metadata instead of "[null]"
  var noop = function () {};
  exports.noop = noop;

});
$__System.registerDynamic("c", ["d", "e", "f", "10", "11"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeComponent = void 0;
    var core_1 = $__require("d");
    var tree_service_1 = $__require("e");
    var TreeTypes = $__require("f");
    var tree_1 = $__require("10");
    var i0 = $__require("d");
    var i1 = $__require("e");
    var i2 = $__require("11");
    var _c0 = ["rootComponent"];
    var TreeComponent = /** @class */function () {
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
            } else {
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
            this.subscriptions.forEach(function (sub) {
                return sub && sub.unsubscribe();
            });
        };
        TreeComponent.EMPTY_TREE = new tree_1.Tree({ value: '' });
        TreeComponent.ɵfac = function TreeComponent_Factory(t) {
            return new (t || TreeComponent)(i0.ɵɵdirectiveInject(tree_service_1.TreeService));
        };
        TreeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TreeComponent, selectors: [["tree"]], contentQueries: function TreeComponent_ContentQueries(rf, ctx, dirIndex) {
                if (rf & 1) {
                    i0.ɵɵcontentQuery(dirIndex, core_1.TemplateRef, 1);
                }if (rf & 2) {
                    var _t = void 0;
                    i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
                }
            }, viewQuery: function TreeComponent_Query(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵviewQuery(_c0, 1);
                }if (rf & 2) {
                    var _t = void 0;
                    i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.rootComponent = _t.first);
                }
            }, inputs: { treeModel: ["tree", "treeModel"], settings: "settings" }, outputs: { nodeCreated: "nodeCreated", nodeRemoved: "nodeRemoved", nodeRenamed: "nodeRenamed", nodeDoubleClicked: "nodeDoubleClicked", nodeSelected: "nodeSelected", nodeUnselected: "nodeUnselected", nodeDragStarted: "nodeDragStarted", nodeMoved: "nodeMoved", nodeExpanded: "nodeExpanded", nodeCollapsed: "nodeCollapsed", loadNextLevel: "loadNextLevel", nodeChecked: "nodeChecked", nodeUnchecked: "nodeUnchecked", nodeRenameKeydown: "nodeRenameKeydown", nodeRenameInputChange: "nodeRenameInputChange", menuItemSelected: "menuItemSelected" }, features: [i0.ɵɵProvidersFeature([tree_service_1.TreeService]), i0.ɵɵNgOnChangesFeature], decls: 2, vars: 3, consts: [[3, "tree", "settings", "template"], ["rootComponent", ""]], template: function TreeComponent_Template(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵelement(0, "tree-internal", 0, 1);
                }if (rf & 2) {
                    i0.ɵɵproperty("tree", ctx.tree)("settings", ctx.settings)("template", ctx.template);
                }
            }, directives: [i2.TreeInternalComponent], encapsulation: 2 });
        return TreeComponent;
    }();
    exports.TreeComponent = TreeComponent;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeComponent, [{
            type: core_1.Component,
            args: [{
                selector: 'tree',
                template: "<tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>",
                providers: [tree_service_1.TreeService]
            }]
        }], function () {
            return [{ type: i1.TreeService, decorators: [{
                    type: core_1.Inject,
                    args: [tree_service_1.TreeService]
                }] }];
        }, { treeModel: [{
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
            }] });
    })();

});
$__System.registerDynamic("12", ["13", "14", "15"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeController = void 0;
    var menu_events_1 = $__require("13");
    var event_utils_1 = $__require("14");
    var fn_utils_1 = $__require("15");
    var TreeController = /** @class */function () {
        function TreeController(component) {
            this.component = component;
            this.tree = this.component.tree;
            this.treeService = this.component.treeService;
        }
        TreeController.prototype.select = function () {
            if (!this.isSelected()) {
                this.component.onNodeSelected({ button: event_utils_1.MouseButtons.Left });
            }
        };
        TreeController.prototype.unselect = function () {
            if (this.isSelected()) {
                this.component.onNodeUnselected({ button: event_utils_1.MouseButtons.Left });
            }
        };
        TreeController.prototype.isSelected = function () {
            return this.component.isSelected;
        };
        TreeController.prototype.expand = function () {
            if (this.isCollapsed()) {
                this.component.onSwitchFoldingType();
            }
        };
        TreeController.prototype.expandToParent = function (tree) {
            var _this = this;
            if (tree === void 0) {
                tree = this.tree;
            }
            if (tree) {
                var controller_1 = this.treeService.getController(tree.id);
                if (controller_1) {
                    requestAnimationFrame(function () {
                        controller_1.expand();
                        _this.expandToParent(tree.parent);
                    });
                }
            }
        };
        TreeController.prototype.isExpanded = function () {
            return this.tree.isNodeExpanded();
        };
        TreeController.prototype.collapse = function () {
            if (this.isExpanded()) {
                this.component.onSwitchFoldingType();
            }
        };
        TreeController.prototype.isCollapsed = function () {
            return this.tree.isNodeCollapsed();
        };
        TreeController.prototype.toTreeModel = function () {
            return this.tree.toTreeModel();
        };
        TreeController.prototype.rename = function (newValue) {
            this.tree.markAsBeingRenamed();
            this.component.applyNewValue({ type: 'keyup', value: newValue });
        };
        TreeController.prototype.remove = function () {
            this.component.onMenuItemSelected({ nodeMenuItemAction: menu_events_1.NodeMenuItemAction.Remove });
        };
        TreeController.prototype.addChild = function (newNode) {
            if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
                return;
            }
            var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
            this.treeService.fireNodeCreated(newTree);
        };
        TreeController.prototype.addChildAsync = function (newNode) {
            if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
                return Promise.reject(new Error('This node loads its children asynchronously, hence child cannot be added this way'));
            }
            var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
            this.treeService.fireNodeCreated(newTree);
            // This will give TreeInternalComponent to set up a controller for the node
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(newTree);
                });
            });
        };
        TreeController.prototype.changeNodeId = function (id) {
            if (!id) {
                throw Error('You should supply an id!');
            }
            if (this.treeService.hasController(id)) {
                throw Error("Controller already exists for the given id: " + id);
            }
            this.treeService.deleteController(this.tree.id);
            this.tree.id = id;
            this.treeService.setController(this.tree.id, this);
        };
        TreeController.prototype.reloadChildren = function () {
            this.tree.reloadChildren();
        };
        TreeController.prototype.setChildren = function (children) {
            if (!this.tree.isLeaf()) {
                this.tree.setChildren(children);
            }
        };
        TreeController.prototype.startRenaming = function () {
            this.tree.markAsBeingRenamed();
        };
        TreeController.prototype.check = function () {
            this.component.onNodeChecked();
        };
        TreeController.prototype.uncheck = function (ignoreChildren) {
            if (ignoreChildren === void 0) {
                ignoreChildren = false;
            }
            this.component.onNodeUnchecked(ignoreChildren);
        };
        TreeController.prototype.updateCheckboxState = function () {
            this.component.updateCheckboxState();
        };
        TreeController.prototype.isChecked = function () {
            return this.tree.checked;
        };
        TreeController.prototype.isIndeterminate = function () {
            return fn_utils_1.get(this.component, 'checkboxElementRef.nativeElement.indeterminate');
        };
        TreeController.prototype.allowSelection = function () {
            this.tree.selectionAllowed = true;
        };
        TreeController.prototype.forbidSelection = function () {
            this.tree.selectionAllowed = false;
        };
        TreeController.prototype.isSelectionAllowed = function () {
            return this.tree.selectionAllowed;
        };
        return TreeController;
    }();
    exports.TreeController = TreeController;

});
$__System.registerDynamic("11", ["d", "f", "10", "12", "16", "13", "17", "e", "14", "18", "15", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeInternalComponent = void 0;
    var core_1 = $__require("d");
    var TreeTypes = $__require("f");
    var tree_types_1 = $__require("f");
    var tree_1 = $__require("10");
    var tree_controller_1 = $__require("12");
    var node_menu_service_1 = $__require("16");
    var menu_events_1 = $__require("13");
    var editable_events_1 = $__require("17");
    var tree_service_1 = $__require("e");
    var EventUtils = $__require("14");
    var draggable_events_1 = $__require("18");
    var fn_utils_1 = $__require("15");
    var node_draggable_service_1 = $__require("19");
    var captured_node_1 = $__require("1a");
    var rxjs_1 = $__require("1b");
    var operators_1 = $__require("1c");
    var i0 = $__require("d");
    var i1 = $__require("16");
    var i2 = $__require("e");
    var i3 = $__require("19");
    var i4 = $__require("1d");
    var i5 = $__require("1e");
    var i6 = $__require("1f");
    var i7 = $__require("20");
    var i8 = $__require("21");
    var _c0 = ["checkbox"];
    function TreeInternalComponent_ul_0_div_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r13 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 13);
            i0.ɵɵelementStart(1, "input", 14, 15);
            i0.ɵɵlistener("change", function TreeInternalComponent_ul_0_div_3_Template_input_change_1_listener() {
                i0.ɵɵrestoreView(_r13);var ctx_r12 = i0.ɵɵnextContext(2);return ctx_r12.switchNodeCheckStatus();
            });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", ctx_r1.isReadOnly)("checked", ctx_r1.tree.checked);
        }
    }
    function TreeInternalComponent_ul_0_div_5_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 21);
            i0.ɵɵpipe(1, "safeHtml");
        }if (rf & 2) {
            var ctx_r14 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r14.tree.nodeTemplate), i0.ɵɵsanitizeHtml);
        }
    }
    function TreeInternalComponent_ul_0_div_5_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 22);
            i0.ɵɵpipe(1, "safeHtml");
        }if (rf & 2) {
            var ctx_r15 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r15.tree.value), i0.ɵɵsanitizeHtml);
        }
    }
    function TreeInternalComponent_ul_0_div_5_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 23);
        }
    }
    function TreeInternalComponent_ul_0_div_5_ng_template_4_Template(rf, ctx) {}
    var _c1 = function (a0) {
        return { $implicit: a0 };
    };
    function TreeInternalComponent_ul_0_div_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r19 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 16);
            i0.ɵɵlistener("dblclick", function TreeInternalComponent_ul_0_div_5_Template_div_dblclick_0_listener($event) {
                i0.ɵɵrestoreView(_r19);var ctx_r18 = i0.ɵɵnextContext(2);return ctx_r18.onNodeDoubleClicked($event);
            })("click", function TreeInternalComponent_ul_0_div_5_Template_div_click_0_listener($event) {
                i0.ɵɵrestoreView(_r19);var ctx_r20 = i0.ɵɵnextContext(2);return ctx_r20.onNodeSelected($event);
            });
            i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_5_div_1_Template, 2, 3, "div", 17);
            i0.ɵɵtemplate(2, TreeInternalComponent_ul_0_div_5_span_2_Template, 2, 3, "span", 18);
            i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_5_span_3_Template, 1, 0, "span", 19);
            i0.ɵɵtemplate(4, TreeInternalComponent_ul_0_div_5_ng_template_4_Template, 0, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵclassProp("node-selected", ctx_r2.isSelected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.tree.nodeTemplate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r2.template);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.tree.childrenAreBeingLoaded());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c1, ctx_r2.tree.node));
        }
    }
    function TreeInternalComponent_ul_0_input_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r22 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "input", 24);
            i0.ɵɵlistener("keydown", function TreeInternalComponent_ul_0_input_6_Template_input_keydown_0_listener($event) {
                i0.ɵɵrestoreView(_r22);var ctx_r21 = i0.ɵɵnextContext(2);return ctx_r21.keydownHandler($event);
            })("input", function TreeInternalComponent_ul_0_input_6_Template_input_input_0_listener($event) {
                i0.ɵɵrestoreView(_r22);var ctx_r23 = i0.ɵɵnextContext(2);return ctx_r23.inputChangeHandler($event);
            })("valueChanged", function TreeInternalComponent_ul_0_input_6_Template_input_valueChanged_0_listener($event) {
                i0.ɵɵrestoreView(_r22);var ctx_r24 = i0.ɵɵnextContext(2);return ctx_r24.applyNewValue($event);
            });
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("nodeEditable", ctx_r3.tree.value);
        }
    }
    function TreeInternalComponent_ul_0_div_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r26 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 25);
            i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_div_7_Template_div_click_0_listener($event) {
                i0.ɵɵrestoreView(_r26);var ctx_r25 = i0.ɵɵnextContext(2);return ctx_r25.showLeftMenu($event);
            });
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("innerHTML", ctx_r4.tree.leftMenuTemplate, i0.ɵɵsanitizeHtml);
        }
    }
    function TreeInternalComponent_ul_0_node_menu_8_Template(rf, ctx) {
        if (rf & 1) {
            var _r28 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "node-menu", 26);
            i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_8_Template_node_menu_menuItemSelected_0_listener($event) {
                i0.ɵɵrestoreView(_r28);var ctx_r27 = i0.ɵɵnextContext(2);return ctx_r27.onMenuItemSelected($event);
            });
            i0.ɵɵelementEnd();
        }
    }
    function TreeInternalComponent_ul_0_div_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 27);
            i0.ɵɵpipe(1, "safeHtml");
        }if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r6.tree.dragTemplate), i0.ɵɵsanitizeHtml);
        }
    }
    function TreeInternalComponent_ul_0_node_menu_10_Template(rf, ctx) {
        if (rf & 1) {
            var _r30 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "node-menu", 26);
            i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_10_Template_node_menu_menuItemSelected_0_listener($event) {
                i0.ɵɵrestoreView(_r30);var ctx_r29 = i0.ɵɵnextContext(2);return ctx_r29.onMenuItemSelected($event);
            });
            i0.ɵɵelementEnd();
        }
    }
    function TreeInternalComponent_ul_0_node_menu_11_Template(rf, ctx) {
        if (rf & 1) {
            var _r32 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "node-menu", 28);
            i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_11_Template_node_menu_menuItemSelected_0_listener($event) {
                i0.ɵɵrestoreView(_r32);var ctx_r31 = i0.ɵɵnextContext(2);return ctx_r31.onMenuItemSelected($event);
            });
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r8 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("menuItems", ctx_r8.tree.menuItems);
        }
    }
    function TreeInternalComponent_ul_0_div_12_tree_internal_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "tree-internal", 31);
        }if (rf & 2) {
            var child_r34 = ctx.$implicit;
            var ctx_r33 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("tree", child_r34)("template", ctx_r33.template)("settings", ctx_r33.settings);
        }
    }
    var _c2 = function (a0) {
        return { "display": a0 };
    };
    function TreeInternalComponent_ul_0_div_12_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 29);
            i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_12_tree_internal_1_Template, 1, 3, "tree-internal", 30);
            i0.ɵɵpipe(2, "async");
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c2, ctx_r9.tree.isNodeExpanded() ? "block" : "none"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r9.tree.childrenAsync));
        }
    }
    function TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "tree-internal", 31);
        }if (rf & 2) {
            var child_r36 = ctx.$implicit;
            var ctx_r35 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("tree", child_r36)("template", ctx_r35.template)("settings", ctx_r35.settings);
        }
    }
    function TreeInternalComponent_ul_0_ng_template_13_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template, 1, 3, "tree-internal", 30);
            i0.ɵɵpipe(1, "async");
        }if (rf & 2) {
            var ctx_r10 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(1, 1, ctx_r10.tree.childrenAsync));
        }
    }
    var _c3 = function (a0) {
        return { rootless: a0 };
    };
    var _c4 = function (a0, a1) {
        return { rootless: a0, checked: a1 };
    };
    function TreeInternalComponent_ul_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r38 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ul", 1);
            i0.ɵɵelementStart(1, "li");
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵlistener("contextmenu", function TreeInternalComponent_ul_0_Template_div_contextmenu_2_listener($event) {
                i0.ɵɵrestoreView(_r38);var ctx_r37 = i0.ɵɵnextContext();return ctx_r37.showRightMenu($event);
            });
            i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_3_Template, 3, 2, "div", 3);
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_Template_div_click_4_listener() {
                i0.ɵɵrestoreView(_r38);var ctx_r39 = i0.ɵɵnextContext();return ctx_r39.onSwitchFoldingType();
            });
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
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }if (rf & 2) {
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
        }
    }
    var TreeInternalComponent = /** @class */function () {
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
                _this.isRightMenuVisible = false;
                _this.isLeftMenuVisible = false;
            }));
            this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function () {
                return _this.isSelected = false;
            }));
            this.subscriptions.push(this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe(function (e) {
                return _this.nodeDraggedHandler(e);
            }));
            this.subscriptions.push(rxjs_1.merge(this.treeService.nodeChecked$, this.treeService.nodeUnchecked$).pipe(operators_1.filter(function (e) {
                return _this.eventContainsId(e) && _this.tree.hasChild(e.node);
            })).subscribe(function (e) {
                return _this.updateCheckboxState();
            }));
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
            this.subscriptions.forEach(function (sub) {
                return sub && sub.unsubscribe();
            });
        };
        TreeInternalComponent.prototype.nodeDraggedHandler = function (e) {
            // Remove child nodes if parent is being moved (child nodes will move with the parent)
            var nodesToMove = e.captured.filter(function (cn) {
                return !cn.tree.parent || !cn.tree.parent.checked;
            });
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
                } else if (this.tree.hasSibling(node.tree)) {
                    this.moveSibling(node.tree, this.tree, e.position);
                } else {
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
        TreeInternalComponent.prototype.moveSibling = function (sibling, tree, position) {
            var previousPositionInParent = sibling.positionInParent;
            if (position === draggable_events_1.DropPosition.Above) {
                tree.moveSiblingAbove(sibling);
            } else if (position === draggable_events_1.DropPosition.Below) {
                tree.moveSiblingBelow(sibling);
            } else {
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
            var nodeId = fn_utils_1.get(this.tree, 'node.id', '');
            this.nodeDraggableService.removeCheckedNodeById(nodeId);
            this.treeService.deleteController(nodeId);
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
            } else {
                this.onNodeUnchecked();
            }
        };
        TreeInternalComponent.prototype.onNodeChecked = function (ignoreChildren) {
            if (ignoreChildren === void 0) {
                ignoreChildren = false;
            }
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
                this.executeOnChildController(function (controller) {
                    return controller.check();
                });
            }
        };
        TreeInternalComponent.prototype.onNodeUnchecked = function (ignoreChildren) {
            if (ignoreChildren === void 0) {
                ignoreChildren = false;
            }
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
                this.executeOnChildController(function (controller) {
                    return controller.uncheck();
                });
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
                } else if (checkedChildrenAmount === _this.tree.loadedChildrenAmount()) {
                    if (!_this.settings.ignoreParentOnCheck) {
                        _this.onNodeChecked(true);
                        _this.onNodeIndeterminate(false);
                    } else if (!_this.tree.checked) {
                        _this.onNodeIndeterminate(true);
                    }
                } else {
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
        TreeInternalComponent.ɵfac = function TreeInternalComponent_Factory(t) {
            return new (t || TreeInternalComponent)(i0.ɵɵdirectiveInject(i1.NodeMenuService), i0.ɵɵdirectiveInject(i2.TreeService), i0.ɵɵdirectiveInject(i3.NodeDraggableService), i0.ɵɵdirectiveInject(i0.ElementRef));
        };
        TreeInternalComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TreeInternalComponent, selectors: [["tree-internal"]], viewQuery: function TreeInternalComponent_Query(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵviewQuery(_c0, 1);
                }if (rf & 2) {
                    var _t = void 0;
                    i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.checkboxElementRef = _t.first);
                }
            }, inputs: { tree: "tree", settings: "settings", template: "template" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "tree", 3, "ngClass", 4, "ngIf"], [1, "tree", 3, "ngClass"], [1, "value-container", 3, "ngClass", "nodeDraggable", "tree", "contextmenu"], ["class", "node-checkbox", 4, "ngIf"], [1, "folding", 3, "ngClass", "click"], ["class", "node-value", 3, "node-selected", "dblclick", "click", 4, "ngIf"], ["type", "text", "class", "node-value", "id", "rename-input", 3, "nodeEditable", "keydown", "input", "valueChanged", 4, "ngIf"], ["class", "node-left-menu", 3, "innerHTML", "click", 4, "ngIf"], [3, "menuItemSelected", 4, "ngIf"], ["class", "drag-template", 3, "innerHTML", 4, "ngIf"], [3, "menuItems", "menuItemSelected", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngIf"], [1, "node-checkbox"], ["checkbox", "", "type", "checkbox", 3, "disabled", "checked", "change"], ["checkbox", ""], [1, "node-value", 3, "dblclick", "click"], ["class", "node-template", 3, "innerHTML", 4, "ngIf"], ["class", "node-name", 3, "innerHTML", 4, "ngIf"], ["class", "loading-children", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node-template", 3, "innerHTML"], [1, "node-name", 3, "innerHTML"], [1, "loading-children"], ["type", "text", "id", "rename-input", 1, "node-value", 3, "nodeEditable", "keydown", "input", "valueChanged"], [1, "node-left-menu", 3, "innerHTML", "click"], [3, "menuItemSelected"], [1, "drag-template", 3, "innerHTML"], [3, "menuItems", "menuItemSelected"], [3, "ngStyle"], [3, "tree", "template", "settings", 4, "ngFor", "ngForOf"], [3, "tree", "template", "settings"]], template: function TreeInternalComponent_Template(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_Template, 14, 22, "ul", 0);
                }if (rf & 2) {
                    i0.ɵɵproperty("ngIf", ctx.tree);
                }
            }, directives: [i4.NgIf, i4.NgClass, i5.NodeDraggableDirective, i4.NgTemplateOutlet, i6.NodeEditableDirective, i7.NodeMenuComponent, i4.NgStyle, i4.NgForOf, TreeInternalComponent], pipes: [i8.SafeHtmlPipe, i4.AsyncPipe], encapsulation: 2 });
        return TreeInternalComponent;
    }();
    exports.TreeInternalComponent = TreeInternalComponent;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeInternalComponent, [{
            type: core_1.Component,
            args: [{
                selector: 'tree-internal',
                template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden(), checked: tree.checked}\"\n        [class.selected]=\"isSelected\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"nodeElementRef\"\n        [tree]=\"tree\">\n\n        <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n          <input checkbox  type=\"checkbox\" [disabled]=\"isReadOnly\" [checked]=\"tree.checked\" (change)=\"switchNodeCheckStatus()\" #checkbox />\n        </div>\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (dblclick)=\"onNodeDoubleClicked($event)\"\n          (click)=\"onNodeSelected($event)\">\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"></ng-template>\n        </div>\n\n        <input type=\"text\" class=\"node-value\" id=\"rename-input\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (keydown)=\"keydownHandler($event)\"\n           (input)=\"inputChangeHandler($event)\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n        <div class=\"drag-template\" *ngIf=\"tree.hasDragIcon()\" [innerHTML]=\"tree.dragTemplate | safeHtml\"></div>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <node-menu *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n           [menuItems]=\"tree.menuItems\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{'display': tree.isNodeExpanded() ? 'block' : 'none'}\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </div>\n      <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
            }]
        }], function () {
            return [{ type: i1.NodeMenuService }, { type: i2.TreeService }, { type: i3.NodeDraggableService }, { type: i0.ElementRef }];
        }, { tree: [{
                type: core_1.Input
            }], settings: [{
                type: core_1.Input
            }], template: [{
                type: core_1.Input
            }], checkboxElementRef: [{
                type: core_1.ViewChild,
                args: ['checkbox']
            }] });
    })();

});
$__System.registerDynamic("1a", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CapturedNode = void 0;
    var CapturedNode = /** @class */function () {
        function CapturedNode(anElement, aTree) {
            this.anElement = anElement;
            this.aTree = aTree;
        }
        CapturedNode.prototype.canBeDroppedAt = function (element) {
            return !this.sameAs(element) && !this.contains(element);
        };
        CapturedNode.prototype.contains = function (other) {
            return this.element.nativeElement.contains(other.nativeElement);
        };
        CapturedNode.prototype.sameAs = function (other) {
            return this.element === other;
        };
        Object.defineProperty(CapturedNode.prototype, "element", {
            get: function () {
                return this.anElement;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CapturedNode.prototype, "tree", {
            get: function () {
                return this.aTree;
            },
            enumerable: false,
            configurable: true
        });
        return CapturedNode;
    }();
    exports.CapturedNode = CapturedNode;

});
$__System.registerDynamic("f", ["15"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeStatus = exports.Ng2TreeSettings = exports.TreeModelSettings = exports.FoldingType = void 0;
    var fn_utils_1 = $__require("15");
    var FoldingType = /** @class */function () {
        function FoldingType(_cssClass) {
            this._cssClass = _cssClass;
        }
        Object.defineProperty(FoldingType.prototype, "cssClass", {
            get: function () {
                return this._cssClass;
            },
            enumerable: false,
            configurable: true
        });
        FoldingType.Expanded = new FoldingType('node-expanded');
        FoldingType.Collapsed = new FoldingType('node-collapsed');
        FoldingType.Empty = new FoldingType('node-empty');
        FoldingType.Leaf = new FoldingType('node-leaf');
        return FoldingType;
    }();
    exports.FoldingType = FoldingType;
    var TreeModelSettings = /** @class */function () {
        function TreeModelSettings() {}
        TreeModelSettings.merge = function (child, parent) {
            var parentCascadingSettings = fn_utils_1.omit(fn_utils_1.get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
            return fn_utils_1.defaultsDeep({}, fn_utils_1.get(child, 'settings'), parentCascadingSettings, {
                static: false,
                leftMenu: false,
                rightMenu: true,
                dragIcon: false,
                isCollapsedOnInit: false,
                checked: false,
                keepNodesInDOM: false,
                selectionAllowed: true
            });
        };
        TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
        return TreeModelSettings;
    }();
    exports.TreeModelSettings = TreeModelSettings;
    var Ng2TreeSettings = /** @class */function () {
        function Ng2TreeSettings() {
            /**
             * Indicates root visibility in the tree. When true - root is invisible.
             * @name Ng2TreeSettings#rootIsVisible
             * @type boolean
             */
            /* eslint-disable */
            this.rootIsVisible = true;
            this.showCheckboxes = false;
            this.enableCheckboxes = true;
            this.ignoreParentOnCheck = false;
            /* eslint-enable */
        }
        return Ng2TreeSettings;
    }();
    exports.Ng2TreeSettings = Ng2TreeSettings;
    var TreeStatus;
    (function (TreeStatus) {
        TreeStatus[TreeStatus["New"] = 0] = "New";
        TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
        TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
    })(TreeStatus = exports.TreeStatus || (exports.TreeStatus = {}));

});
$__System.registerDynamic("22", ["23", "24"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _rng = _interopRequireDefault($__require("23"));

  var _bytesToUuid = _interopRequireDefault($__require("24"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html
  var _nodeId;

  var _clockseq; // Previous uuid creation time


  var _lastMSecs = 0;
  var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189

    if (node == null || clockseq == null) {
      var seedBytes = options.random || (options.rng || _rng.default)();

      if (node == null) {
        // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
        node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      }

      if (clockseq == null) {
        // Per 4.2.2, randomize (14 bit) clockseq
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
      }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


    var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock

    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

    if (dt < 0 && options.clockseq === undefined) {
      clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval


    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
      nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested


    if (nsecs >= 10000) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

    msecs += 12219292800000; // `time_low`

    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`

    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`

    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

    b[i++] = clockseq & 0xff; // `node`

    for (var n = 0; n < 6; ++n) {
      b[i + n] = node[n];
    }

    return buf ? buf : (0, _bytesToUuid.default)(b);
  }

  var _default = v1;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("25", ["@empty"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _crypto = _interopRequireDefault($__require("@empty"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function md5(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
      bytes = Buffer.from(bytes, 'utf8');
    }

    return _crypto.default.createHash('md5').update(bytes).digest();
  }

  var _default = md5;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("26", ["27", "25"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _v = _interopRequireDefault($__require("27"));

  var _md = _interopRequireDefault($__require("25"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  const v3 = (0, _v.default)('v3', 0x30, _md.default);
  var _default = v3;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("23", ["@empty"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = rng;

  var _crypto = _interopRequireDefault($__require("@empty"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function rng() {
    return _crypto.default.randomBytes(16);
  }

  module.exports = exports.default;
});
$__System.registerDynamic("28", ["23", "24"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _rng = _interopRequireDefault($__require("23"));

  var _bytesToUuid = _interopRequireDefault($__require("24"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof options == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }

    options = options || {};

    var rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || (0, _bytesToUuid.default)(rnds);
  }

  var _default = v4;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("24", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  }

  var _default = bytesToUuid;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("27", ["24"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _default;
  exports.URL = exports.DNS = void 0;

  var _bytesToUuid = _interopRequireDefault($__require("24"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function uuidToBytes(uuid) {
    // Note: We assume we're being passed a valid uuid string
    var bytes = [];
    uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
      bytes.push(parseInt(hex, 16));
    });
    return bytes;
  }

  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape

    var bytes = new Array(str.length);

    for (var i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }

    return bytes;
  }

  const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  exports.DNS = DNS;
  const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  exports.URL = URL;

  function _default(name, version, hashfunc) {
    var generateUUID = function (value, namespace, buf, offset) {
      var off = buf && offset || 0;
      if (typeof value == 'string') value = stringToBytes(value);
      if (typeof namespace == 'string') namespace = uuidToBytes(namespace);
      if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
      if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values'); // Per 4.3

      var bytes = hashfunc(namespace.concat(value));
      bytes[6] = bytes[6] & 0x0f | version;
      bytes[8] = bytes[8] & 0x3f | 0x80;

      if (buf) {
        for (var idx = 0; idx < 16; ++idx) {
          buf[off + idx] = bytes[idx];
        }
      }

      return buf || (0, _bytesToUuid.default)(bytes);
    }; // Function#name is not settable on some platforms (#270)


    try {
      generateUUID.name = name;
    } catch (err) {} // For CommonJS default export support


    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
  }
});
$__System.registerDynamic("29", ["@empty"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _crypto = _interopRequireDefault($__require("@empty"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function sha1(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
      bytes = Buffer.from(bytes, 'utf8');
    }

    return _crypto.default.createHash('sha1').update(bytes).digest();
  }

  var _default = sha1;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("2a", ["27", "29"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _v = _interopRequireDefault($__require("27"));

  var _sha = _interopRequireDefault($__require("29"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  const v5 = (0, _v.default)('v5', 0x50, _sha.default);
  var _default = v5;
  exports.default = _default;
  module.exports = exports.default;
});
$__System.registerDynamic("2b", ["22", "26", "28", "2a"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function () {
      return _v.default;
    }
  });
  Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function () {
      return _v2.default;
    }
  });
  Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function () {
      return _v3.default;
    }
  });
  Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function () {
      return _v4.default;
    }
  });

  var _v = _interopRequireDefault($__require("22"));

  var _v2 = _interopRequireDefault($__require("26"));

  var _v3 = _interopRequireDefault($__require("28"));

  var _v4 = _interopRequireDefault($__require("2a"));

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
});
$__System.registerDynamic("10", ["15", "f", "2b", "1b"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tree = void 0;
    var fn_utils_1 = $__require("15");
    var tree_types_1 = $__require("f");
    var uuid_1 = $__require("2b");
    var rxjs_1 = $__require("1b");
    var ChildrenLoadingState;
    (function (ChildrenLoadingState) {
        ChildrenLoadingState[ChildrenLoadingState["NotStarted"] = 0] = "NotStarted";
        ChildrenLoadingState[ChildrenLoadingState["Loading"] = 1] = "Loading";
        ChildrenLoadingState[ChildrenLoadingState["Completed"] = 2] = "Completed";
    })(ChildrenLoadingState || (ChildrenLoadingState = {}));
    var Tree = /** @class */function () {
        /**
         * Build an instance of Tree from an object implementing TreeModel interface.
         * @param {TreeModel} model - A model that is used to build a tree.
         * @param {Tree} [parent] - An optional parent if you want to build a tree from the model that should be a child of an existing Tree instance.
         * @param {boolean} [isBranch] - An option that makes a branch from created tree. Branch can have children.
         */
        function Tree(node, parent, isBranch) {
            var _this = this;
            if (parent === void 0) {
                parent = null;
            }
            if (isBranch === void 0) {
                isBranch = false;
            }
            this._childrenLoadingState = ChildrenLoadingState.NotStarted;
            this._childrenAsyncOnce = fn_utils_1.once(function () {
                return new rxjs_1.Observable(function (observer) {
                    setTimeout(function () {
                        _this._childrenLoadingState = ChildrenLoadingState.Loading;
                        _this._loadChildren(function (children) {
                            _this._children = (children || []).map(function (child) {
                                return new Tree(child, _this);
                            });
                            _this._childrenLoadingState = ChildrenLoadingState.Completed;
                            observer.next(_this.children);
                            observer.complete();
                        });
                    });
                });
            });
            this.buildTreeFromModel(node, parent, isBranch || Array.isArray(node.children));
        }
        // STATIC METHODS ----------------------------------------------------------------------------------------------------
        /**
         * Check that value passed is not empty (it doesn't consist of only whitespace symbols).
         * @param {string} value - A value that should be checked.
         * @returns {boolean} - A flag indicating that value is empty or not.
         * @static
         */
        Tree.isValueEmpty = function (value) {
            return fn_utils_1.isEmpty(fn_utils_1.trim(value));
        };
        /**
         * Check whether a given value can be considered RenamableNode.
         * @param {any} value - A value to check.
         * @returns {boolean} - A flag indicating whether given value is Renamable node or not.
         * @static
         */
        Tree.isRenamable = function (value) {
            return fn_utils_1.has(value, 'setName') && fn_utils_1.isFunction(value.setName) && fn_utils_1.has(value, 'toString') && fn_utils_1.isFunction(value.toString) && value.toString !== Object.toString;
        };
        Tree.cloneTreeShallow = function (origin) {
            var tree = new Tree(Object.assign({}, origin.node));
            tree._children = origin._children;
            return tree;
        };
        Tree.applyNewValueToRenamable = function (value, newValue) {
            var renamableValue = Object.assign({}, value);
            renamableValue.setName(newValue);
            return renamableValue;
        };
        Tree.prototype.buildTreeFromModel = function (model, parent, isBranch) {
            var _this = this;
            this.parent = parent;
            this.node = Object.assign(fn_utils_1.omit(model, 'children'), { settings: tree_types_1.TreeModelSettings.merge(model, fn_utils_1.get(parent, 'node')) }, { emitLoadNextLevel: model.emitLoadNextLevel === true });
            if (fn_utils_1.isFunction(this.node.loadChildren)) {
                this._loadChildren = this.node.loadChildren;
            } else {
                fn_utils_1.get(model, 'children', []).forEach(function (child, index) {
                    _this._addChild(new Tree(child, _this), index);
                });
            }
            if (!Array.isArray(this._children)) {
                this._children = this.node.loadChildren || isBranch ? [] : null;
            }
        };
        Tree.prototype.hasDeferredChildren = function () {
            return typeof this._loadChildren === 'function';
        };
        /* Setting the children loading state to Loading since a request was dispatched to the client */
        Tree.prototype.loadingChildrenRequested = function () {
            this._childrenLoadingState = ChildrenLoadingState.Loading;
        };
        /**
         * Check whether children of the node are being loaded.
         * Makes sense only for nodes that define `loadChildren` function.
         * @returns {boolean} A flag indicating that children are being loaded.
         */
        Tree.prototype.childrenAreBeingLoaded = function () {
            return this._childrenLoadingState === ChildrenLoadingState.Loading;
        };
        /**
         * Check whether children of the node were loaded.
         * Makes sense only for nodes that define `loadChildren` function.
         * @returns {boolean} A flag indicating that children were loaded.
         */
        Tree.prototype.childrenWereLoaded = function () {
            return this._childrenLoadingState === ChildrenLoadingState.Completed;
        };
        Tree.prototype.canLoadChildren = function () {
            return this._childrenLoadingState === ChildrenLoadingState.NotStarted && this.foldingType === tree_types_1.FoldingType.Expanded && !!this._loadChildren;
        };
        /**
         * Check whether children of the node should be loaded and not loaded yet.
         * Makes sense only for nodes that define `loadChildren` function.
         * @returns {boolean} A flag indicating that children should be loaded for the current node.
         */
        Tree.prototype.childrenShouldBeLoaded = function () {
            return !this.childrenWereLoaded() && (!!this._loadChildren || this.node.emitLoadNextLevel === true);
        };
        Object.defineProperty(Tree.prototype, "children", {
            /**
             * Get children of the current tree.
             * @returns {Tree[]} The children of the current tree.
             */
            get: function () {
                return this._children;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "childrenAsync", {
            /**
             * By getting value from this property you start process of loading node's children using `loadChildren` function.
             * Once children are loaded `loadChildren` function won't be called anymore and loaded for the first time children are emitted in case of subsequent calls.
             * @returns {Observable<Tree[]>} An observable which emits children once they are loaded.
             */
            get: function () {
                if (this.canLoadChildren()) {
                    return this._childrenAsyncOnce();
                }
                return rxjs_1.of(this.children);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * By calling this method you start process of loading node's children using `loadChildren` function.
         */
        Tree.prototype.reloadChildren = function () {
            var _this = this;
            if (this.childrenShouldBeLoaded()) {
                this._childrenLoadingState = ChildrenLoadingState.Loading;
                this._loadChildren(function (children) {
                    _this._children = children && children.map(function (child) {
                        return new Tree(child, _this);
                    });
                    _this._childrenLoadingState = ChildrenLoadingState.Completed;
                });
            }
        };
        /**
         * By calling this method you will remove all current children of a treee and create new.
         */
        Tree.prototype.setChildren = function (children) {
            var _this = this;
            this._children = children && children.map(function (child) {
                return new Tree(child, _this);
            });
            if (this.childrenShouldBeLoaded()) {
                this._childrenLoadingState = ChildrenLoadingState.Completed;
            }
        };
        /**
         * Create a new node in the current tree.
         * @param {boolean} isBranch - A flag that indicates whether a new node should be a "Branch". "Leaf" node will be created by default
         * @param {TreeModel} model - Tree model of the new node which will be inserted. Empty node will be created by default and it will fire edit mode of this node
         * @returns {Tree} A newly created child node.
         */
        Tree.prototype.createNode = function (isBranch, model) {
            if (model === void 0) {
                model = { value: '' };
            }
            var tree = new Tree(model, this, isBranch);
            if (!model.id) {
                tree.markAsNew();
            }
            tree.id = tree.id || uuid_1.v4();
            if (this.childrenShouldBeLoaded() && !(this.childrenAreBeingLoaded() || this.childrenWereLoaded())) {
                return null;
            }
            if (this.isLeaf()) {
                return this.addSibling(tree);
            } else {
                return this.addChild(tree);
            }
        };
        Object.defineProperty(Tree.prototype, "value", {
            /**
             * Get the value of the current node
             * @returns {(string|RenamableNode)} The value of the node.
             */
            get: function () {
                return this.node.value;
            },
            /**
             * Set the value of the current node
             * @param {(string|RenamableNode)} value - The new value of the node.
             */
            set: function (value) {
                if (typeof value !== 'string' && !Tree.isRenamable(value)) {
                    return;
                }
                var stringifiedValue = '' + value;
                if (Tree.isRenamable(this.value)) {
                    this.node.value = Tree.applyNewValueToRenamable(this.value, stringifiedValue);
                } else {
                    this.node.value = Tree.isValueEmpty(stringifiedValue) ? this.node.value : stringifiedValue;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "checked", {
            get: function () {
                return !!fn_utils_1.get(this.node.settings, 'checked');
            },
            set: function (checked) {
                this.node.settings = Object.assign({}, this.node.settings, { checked: checked });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "checkedChildren", {
            get: function () {
                return this.hasLoadedChildren() ? this.children.filter(function (child) {
                    return child.checked;
                }) : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "selectionAllowed", {
            get: function () {
                var value = fn_utils_1.get(this.node.settings, 'selectionAllowed');
                return fn_utils_1.isNil(value) ? true : !!value;
            },
            set: function (selectionAllowed) {
                this.node.settings = Object.assign({}, this.node.settings, { selectionAllowed: selectionAllowed });
            },
            enumerable: false,
            configurable: true
        });
        Tree.prototype.hasLoadedChildren = function () {
            return !fn_utils_1.isEmpty(this.children);
        };
        Tree.prototype.loadedChildrenAmount = function () {
            return fn_utils_1.size(this.children);
        };
        Tree.prototype.checkedChildrenAmount = function () {
            return fn_utils_1.size(this.checkedChildren);
        };
        /**
         * Add a sibling node for the current node. This won't work if the current node is a root.
         * @param {Tree} sibling - A node that should become a sibling.
         * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in a parent.
         * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
         */
        Tree.prototype.addSibling = function (sibling, position) {
            if (Array.isArray(fn_utils_1.get(this.parent, 'children'))) {
                return this.parent.addChild(sibling, position);
            }
            return null;
        };
        /**
         * Add a child node for the current node.
         * @param {Tree} child - A node that should become a child.
         * @param [number] position - Position in which child will be inserted. By default it will be inserted at the last position in a parent.
         * @returns {Tree} A newly inserted child.
         */
        Tree.prototype.addChild = function (child, position) {
            var newborn = this._addChild(Tree.cloneTreeShallow(child), position);
            this._setFoldingType();
            if (this.isNodeCollapsed()) {
                this.switchFoldingType();
            }
            return newborn;
        };
        Tree.prototype._addChild = function (child, position) {
            if (position === void 0) {
                position = fn_utils_1.size(this._children) || 0;
            }
            child.parent = this;
            if (Array.isArray(this._children)) {
                this._children.splice(position, 0, child);
            } else {
                this._children = [child];
            }
            return child;
        };
        /**
         * Moves a given sibling above the this node.
         * If node passed as a parameter is not a sibling - nothing happens.
         * @param {Tree} sibling - A sibling to move
         */
        Tree.prototype.moveSiblingAbove = function (sibling) {
            if (!this.hasSibling(sibling)) {
                return;
            }
            var siblings = this.parent._children;
            var siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
            var insertAtIndex = this.positionInParent;
            siblings.splice(insertAtIndex, 0, siblingToMove);
        };
        /**
         * Moves a given sibling below the this node.
         * If node passed as a parameter is not a sibling - nothing happens.
         * @param {Tree} sibling - A sibling to move
         */
        Tree.prototype.moveSiblingBelow = function (sibling) {
            if (!this.hasSibling(sibling)) {
                return;
            }
            var siblings = this.parent._children;
            var siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
            var insertAtIndex = this.positionInParent + 1;
            siblings.splice(insertAtIndex, 0, siblingToMove);
        };
        Object.defineProperty(Tree.prototype, "positionInParent", {
            /**
             * Get a node's position in its parent.
             * @returns {number} The position inside a parent.
             */
            get: function () {
                if (this.isRoot()) {
                    return -1;
                }
                return this.parent.children ? this.parent.children.indexOf(this) : -1;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Check whether or not this tree is static.
         * @returns {boolean} A flag indicating whether or not this tree is static.
         */
        Tree.prototype.isStatic = function () {
            return fn_utils_1.get(this.node.settings, 'static', false);
        };
        /**
         * Check whether or not this tree has a left menu.
         * @returns {boolean} A flag indicating whether or not this tree has a left menu.
         */
        Tree.prototype.hasLeftMenu = function () {
            return !fn_utils_1.get(this.node.settings, 'static', false) && fn_utils_1.get(this.node.settings, 'leftMenu', false);
        };
        /**
         * Check whether or not this tree has a right menu.
         * @returns {boolean} A flag indicating whether or not this tree has a right menu.
         */
        Tree.prototype.hasRightMenu = function () {
            return !fn_utils_1.get(this.node.settings, 'static', false) && fn_utils_1.get(this.node.settings, 'rightMenu', false);
        };
        /**
         * Check whether or not this tree should show a drag icon.
         * @returns {boolean} A flag indicating whether or not this tree has a left menu.
         */
        Tree.prototype.hasDragIcon = function () {
            return !fn_utils_1.get(this.node.settings, 'static', false) && fn_utils_1.get(this.node.settings, 'dragIcon', false);
        };
        /**
         * Check whether this tree is "Leaf" or not.
         * @returns {boolean} A flag indicating whether or not this tree is a "Leaf".
         */
        Tree.prototype.isLeaf = function () {
            return !this.isBranch();
        };
        Object.defineProperty(Tree.prototype, "menuItems", {
            /**
             * Get menu items of the current tree.
             * @returns {NodeMenuItem[]} The menu items of the current tree.
             */
            get: function () {
                return fn_utils_1.get(this.node.settings, 'menuItems');
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Check whether or not this tree has a custom menu.
         * @returns {boolean} A flag indicating whether or not this tree has a custom menu.
         */
        Tree.prototype.hasCustomMenu = function () {
            return !this.isStatic() && !!fn_utils_1.get(this.node.settings, 'menuItems', false);
        };
        /**
         * Check whether this tree is "Branch" or not. "Branch" is a node that has children.
         * @returns {boolean} A flag indicating whether or not this tree is a "Branch".
         */
        Tree.prototype.isBranch = function () {
            return this.node.emitLoadNextLevel === true || Array.isArray(this._children);
        };
        /**
         * Check whether this tree has children.
         * @returns {boolean} A flag indicating whether or not this tree has children.
         */
        Tree.prototype.hasChildren = function () {
            return !fn_utils_1.isEmpty(this._children) || this.childrenShouldBeLoaded();
        };
        /**
         * Check whether this tree is a root or not. The root is the tree (node) that doesn't have parent (or technically its parent is null).
         * @returns {boolean} A flag indicating whether or not this tree is the root.
         */
        Tree.prototype.isRoot = function () {
            return fn_utils_1.isNil(this.parent);
        };
        /**
         * Check whether provided tree is a sibling of the current tree. Sibling trees (nodes) are the trees that have the same parent.
         * @param {Tree} tree - A tree that should be tested on a siblingness.
         * @returns {boolean} A flag indicating whether or not provided tree is the sibling of the current one.
         */
        Tree.prototype.hasSibling = function (tree) {
            return !this.isRoot() && fn_utils_1.includes(this.parent.children, tree);
        };
        /**
         * Check whether provided tree is a child of the current tree.
         * This method tests that provided tree is a <strong>direct</strong> child of the current tree.
         * @param {Tree} tree - A tree that should be tested (child candidate).
         * @returns {boolean} A flag indicating whether provided tree is a child or not.
         */
        Tree.prototype.hasChild = function (tree) {
            return fn_utils_1.includes(this._children, tree);
        };
        /**
         * Remove given tree from the current tree.
         * The given tree will be removed only in case it is a direct child of the current tree (@see {@link hasChild}).
         * @param {Tree} tree - A tree that should be removed.
         */
        Tree.prototype.removeChild = function (tree) {
            if (!this.hasChildren()) {
                return;
            }
            var childIndex = this._children.findIndex(function (child) {
                return child === tree;
            });
            if (childIndex >= 0) {
                this._children.splice(childIndex, 1);
            }
            this._setFoldingType();
        };
        /**
         * Remove current tree from its parent.
         */
        Tree.prototype.removeItselfFromParent = function () {
            if (!this.parent) {
                return;
            }
            this.parent.removeChild(this);
        };
        /**
         * Switch folding type of the current tree. "Leaf" node cannot switch its folding type cause it doesn't have children, hence nothing to fold.
         * If node is a "Branch" and it is expanded, then by invoking current method state of the tree should be switched to "collapsed" and vice versa.
         */
        Tree.prototype.switchFoldingType = function () {
            if (this.isLeaf() || !this.hasChildren()) {
                return;
            }
            this.disableCollapseOnInit();
            this.node._foldingType = this.isNodeExpanded() ? tree_types_1.FoldingType.Collapsed : tree_types_1.FoldingType.Expanded;
        };
        /**
         * Check that tree is expanded.
         * @returns {boolean} A flag indicating whether current tree is expanded. Always returns false for the "Leaf" tree and for an empty tree.
         */
        Tree.prototype.isNodeExpanded = function () {
            return this.foldingType === tree_types_1.FoldingType.Expanded;
        };
        /**
         * Check that tree is collapsed.
         * @returns {boolean} A flag indicating whether current tree is collapsed. Always returns false for the "Leaf" tree and for an empty tree.
         */
        Tree.prototype.isNodeCollapsed = function () {
            return this.foldingType === tree_types_1.FoldingType.Collapsed;
        };
        /**
         * Set a current folding type: expanded, collapsed or leaf.
         */
        Tree.prototype._setFoldingType = function () {
            if (this.childrenShouldBeLoaded()) {
                this.node._foldingType = tree_types_1.FoldingType.Collapsed;
            } else if (this._children && !fn_utils_1.isEmpty(this._children)) {
                this.node._foldingType = this.isCollapsedOnInit() ? tree_types_1.FoldingType.Collapsed : tree_types_1.FoldingType.Expanded;
            } else if (Array.isArray(this._children)) {
                this.node._foldingType = tree_types_1.FoldingType.Empty;
            } else {
                this.node._foldingType = tree_types_1.FoldingType.Leaf;
            }
        };
        Object.defineProperty(Tree.prototype, "foldingType", {
            /**
             * Get a current folding type: expanded, collapsed or leaf.
             * @returns {FoldingType} A folding type of the current tree.
             */
            get: function () {
                if (!this.node._foldingType) {
                    this._setFoldingType();
                }
                return this.node._foldingType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "foldingCssClass", {
            /**
             * Get a css class for element which displayes folding state - expanded, collapsed or leaf
             * @returns {string} A string icontaining css class (classes)
             */
            get: function () {
                return this.getCssClassesFromSettings() || this.foldingType.cssClass;
            },
            enumerable: false,
            configurable: true
        });
        Tree.prototype.getCssClassesFromSettings = function () {
            if (!this.node._foldingType) {
                this._setFoldingType();
            }
            if (this.node._foldingType === tree_types_1.FoldingType.Collapsed) {
                return fn_utils_1.get(this.node.settings, 'cssClasses.collapsed', null);
            } else if (this.node._foldingType === tree_types_1.FoldingType.Expanded) {
                return fn_utils_1.get(this.node.settings, 'cssClasses.expanded', null);
            } else if (this.node._foldingType === tree_types_1.FoldingType.Empty) {
                return fn_utils_1.get(this.node.settings, 'cssClasses.empty', null);
            }
            return fn_utils_1.get(this.node.settings, 'cssClasses.leaf', null);
        };
        Object.defineProperty(Tree.prototype, "nodeTemplate", {
            /**
             * Get a html template to render before every node's name.
             * @returns {string} A string representing a html template.
             */
            get: function () {
                return this.getTemplateFromSettings();
            },
            enumerable: false,
            configurable: true
        });
        Tree.prototype.getTemplateFromSettings = function () {
            if (this.isLeaf()) {
                return fn_utils_1.get(this.node.settings, 'templates.leaf', '');
            } else {
                return fn_utils_1.get(this.node.settings, 'templates.node', '');
            }
        };
        Object.defineProperty(Tree.prototype, "leftMenuTemplate", {
            /**
             * Get a html template to render for an element activatin left menu of a node.
             * @returns {string} A string representing a html template.
             */
            get: function () {
                if (this.hasLeftMenu()) {
                    return fn_utils_1.get(this.node.settings, 'templates.leftMenu', '<span></span>');
                }
                return '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tree.prototype, "dragTemplate", {
            get: function () {
                return fn_utils_1.get(this.node.settings, 'templates.dragIcon', '<span></span>');
            },
            enumerable: false,
            configurable: true
        });
        Tree.prototype.disableCollapseOnInit = function () {
            if (this.node.settings) {
                this.node.settings.isCollapsedOnInit = false;
            }
        };
        Tree.prototype.isCollapsedOnInit = function () {
            return !!fn_utils_1.get(this.node.settings, 'isCollapsedOnInit');
        };
        Tree.prototype.keepNodesInDOM = function () {
            return fn_utils_1.get(this.node.settings, 'keepNodesInDOM');
        };
        /**
         * Check that current tree is newly created (added by user via menu for example). Tree that was built from the TreeModel is not marked as new.
         * @returns {boolean} A flag whether the tree is new.
         */
        Tree.prototype.isNew = function () {
            return this.node._status === tree_types_1.TreeStatus.New;
        };
        Object.defineProperty(Tree.prototype, "id", {
            get: function () {
                return fn_utils_1.get(this.node, 'id');
            },
            set: function (id) {
                this.node.id = id;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Mark current tree as new (@see {@link isNew}).
         */
        Tree.prototype.markAsNew = function () {
            this.node._status = tree_types_1.TreeStatus.New;
        };
        /**
         * Check that current tree is being renamed (it is in the process of its value renaming initiated by a user).
         * @returns {boolean} A flag whether the tree is being renamed.
         */
        Tree.prototype.isBeingRenamed = function () {
            return this.node._status === tree_types_1.TreeStatus.IsBeingRenamed;
        };
        /**
         * Mark current tree as being renamed (@see {@link isBeingRenamed}).
         */
        Tree.prototype.markAsBeingRenamed = function () {
            this.node._status = tree_types_1.TreeStatus.IsBeingRenamed;
        };
        /**
         * Check that current tree is modified (for example it was renamed).
         * @returns {boolean} A flag whether the tree is modified.
         */
        Tree.prototype.isModified = function () {
            return this.node._status === tree_types_1.TreeStatus.Modified;
        };
        /**
         * Mark current tree as modified (@see {@link isModified}).
         */
        Tree.prototype.markAsModified = function () {
            this.node._status = tree_types_1.TreeStatus.Modified;
        };
        /**
         * Makes a clone of an underlying TreeModel instance
         * @returns {TreeModel} a clone of an underlying TreeModel instance
         */
        Tree.prototype.toTreeModel = function () {
            var model = fn_utils_1.defaultsDeep(this.isLeaf() ? {} : { children: [] }, this.node);
            if (this.children) {
                this.children.forEach(function (child) {
                    model.children.push(child.toTreeModel());
                });
            }
            return model;
        };
        return Tree;
    }();
    exports.Tree = Tree;

});
$__System.registerDynamic("1e", ["d", "19", "1a", "10", "18"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeDraggableDirective = void 0;
    var core_1 = $__require("d");
    var node_draggable_service_1 = $__require("19");
    var captured_node_1 = $__require("1a");
    var tree_1 = $__require("10");
    var draggable_events_1 = $__require("18");
    var i0 = $__require("d");
    var i1 = $__require("19");
    var NodeDraggableDirective = /** @class */function () {
        function NodeDraggableDirective(element, nodeDraggableService, renderer) {
            this.element = element;
            this.nodeDraggableService = nodeDraggableService;
            this.renderer = renderer;
            this.disposersForDragListeners = [];
            this.nodeNativeElement = element.nativeElement;
        }
        NodeDraggableDirective.prototype.ngOnInit = function () {
            if (!this.tree.isStatic()) {
                this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
            }
        };
        NodeDraggableDirective.prototype.ngOnDestroy = function () {
            this.disposersForDragListeners.forEach(function (dispose) {
                return dispose();
            });
        };
        NodeDraggableDirective.prototype.handleDragStart = function (e) {
            if (this.tree.isBeingRenamed()) {
                e.preventDefault();
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            // Checked nodes are already added to the service in checkedNodes array
            // This is like so to allow differentiating if dragging a list of checked nodes or single unchecked node.
            if (!this.tree.checked) {
                this.nodeDraggableService.setDraggedNode(new captured_node_1.CapturedNode(this.nodeDraggable, this.tree));
            }
            this.notifyThatNodeIsBeingDragged();
            if (this.tree.node.settings.dragImageId) {
                var elem = document.getElementById(this.tree.node.settings.dragImageId);
                if (elem) {
                    e.dataTransfer.setDragImage(elem, 0, 0);
                }
            }
            this.applyDraggedNodeClasses();
            e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
            e.dataTransfer.effectAllowed = 'all';
        };
        NodeDraggableDirective.prototype.handleDragOver = function (e) {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode && draggedNode.contains({ nativeElement: e.currentTarget })) {
                // Cannot drag and drop on itself
                return;
            }
            if (!draggedNode && this.tree.checked) {
                // Cannot drop multiple items onto themselves
                return;
            }
            var newDropPosition = this.determineDropPosition(e);
            this.removeClasses([this.getDropPositionClassName(this.currentDropPosition)]);
            if (this.tree.isBranch() && this.tree.isNodeExpanded() && newDropPosition === draggable_events_1.DropPosition.Below) {
                // Cannot drop below a branch node if it's expanded
                return;
            }
            if (draggedNode && this.tree.isBranch() && this.tree.hasChild(draggedNode.tree) && newDropPosition === draggable_events_1.DropPosition.Into) {
                // Cannot drop into it's own parent
                return;
            }
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.addClasses([this.getDropPositionClassName(newDropPosition)]);
            this.currentDropPosition = newDropPosition;
        };
        NodeDraggableDirective.prototype.handleDragEnter = function (e) {
            e.preventDefault();
            if (this.containsElementAt(e)) {
                this.addClasses(['over-drop-target', this.getDragOverClassName()]);
            }
        };
        NodeDraggableDirective.prototype.handleDragLeave = function (e) {
            if (!this.containsElementAt(e)) {
                this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            }
        };
        NodeDraggableDirective.prototype.handleDragEnd = function (e) {
            this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            this.removeDraggedNodeClasses();
            this.nodeDraggableService.releaseDraggedNode();
        };
        NodeDraggableDirective.prototype.handleDrop = function (e) {
            e.preventDefault();
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            if (!this.isDropPossible(e)) {
                return false;
            }
            if (this.nodeDraggableService.getDraggedNode() || this.nodeDraggableService.getCheckedNodes().length > 0) {
                this.removeDraggedNodeClasses();
                this.notifyThatNodeWasDropped();
                this.releaseNodes();
            }
        };
        NodeDraggableDirective.prototype.determineDropPosition = function (e) {
            var dropPosition;
            var currentTarget = e.currentTarget;
            var elemHeight = currentTarget.offsetHeight;
            var relativeMousePosition = e.clientY - currentTarget.getBoundingClientRect().top;
            if (this.tree.isBranch()) {
                var third = elemHeight / 3;
                var twoThirds = third * 2;
                if (relativeMousePosition < third) {
                    dropPosition = draggable_events_1.DropPosition.Above;
                } else if (relativeMousePosition >= third && relativeMousePosition <= twoThirds) {
                    dropPosition = draggable_events_1.DropPosition.Into;
                } else {
                    dropPosition = draggable_events_1.DropPosition.Below;
                }
            } else {
                var half = elemHeight / 2;
                if (relativeMousePosition <= half) {
                    dropPosition = draggable_events_1.DropPosition.Above;
                } else {
                    dropPosition = draggable_events_1.DropPosition.Below;
                }
            }
            return dropPosition;
        };
        NodeDraggableDirective.prototype.getDragOverClassName = function () {
            return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
        };
        NodeDraggableDirective.prototype.getDropPositionClassName = function (dropPosition) {
            switch (dropPosition) {
                case draggable_events_1.DropPosition.Above:
                    return 'over-drop-above';
                case draggable_events_1.DropPosition.Into:
                    return 'over-drop-into';
                case draggable_events_1.DropPosition.Below:
                    return 'over-drop-below';
            }
        };
        NodeDraggableDirective.prototype.isDropPossible = function (e) {
            var _this = this;
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
                return draggedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
            } else {
                var capturedNodes = this.nodeDraggableService.getCheckedNodes();
                return capturedNodes.length > 0 && capturedNodes.some(function (cn) {
                    return cn.canBeDroppedAt(_this.nodeDraggable);
                }) && this.containsElementAt(e);
            }
        };
        NodeDraggableDirective.prototype.releaseNodes = function () {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
                this.nodeDraggableService.releaseDraggedNode();
            } else {
                this.nodeDraggableService.releaseCheckedNodes();
            }
        };
        NodeDraggableDirective.prototype.applyDraggedNodeClasses = function () {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
                draggedNode.element.nativeElement.classList.add('being-dragged');
            } else {
                this.nodeDraggableService.getCheckedNodes().forEach(function (n) {
                    return n.element.nativeElement.classList.add('being-dragged');
                });
            }
        };
        NodeDraggableDirective.prototype.removeDraggedNodeClasses = function () {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
                draggedNode.element.nativeElement.classList.remove('being-dragged');
            } else {
                this.nodeDraggableService.getCheckedNodes().forEach(function (n) {
                    return n.element.nativeElement.classList.remove('being-dragged');
                });
            }
        };
        NodeDraggableDirective.prototype.containsElementAt = function (e) {
            var _a = e.x,
                x = _a === void 0 ? e.clientX : _a,
                _b = e.y,
                y = _b === void 0 ? e.clientY : _b;
            return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
        };
        NodeDraggableDirective.prototype.addClasses = function (classNames) {
            var classList = this.nodeNativeElement.classList;
            classList.add.apply(classList, classNames);
        };
        NodeDraggableDirective.prototype.removeClasses = function (classNames) {
            var classList = this.nodeNativeElement.classList;
            classList.remove.apply(classList, classNames);
        };
        NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function () {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
            this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, this.currentDropPosition);
        };
        NodeDraggableDirective.prototype.notifyThatNodeIsBeingDragged = function () {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
            this.nodeDraggableService.fireNodeDragStart(nodes, this.nodeDraggable);
        };
        NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
        NodeDraggableDirective.ɵfac = function NodeDraggableDirective_Factory(t) {
            return new (t || NodeDraggableDirective)(i0.ɵɵdirectiveInject(core_1.ElementRef), i0.ɵɵdirectiveInject(node_draggable_service_1.NodeDraggableService), i0.ɵɵdirectiveInject(core_1.Renderer2));
        };
        NodeDraggableDirective.ɵdir = i0.ɵɵdefineDirective({ type: NodeDraggableDirective, selectors: [["", "nodeDraggable", ""]], inputs: { nodeDraggable: "nodeDraggable", tree: "tree" } });
        return NodeDraggableDirective;
    }();
    exports.NodeDraggableDirective = NodeDraggableDirective;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableDirective, [{
            type: core_1.Directive,
            args: [{
                selector: '[nodeDraggable]'
            }]
        }], function () {
            return [{ type: i0.ElementRef, decorators: [{
                    type: core_1.Inject,
                    args: [core_1.ElementRef]
                }] }, { type: i1.NodeDraggableService, decorators: [{
                    type: core_1.Inject,
                    args: [node_draggable_service_1.NodeDraggableService]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: core_1.Inject,
                    args: [core_1.Renderer2]
                }] }];
        }, { nodeDraggable: [{
                type: core_1.Input
            }], tree: [{
                type: core_1.Input
            }] });
    })();

});
$__System.registerDynamic("17", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeEditableEventAction = void 0;
    var NodeEditableEventAction;
    (function (NodeEditableEventAction) {
        NodeEditableEventAction[NodeEditableEventAction["Cancel"] = 0] = "Cancel";
    })(NodeEditableEventAction = exports.NodeEditableEventAction || (exports.NodeEditableEventAction = {}));

});
$__System.registerDynamic("1f", ["d", "17"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeEditableDirective = void 0;
    var core_1 = $__require("d");
    var editable_events_1 = $__require("17");
    var i0 = $__require("d");
    var NodeEditableDirective = /** @class */function () {
        function NodeEditableDirective(renderer, elementRef) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            /* eslint-enable @angular-eslint/no-input-rename */
            this.valueChanged = new core_1.EventEmitter(false);
        }
        NodeEditableDirective.prototype.ngOnInit = function () {
            var nativeElement = this.elementRef.nativeElement;
            if (nativeElement) {
                nativeElement.focus();
            }
            this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
        };
        NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
            this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
        };
        NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
            this.valueChanged.emit({ type: 'blur', value: newNodeValue });
        };
        NodeEditableDirective.prototype.cancelEditing = function () {
            this.valueChanged.emit({
                type: 'keyup',
                value: this.nodeValue,
                action: editable_events_1.NodeEditableEventAction.Cancel
            });
        };
        NodeEditableDirective.ɵfac = function NodeEditableDirective_Factory(t) {
            return new (t || NodeEditableDirective)(i0.ɵɵdirectiveInject(core_1.Renderer2), i0.ɵɵdirectiveInject(core_1.ElementRef));
        };
        NodeEditableDirective.ɵdir = i0.ɵɵdefineDirective({ type: NodeEditableDirective, selectors: [["", "nodeEditable", ""]], hostBindings: function NodeEditableDirective_HostBindings(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵlistener("keyup.enter", function NodeEditableDirective_keyup_enter_HostBindingHandler($event) {
                        return ctx.applyNewValue($event.target.value);
                    })("blur", function NodeEditableDirective_blur_HostBindingHandler($event) {
                        return ctx.applyNewValueByLoosingFocus($event.target.value);
                    })("keyup.esc", function NodeEditableDirective_keyup_esc_HostBindingHandler() {
                        return ctx.cancelEditing();
                    });
                }
            }, inputs: { nodeValue: ["nodeEditable", "nodeValue"] }, outputs: { valueChanged: "valueChanged" } });
        return NodeEditableDirective;
    }();
    exports.NodeEditableDirective = NodeEditableDirective;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeEditableDirective, [{
            type: core_1.Directive,
            args: [{
                selector: '[nodeEditable]'
            }]
        }], function () {
            return [{ type: i0.Renderer2, decorators: [{
                    type: core_1.Inject,
                    args: [core_1.Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: core_1.Inject,
                    args: [core_1.ElementRef]
                }] }];
        }, { nodeValue: [{
                type: core_1.Input,
                args: ['nodeEditable']
            }], valueChanged: [{
                type: core_1.Output
            }], applyNewValue: [{
                type: core_1.HostListener,
                args: ['keyup.enter', ['$event.target.value']]
            }], applyNewValueByLoosingFocus: [{
                type: core_1.HostListener,
                args: ['blur', ['$event.target.value']]
            }], cancelEditing: [{
                type: core_1.HostListener,
                args: ['keyup.esc']
            }] });
    })();

});
$__System.registerDynamic("14", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEscapePressed = exports.isRightButtonClicked = exports.isLeftButtonClicked = exports.MouseButtons = exports.Keys = void 0;
    var Keys;
    (function (Keys) {
        Keys[Keys["Escape"] = 27] = "Escape";
    })(Keys = exports.Keys || (exports.Keys = {}));
    var MouseButtons;
    (function (MouseButtons) {
        MouseButtons[MouseButtons["Left"] = 0] = "Left";
        MouseButtons[MouseButtons["Right"] = 2] = "Right";
    })(MouseButtons = exports.MouseButtons || (exports.MouseButtons = {}));
    function isLeftButtonClicked(e) {
        return e.button === MouseButtons.Left;
    }
    exports.isLeftButtonClicked = isLeftButtonClicked;
    function isRightButtonClicked(e) {
        return e.button === MouseButtons.Right;
    }
    exports.isRightButtonClicked = isRightButtonClicked;
    function isEscapePressed(e) {
        return e.keyCode === Keys.Escape;
    }
    exports.isEscapePressed = isEscapePressed;

});
$__System.registerDynamic("20", ["d", "16", "13", "14", "1d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeMenuComponent = void 0;
    var core_1 = $__require("d");
    var node_menu_service_1 = $__require("16");
    var menu_events_1 = $__require("13");
    var event_utils_1 = $__require("14");
    var i0 = $__require("d");
    var i1 = $__require("16");
    var i2 = $__require("1d");
    var _c0 = ["menuContainer"];
    function NodeMenuComponent_li_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r4 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 4);
            i0.ɵɵlistener("click", function NodeMenuComponent_li_3_Template_li_click_0_listener($event) {
                i0.ɵɵrestoreView(_r4);var menuItem_r2 = ctx.$implicit;var ctx_r3 = i0.ɵɵnextContext();return ctx_r3.onMenuItemSelected($event, menuItem_r2);
            });
            i0.ɵɵelement(1, "div");
            i0.ɵɵelementStart(2, "span", 5);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }if (rf & 2) {
            var menuItem_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("node-menu-item-icon ", menuItem_r2.cssClass, "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(menuItem_r2.name);
        }
    }
    var _c1 = function (a0) {
        return { "visibility": a0 };
    };
    var NodeMenuComponent = /** @class */function () {
        function NodeMenuComponent(renderer, nodeMenuService) {
            this.renderer = renderer;
            this.nodeMenuService = nodeMenuService;
            this.visibility = 'hidden';
            this.menuItemSelected = new core_1.EventEmitter();
            this.availableMenuItems = [{
                name: 'New tag',
                action: menu_events_1.NodeMenuItemAction.NewTag,
                cssClass: 'new-tag'
            }, {
                name: 'New folder',
                action: menu_events_1.NodeMenuItemAction.NewFolder,
                cssClass: 'new-folder'
            }, {
                name: 'Rename',
                action: menu_events_1.NodeMenuItemAction.Rename,
                cssClass: 'rename'
            }, {
                name: 'Remove',
                action: menu_events_1.NodeMenuItemAction.Remove,
                cssClass: 'remove'
            }];
            this.disposersForGlobalListeners = [];
        }
        NodeMenuComponent.prototype.ngOnInit = function () {
            this.availableMenuItems = this.menuItems || this.availableMenuItems;
            this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
            this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
        };
        NodeMenuComponent.prototype.ngAfterViewInit = function () {
            this.displayAboveOrBelow();
        };
        NodeMenuComponent.prototype.ngOnDestroy = function () {
            this.disposersForGlobalListeners.forEach(function (dispose) {
                return dispose();
            });
        };
        NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
            if (event_utils_1.isLeftButtonClicked(e)) {
                this.menuItemSelected.emit({
                    nodeMenuItemAction: selectedMenuItem.action,
                    nodeMenuItemSelected: selectedMenuItem.name
                });
                this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
            }
        };
        NodeMenuComponent.prototype.displayAboveOrBelow = function () {
            var _this = this;
            var menuContainerElem = this.menuContainer.nativeElement;
            var elemBCR = menuContainerElem.getBoundingClientRect();
            var elemTop = elemBCR.top;
            var elemHeight = elemBCR.height;
            var defaultDisplay = menuContainerElem.style.display;
            menuContainerElem.style.display = 'none';
            var scrollContainer = this.getScrollParent(menuContainerElem);
            menuContainerElem.style.display = defaultDisplay;
            var viewportBottom;
            if (scrollContainer) {
                var containerBCR = scrollContainer.getBoundingClientRect();
                var containerBottom = containerBCR.top + containerBCR.height;
                viewportBottom = containerBottom > window.innerHeight ? window.innerHeight : containerBottom;
            } else {
                viewportBottom = window.innerHeight;
            }
            var style = elemTop + elemHeight > viewportBottom ? 'bottom: 0' : 'top: 0';
            menuContainerElem.setAttribute('style', style);
            setTimeout(function () {
                return _this.visibility = 'visible';
            });
        };
        NodeMenuComponent.prototype.getScrollParent = function (node) {
            if (node == null) {
                return null;
            }
            if (node.clientHeight && node.clientHeight < node.scrollHeight) {
                return node;
            } else {
                return this.getScrollParent(node.parentElement);
            }
        };
        NodeMenuComponent.prototype.closeMenu = function (e) {
            var mouseClicked = e instanceof MouseEvent;
            // Check if the click is fired on an element inside a menu
            var containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
            if (mouseClicked && !containingTarget || event_utils_1.isEscapePressed(e)) {
                this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
            }
        };
        NodeMenuComponent.ɵfac = function NodeMenuComponent_Factory(t) {
            return new (t || NodeMenuComponent)(i0.ɵɵdirectiveInject(core_1.Renderer2), i0.ɵɵdirectiveInject(node_menu_service_1.NodeMenuService));
        };
        NodeMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NodeMenuComponent, selectors: [["node-menu"]], viewQuery: function NodeMenuComponent_Query(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵviewQuery(_c0, 1);
                }if (rf & 2) {
                    var _t = void 0;
                    i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContainer = _t.first);
                }
            }, inputs: { menuItems: "menuItems" }, outputs: { menuItemSelected: "menuItemSelected" }, decls: 4, vars: 4, consts: [[1, "node-menu", 3, "ngStyle"], [1, "node-menu-content"], ["menuContainer", ""], ["class", "node-menu-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "node-menu-item", 3, "click"], [1, "node-menu-item-value"]], template: function NodeMenuComponent_Template(rf, ctx) {
                if (rf & 1) {
                    i0.ɵɵelementStart(0, "div", 0);
                    i0.ɵɵelementStart(1, "ul", 1, 2);
                    i0.ɵɵtemplate(3, NodeMenuComponent_li_3_Template, 4, 4, "li", 3);
                    i0.ɵɵelementEnd();
                    i0.ɵɵelementEnd();
                }if (rf & 2) {
                    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c1, ctx.visibility));
                    i0.ɵɵadvance(3);
                    i0.ɵɵproperty("ngForOf", ctx.availableMenuItems);
                }
            }, directives: [i2.NgStyle, i2.NgForOf], encapsulation: 2 });
        return NodeMenuComponent;
    }();
    exports.NodeMenuComponent = NodeMenuComponent;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuComponent, [{
            type: core_1.Component,
            args: [{
                selector: 'node-menu',
                template: "\n    <div class=\"node-menu\"  [ngStyle]=\"{'visibility': visibility}\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
            }]
        }], function () {
            return [{ type: i0.Renderer2, decorators: [{
                    type: core_1.Inject,
                    args: [core_1.Renderer2]
                }] }, { type: i1.NodeMenuService, decorators: [{
                    type: core_1.Inject,
                    args: [node_menu_service_1.NodeMenuService]
                }] }];
        }, { menuItemSelected: [{
                type: core_1.Output
            }], menuItems: [{
                type: core_1.Input
            }], menuContainer: [{
                type: core_1.ViewChild,
                args: ['menuContainer']
            }] });
    })();

});
$__System.registerDynamic("13", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeMenuAction = exports.NodeMenuItemAction = void 0;
    var NodeMenuItemAction;
    (function (NodeMenuItemAction) {
        NodeMenuItemAction[NodeMenuItemAction["NewFolder"] = 0] = "NewFolder";
        NodeMenuItemAction[NodeMenuItemAction["NewTag"] = 1] = "NewTag";
        NodeMenuItemAction[NodeMenuItemAction["Rename"] = 2] = "Rename";
        NodeMenuItemAction[NodeMenuItemAction["Remove"] = 3] = "Remove";
        NodeMenuItemAction[NodeMenuItemAction["Custom"] = 4] = "Custom";
    })(NodeMenuItemAction = exports.NodeMenuItemAction || (exports.NodeMenuItemAction = {}));
    var NodeMenuAction;
    (function (NodeMenuAction) {
        NodeMenuAction[NodeMenuAction["Close"] = 0] = "Close";
    })(NodeMenuAction = exports.NodeMenuAction || (exports.NodeMenuAction = {}));

});
$__System.registerDynamic("16", ["d", "1b", "1c", "13"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeMenuService = void 0;
    var core_1 = $__require("d");
    var rxjs_1 = $__require("1b");
    var operators_1 = $__require("1c");
    var menu_events_1 = $__require("13");
    var i0 = $__require("d");
    var NodeMenuService = /** @class */function () {
        function NodeMenuService() {
            this.nodeMenuEvents$ = new rxjs_1.Subject();
        }
        NodeMenuService.prototype.fireMenuEvent = function (sender, action) {
            var nodeMenuEvent = { sender: sender, action: action };
            this.nodeMenuEvents$.next(nodeMenuEvent);
        };
        NodeMenuService.prototype.hideMenuStream = function (treeElementRef) {
            return this.nodeMenuEvents$.pipe(operators_1.filter(function (e) {
                return treeElementRef.nativeElement !== e.sender;
            }), operators_1.filter(function (e) {
                return e.action === menu_events_1.NodeMenuAction.Close;
            }));
        };
        NodeMenuService.prototype.hideMenuForAllNodesExcept = function (treeElementRef) {
            this.nodeMenuEvents$.next({
                sender: treeElementRef.nativeElement,
                action: menu_events_1.NodeMenuAction.Close
            });
        };
        NodeMenuService.ɵfac = function NodeMenuService_Factory(t) {
            return new (t || NodeMenuService)();
        };
        NodeMenuService.ɵprov = i0.ɵɵdefineInjectable({ token: NodeMenuService, factory: NodeMenuService.ɵfac });
        return NodeMenuService;
    }();
    exports.NodeMenuService = NodeMenuService;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuService, [{
            type: core_1.Injectable
        }], null, null);
    })();

});
$__System.registerDynamic("2c", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                d.__proto__ = b;
            } || function (d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRenameInputChangeEvent = exports.NodeRenameKeydownEvent = exports.NodeIndeterminateEvent = exports.NodeUncheckedEvent = exports.NodeCheckedEvent = exports.LoadNextLevelEvent = exports.MenuItemSelectedEvent = exports.NodeCollapsedEvent = exports.NodeExpandedEvent = exports.NodeRenamedEvent = exports.NodeCreatedEvent = exports.NodeRemovedEvent = exports.NodeMovedEvent = exports.NodeDestructiveEvent = exports.NodeUnselectedEvent = exports.NodeSelectedEvent = exports.NodeDoubleClickedEvent = exports.NodeEvent = void 0;
    var NodeEvent = /** @class */function () {
        function NodeEvent(node) {
            this.node = node;
        }
        return NodeEvent;
    }();
    exports.NodeEvent = NodeEvent;
    var NodeDoubleClickedEvent = /** @class */function (_super) {
        __extends(NodeDoubleClickedEvent, _super);
        function NodeDoubleClickedEvent(node, e) {
            var _this = _super.call(this, node) || this;
            _this.e = e;
            return _this;
        }
        return NodeDoubleClickedEvent;
    }(NodeEvent);
    exports.NodeDoubleClickedEvent = NodeDoubleClickedEvent;
    var NodeSelectedEvent = /** @class */function (_super) {
        __extends(NodeSelectedEvent, _super);
        function NodeSelectedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeSelectedEvent;
    }(NodeEvent);
    exports.NodeSelectedEvent = NodeSelectedEvent;
    var NodeUnselectedEvent = /** @class */function (_super) {
        __extends(NodeUnselectedEvent, _super);
        function NodeUnselectedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeUnselectedEvent;
    }(NodeEvent);
    exports.NodeUnselectedEvent = NodeUnselectedEvent;
    var NodeDestructiveEvent = /** @class */function (_super) {
        __extends(NodeDestructiveEvent, _super);
        function NodeDestructiveEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeDestructiveEvent;
    }(NodeEvent);
    exports.NodeDestructiveEvent = NodeDestructiveEvent;
    var NodeMovedEvent = /** @class */function (_super) {
        __extends(NodeMovedEvent, _super);
        function NodeMovedEvent(node, previousParent, previousPosition) {
            var _this = _super.call(this, node) || this;
            _this.previousParent = previousParent;
            _this.previousPosition = previousPosition;
            return _this;
        }
        return NodeMovedEvent;
    }(NodeDestructiveEvent);
    exports.NodeMovedEvent = NodeMovedEvent;
    var NodeRemovedEvent = /** @class */function (_super) {
        __extends(NodeRemovedEvent, _super);
        function NodeRemovedEvent(node, lastIndex) {
            var _this = _super.call(this, node) || this;
            _this.lastIndex = lastIndex;
            return _this;
        }
        return NodeRemovedEvent;
    }(NodeDestructiveEvent);
    exports.NodeRemovedEvent = NodeRemovedEvent;
    var NodeCreatedEvent = /** @class */function (_super) {
        __extends(NodeCreatedEvent, _super);
        function NodeCreatedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeCreatedEvent;
    }(NodeDestructiveEvent);
    exports.NodeCreatedEvent = NodeCreatedEvent;
    var NodeRenamedEvent = /** @class */function (_super) {
        __extends(NodeRenamedEvent, _super);
        function NodeRenamedEvent(node, oldValue, newValue) {
            var _this = _super.call(this, node) || this;
            _this.oldValue = oldValue;
            _this.newValue = newValue;
            return _this;
        }
        return NodeRenamedEvent;
    }(NodeDestructiveEvent);
    exports.NodeRenamedEvent = NodeRenamedEvent;
    var NodeExpandedEvent = /** @class */function (_super) {
        __extends(NodeExpandedEvent, _super);
        function NodeExpandedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeExpandedEvent;
    }(NodeEvent);
    exports.NodeExpandedEvent = NodeExpandedEvent;
    var NodeCollapsedEvent = /** @class */function (_super) {
        __extends(NodeCollapsedEvent, _super);
        function NodeCollapsedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeCollapsedEvent;
    }(NodeEvent);
    exports.NodeCollapsedEvent = NodeCollapsedEvent;
    var MenuItemSelectedEvent = /** @class */function (_super) {
        __extends(MenuItemSelectedEvent, _super);
        function MenuItemSelectedEvent(node, selectedItem) {
            var _this = _super.call(this, node) || this;
            _this.selectedItem = selectedItem;
            return _this;
        }
        return MenuItemSelectedEvent;
    }(NodeEvent);
    exports.MenuItemSelectedEvent = MenuItemSelectedEvent;
    var LoadNextLevelEvent = /** @class */function (_super) {
        __extends(LoadNextLevelEvent, _super);
        function LoadNextLevelEvent(node) {
            return _super.call(this, node) || this;
        }
        return LoadNextLevelEvent;
    }(NodeEvent);
    exports.LoadNextLevelEvent = LoadNextLevelEvent;
    var NodeCheckedEvent = /** @class */function (_super) {
        __extends(NodeCheckedEvent, _super);
        function NodeCheckedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeCheckedEvent;
    }(NodeEvent);
    exports.NodeCheckedEvent = NodeCheckedEvent;
    var NodeUncheckedEvent = /** @class */function (_super) {
        __extends(NodeUncheckedEvent, _super);
        function NodeUncheckedEvent(node) {
            return _super.call(this, node) || this;
        }
        return NodeUncheckedEvent;
    }(NodeEvent);
    exports.NodeUncheckedEvent = NodeUncheckedEvent;
    var NodeIndeterminateEvent = /** @class */function (_super) {
        __extends(NodeIndeterminateEvent, _super);
        function NodeIndeterminateEvent(node, indeterminate) {
            var _this = _super.call(this, node) || this;
            _this.indeterminate = indeterminate;
            return _this;
        }
        return NodeIndeterminateEvent;
    }(NodeEvent);
    exports.NodeIndeterminateEvent = NodeIndeterminateEvent;
    var NodeRenameKeydownEvent = /** @class */function (_super) {
        __extends(NodeRenameKeydownEvent, _super);
        function NodeRenameKeydownEvent(node, domEvent) {
            var _this = _super.call(this, node) || this;
            _this.domEvent = domEvent;
            return _this;
        }
        return NodeRenameKeydownEvent;
    }(NodeEvent);
    exports.NodeRenameKeydownEvent = NodeRenameKeydownEvent;
    var NodeRenameInputChangeEvent = /** @class */function (_super) {
        __extends(NodeRenameInputChangeEvent, _super);
        function NodeRenameInputChangeEvent(node, domEvent) {
            var _this = _super.call(this, node) || this;
            _this.domEvent = domEvent;
            return _this;
        }
        return NodeRenameInputChangeEvent;
    }(NodeEvent);
    exports.NodeRenameInputChangeEvent = NodeRenameInputChangeEvent;

});
$__System.registerDynamic("18", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeDragStartEvent = exports.NodeDraggableEvent = exports.DropPosition = void 0;
    var DropPosition;
    (function (DropPosition) {
        DropPosition[DropPosition["Above"] = 0] = "Above";
        DropPosition[DropPosition["Into"] = 1] = "Into";
        DropPosition[DropPosition["Below"] = 2] = "Below";
    })(DropPosition = exports.DropPosition || (exports.DropPosition = {}));
    var NodeDraggableEvent = /** @class */function () {
        function NodeDraggableEvent(captured, target, position) {
            this.captured = captured;
            this.target = target;
            this.position = position;
        }
        return NodeDraggableEvent;
    }();
    exports.NodeDraggableEvent = NodeDraggableEvent;
    var NodeDragStartEvent = /** @class */function () {
        function NodeDragStartEvent(captured, target) {
            this.captured = captured;
            this.target = target;
        }
        return NodeDragStartEvent;
    }();
    exports.NodeDragStartEvent = NodeDragStartEvent;

});
$__System.registerDynamic("19", ["d", "1b", "18"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeDraggableService = void 0;
    var core_1 = $__require("d");
    var rxjs_1 = $__require("1b");
    var draggable_events_1 = $__require("18");
    var i0 = $__require("d");
    var NodeDraggableService = /** @class */function () {
        function NodeDraggableService() {
            this.draggableNodeEvents$ = new rxjs_1.Subject();
            this.nodeDragStartEvents$ = new rxjs_1.Subject();
            this.checkedNodes = [];
        }
        NodeDraggableService.prototype.fireNodeDragged = function (captured, target, position) {
            if (captured.length === 0 || captured.every(function (cn) {
                return !cn.tree || cn.tree.isStatic();
            })) {
                return;
            }
            this.draggableNodeEvents$.next(new draggable_events_1.NodeDraggableEvent(captured, target, position));
        };
        NodeDraggableService.prototype.fireNodeDragStart = function (captured, target) {
            if (captured.length === 0 || captured.every(function (cn) {
                return !cn.tree || cn.tree.isStatic();
            })) {
                return;
            }
            this.nodeDragStartEvents$.next(new draggable_events_1.NodeDragStartEvent(captured, target));
        };
        NodeDraggableService.prototype.addCheckedNode = function (node) {
            this.checkedNodes.push(node);
        };
        NodeDraggableService.prototype.setDraggedNode = function (node) {
            this.draggedNode = node;
        };
        NodeDraggableService.prototype.removeCheckedNode = function (node) {
            var i = this.checkedNodes.indexOf(node);
            if (i > -1) {
                this.checkedNodes.splice(i, 1);
            }
        };
        NodeDraggableService.prototype.removeCheckedNodeById = function (id) {
            var i = this.checkedNodes.findIndex(function (cn) {
                return cn.tree.id === id;
            });
            if (i > -1) {
                this.checkedNodes.splice(i, 1);
            }
        };
        NodeDraggableService.prototype.getCheckedNodes = function () {
            return this.checkedNodes;
        };
        NodeDraggableService.prototype.getDraggedNode = function () {
            return this.draggedNode;
        };
        NodeDraggableService.prototype.releaseCheckedNodes = function () {
            this.checkedNodes = [];
        };
        NodeDraggableService.prototype.releaseDraggedNode = function () {
            this.draggedNode = null;
        };
        NodeDraggableService.ɵfac = function NodeDraggableService_Factory(t) {
            return new (t || NodeDraggableService)();
        };
        NodeDraggableService.ɵprov = i0.ɵɵdefineInjectable({ token: NodeDraggableService, factory: NodeDraggableService.ɵfac });
        return NodeDraggableService;
    }();
    exports.NodeDraggableService = NodeDraggableService;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableService, [{
            type: core_1.Injectable
        }], null, null);
    })();

});
$__System.registerDynamic("15", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNil = exports.includes = exports.defaultsDeep = exports.once = exports.size = exports.omit = exports.get = exports.isFunction = exports.has = exports.trim = exports.isEmpty = void 0;
    function isEmpty(value) {
        if (typeof value === 'string') {
            return !/\S/.test(value);
        }
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return isNil(value);
    }
    exports.isEmpty = isEmpty;
    function trim(value) {
        return isNil(value) ? '' : value.trim();
    }
    exports.trim = trim;
    function has(value, prop) {
        return value && typeof value === 'object' && value.hasOwnProperty(prop);
    }
    exports.has = has;
    function isFunction(value) {
        return typeof value === 'function';
    }
    exports.isFunction = isFunction;
    function get(value, path, defaultValue) {
        var result = value;
        for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (!result || !Reflect.has(result, prop)) {
                return defaultValue;
            }
            result = result[prop];
        }
        return isNil(result) || result === value ? defaultValue : result;
    }
    exports.get = get;
    function omit(value, propsToSkip) {
        if (!value) {
            return value;
        }
        var normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;
        return Object.keys(value).reduce(function (result, prop) {
            var _a;
            if (includes(normalizedPropsToSkip, prop)) {
                return result;
            }
            return Object.assign(result, (_a = {}, _a[prop] = value[prop], _a));
        }, {});
    }
    exports.omit = omit;
    function size(value) {
        return isEmpty(value) ? 0 : value.length;
    }
    exports.size = size;
    function once(fn) {
        var result;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (fn) {
                result = fn.apply(null, args);
                fn = null;
            }
            return result;
        };
    }
    exports.once = once;
    function defaultsDeep(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        return [target].concat(sources).reduce(function (result, source) {
            if (!source) {
                return result;
            }
            Object.keys(source).forEach(function (prop) {
                if (isNil(result[prop])) {
                    result[prop] = source[prop];
                    return;
                }
                if (typeof result[prop] === 'object' && !Array.isArray(result[prop])) {
                    result[prop] = defaultsDeep(result[prop], source[prop]);
                    return;
                }
            });
            return result;
        }, {});
    }
    exports.defaultsDeep = defaultsDeep;
    function includes(target, value) {
        if (isNil(target)) {
            return false;
        }
        var index = typeof target === 'string' ? target.indexOf(value) : target.indexOf(value);
        return index > -1;
    }
    exports.includes = includes;
    function isNil(value) {
        return value === undefined || value === null;
    }
    exports.isNil = isNil;

});
$__System.registerDynamic("e", ["2c", "d", "19", "15", "1b", "1c"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeService = void 0;
    var tree_events_1 = $__require("2c");
    var core_1 = $__require("d");
    var node_draggable_service_1 = $__require("19");
    var fn_utils_1 = $__require("15");
    var rxjs_1 = $__require("1b");
    var operators_1 = $__require("1c");
    var i0 = $__require("d");
    var i1 = $__require("19");
    var TreeService = /** @class */function () {
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
            this.nodeRemoved$.subscribe(function (e) {
                return e.node.removeItselfFromParent();
            });
            this.nodeDraggableService.nodeDragStartEvents$.subscribe(function (e) {
                _this.nodeMoveStarted$.next(e);
            });
        }
        TreeService.prototype.unselectStream = function (tree) {
            return this.nodeSelected$.pipe(operators_1.filter(function (e) {
                return tree !== e.node;
            }));
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
            } else if (tree.isNodeCollapsed()) {
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
            return this.nodeDraggableService.draggableNodeEvents$.pipe(operators_1.filter(function (e) {
                return e.target === element;
            }), operators_1.filter(function (e) {
                return !e.captured.some(function (cn) {
                    return cn.tree.hasChild(tree);
                });
            }));
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
            var shouldLoadNextLevel = tree.node.emitLoadNextLevel && !tree.node.loadChildren && !tree.childrenAreBeingLoaded() && fn_utils_1.isEmpty(tree.children);
            if (shouldLoadNextLevel) {
                tree.loadingChildrenRequested();
            }
            return shouldLoadNextLevel;
        };
        TreeService.ɵfac = function TreeService_Factory(t) {
            return new (t || TreeService)(i0.ɵɵinject(node_draggable_service_1.NodeDraggableService));
        };
        TreeService.ɵprov = i0.ɵɵdefineInjectable({ token: TreeService, factory: TreeService.ɵfac });
        return TreeService;
    }();
    exports.TreeService = TreeService;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeService, [{
            type: core_1.Injectable
        }], function () {
            return [{ type: i1.NodeDraggableService, decorators: [{
                    type: core_1.Inject,
                    args: [node_draggable_service_1.NodeDraggableService]
                }] }];
        }, null);
    })();

});
$__System.registerDynamic("21", ["d", "2d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeHtmlPipe = void 0;
    var core_1 = $__require("d");
    var platform_browser_1 = $__require("2d");
    var i0 = $__require("d");
    var i1 = $__require("2d");
    var SafeHtmlPipe = /** @class */function () {
        function SafeHtmlPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        SafeHtmlPipe.prototype.transform = function (value) {
            // return value;
            return this.sanitizer.bypassSecurityTrustHtml(value);
        };
        SafeHtmlPipe.ɵfac = function SafeHtmlPipe_Factory(t) {
            return new (t || SafeHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer));
        };
        SafeHtmlPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "safeHtml", type: SafeHtmlPipe, pure: true });
        return SafeHtmlPipe;
    }();
    exports.SafeHtmlPipe = SafeHtmlPipe;
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SafeHtmlPipe, [{
            type: core_1.Pipe,
            args: [{ name: 'safeHtml' }]
        }], function () {
            return [{ type: i1.DomSanitizer }];
        }, null);
    })();

});
$__System.registerDynamic("2e", ["b", "d", "c", "11", "1e", "19", "1f", "20", "16", "e", "21", "1d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeModule = void 0;
    $__require("b");
    var core_1 = $__require("d");
    var tree_component_1 = $__require("c");
    var tree_internal_component_1 = $__require("11");
    var node_draggable_directive_1 = $__require("1e");
    var node_draggable_service_1 = $__require("19");
    var node_editable_directive_1 = $__require("1f");
    var node_menu_component_1 = $__require("20");
    var node_menu_service_1 = $__require("16");
    var tree_service_1 = $__require("e");
    var safe_html_pipe_1 = $__require("21");
    var common_1 = $__require("1d");
    var i0 = $__require("d");
    var TreeModule = /** @class */function () {
        function TreeModule() {}
        TreeModule.ɵfac = function TreeModule_Factory(t) {
            return new (t || TreeModule)();
        };
        TreeModule.ɵmod = i0.ɵɵdefineNgModule({ type: TreeModule });
        TreeModule.ɵinj = i0.ɵɵdefineInjector({ providers: [node_draggable_service_1.NodeDraggableService, node_menu_service_1.NodeMenuService, tree_service_1.TreeService], imports: [[common_1.CommonModule]] });
        return TreeModule;
    }();
    exports.TreeModule = TreeModule;
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TreeModule, { declarations: [node_draggable_directive_1.NodeDraggableDirective, tree_component_1.TreeComponent, node_editable_directive_1.NodeEditableDirective, node_menu_component_1.NodeMenuComponent, tree_internal_component_1.TreeInternalComponent, safe_html_pipe_1.SafeHtmlPipe], imports: [common_1.CommonModule], exports: [tree_component_1.TreeComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeModule, [{
            type: core_1.NgModule,
            args: [{
                imports: [common_1.CommonModule],
                declarations: [node_draggable_directive_1.NodeDraggableDirective, tree_component_1.TreeComponent, node_editable_directive_1.NodeEditableDirective, node_menu_component_1.NodeMenuComponent, tree_internal_component_1.TreeInternalComponent, safe_html_pipe_1.SafeHtmlPipe],
                exports: [tree_component_1.TreeComponent],
                providers: [node_draggable_service_1.NodeDraggableService, node_menu_service_1.NodeMenuService, tree_service_1.TreeService]
            }]
        }], null, null);
    })();

});
$__System.registerDynamic("a", ["f", "10", "13", "2c", "18", "c", "12", "2e"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeController = exports.MenuItemSelectedEvent = exports.NodeMenuItemAction = exports.TreeModule = exports.TreeComponent = exports.NodeDraggableEvent = exports.NodeDragStartEvent = exports.NodeUnselectedEvent = exports.NodeRenameInputChangeEvent = exports.NodeRenameKeydownEvent = exports.NodeIndeterminateEvent = exports.NodeCheckedEvent = exports.NodeUncheckedEvent = exports.NodeDestructiveEvent = exports.NodeCollapsedEvent = exports.NodeExpandedEvent = exports.NodeSelectedEvent = exports.NodeMovedEvent = exports.NodeRenamedEvent = exports.NodeRemovedEvent = exports.NodeDoubleClickedEvent = exports.NodeCreatedEvent = exports.NodeEvent = exports.FoldingType = exports.Ng2TreeSettings = exports.TreeModelSettings = exports.Tree = void 0;
  var tree_types_1 = $__require("f");
  Object.defineProperty(exports, "TreeModelSettings", { enumerable: true, get: function () {
      return tree_types_1.TreeModelSettings;
    } });
  Object.defineProperty(exports, "Ng2TreeSettings", { enumerable: true, get: function () {
      return tree_types_1.Ng2TreeSettings;
    } });
  Object.defineProperty(exports, "FoldingType", { enumerable: true, get: function () {
      return tree_types_1.FoldingType;
    } });
  var tree_1 = $__require("10");
  Object.defineProperty(exports, "Tree", { enumerable: true, get: function () {
      return tree_1.Tree;
    } });
  var menu_events_1 = $__require("13");
  Object.defineProperty(exports, "NodeMenuItemAction", { enumerable: true, get: function () {
      return menu_events_1.NodeMenuItemAction;
    } });
  var tree_events_1 = $__require("2c");
  Object.defineProperty(exports, "NodeEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeEvent;
    } });
  Object.defineProperty(exports, "NodeCreatedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeCreatedEvent;
    } });
  Object.defineProperty(exports, "NodeDoubleClickedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeDoubleClickedEvent;
    } });
  Object.defineProperty(exports, "NodeRemovedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeRemovedEvent;
    } });
  Object.defineProperty(exports, "NodeRenamedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeRenamedEvent;
    } });
  Object.defineProperty(exports, "NodeMovedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeMovedEvent;
    } });
  Object.defineProperty(exports, "NodeSelectedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeSelectedEvent;
    } });
  Object.defineProperty(exports, "NodeExpandedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeExpandedEvent;
    } });
  Object.defineProperty(exports, "NodeCollapsedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeCollapsedEvent;
    } });
  Object.defineProperty(exports, "MenuItemSelectedEvent", { enumerable: true, get: function () {
      return tree_events_1.MenuItemSelectedEvent;
    } });
  Object.defineProperty(exports, "NodeDestructiveEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeDestructiveEvent;
    } });
  Object.defineProperty(exports, "NodeUncheckedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeUncheckedEvent;
    } });
  Object.defineProperty(exports, "NodeCheckedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeCheckedEvent;
    } });
  Object.defineProperty(exports, "NodeIndeterminateEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeIndeterminateEvent;
    } });
  Object.defineProperty(exports, "NodeUnselectedEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeUnselectedEvent;
    } });
  Object.defineProperty(exports, "NodeRenameKeydownEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeRenameKeydownEvent;
    } });
  Object.defineProperty(exports, "NodeRenameInputChangeEvent", { enumerable: true, get: function () {
      return tree_events_1.NodeRenameInputChangeEvent;
    } });
  var draggable_events_1 = $__require("18");
  Object.defineProperty(exports, "NodeDragStartEvent", { enumerable: true, get: function () {
      return draggable_events_1.NodeDragStartEvent;
    } });
  Object.defineProperty(exports, "NodeDraggableEvent", { enumerable: true, get: function () {
      return draggable_events_1.NodeDraggableEvent;
    } });
  var tree_component_1 = $__require("c");
  Object.defineProperty(exports, "TreeComponent", { enumerable: true, get: function () {
      return tree_component_1.TreeComponent;
    } });
  var tree_controller_1 = $__require("12");
  Object.defineProperty(exports, "TreeController", { enumerable: true, get: function () {
      return tree_controller_1.TreeController;
    } });
  var tree_module_1 = $__require("2e");
  Object.defineProperty(exports, "TreeModule", { enumerable: true, get: function () {
      return tree_module_1.TreeModule;
    } });

});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/common","@angular/core","@angular/platform-browser","rxjs","rxjs/operators"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ng2-tree.umd.js.map