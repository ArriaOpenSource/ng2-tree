import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import * as TreeTypes from './tree.types';
import { Ng2TreeSettings } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeMenuItemAction, NodeMenuItemSelectedEvent } from './menu/menu.events';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.events';
import { NodeCheckedEvent, NodeEvent } from './tree.events';
import { TreeService } from './tree.service';
import * as EventUtils from './utils/event.utils';
import { NodeDraggableEvent, DropPosition } from './draggable/draggable.events';
import { Subscription } from 'rxjs/Subscription';
import { get, isNil } from './utils/fn.utils';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { CapturedNode } from './draggable/captured-node';

@Component({
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
          (dblClick)="onNodeDoubleClicked()"
          (click)="onNodeSelected($event)">
            <div *ngIf="tree.nodeTemplate" class="node-template" [innerHTML]="tree.nodeTemplate | safeHtml"></div>
            <span *ngIf="!template" class="node-name" [innerHTML]="tree.value | safeHtml"></span>
            <span class="loading-children" *ngIf="tree.childrenAreBeingLoaded()"></span>
            <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ $implicit: tree.node }"></ng-template>
        </div>

        <input type="text" class="node-value"
           *ngIf="shouldShowInputForTreeValue()"
           [nodeEditable]="tree.value"
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
})
export class TreeInternalComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() public tree: Tree;

  @Input() public settings: TreeTypes.Ng2TreeSettings;

  @Input() public template: TemplateRef<any>;

  public isSelected = false;
  public isRightMenuVisible = false;
  public isLeftMenuVisible = false;
  public isReadOnly = false;
  public controller: TreeController;

  @ViewChild('checkbox') public checkboxElementRef: ElementRef;

  private subscriptions: Subscription[] = [];

  public constructor(
    private nodeMenuService: NodeMenuService,
    public treeService: TreeService,
    public nodeDraggableService: NodeDraggableService,
    public nodeElementRef: ElementRef
  ) {}

  public ngAfterViewInit(): void {
    if (this.tree.checked && !(this.tree as any).firstCheckedFired) {
      (this.tree as any).firstCheckedFired = true;
      this.treeService.fireNodeChecked(this.tree);
    }
  }

  public ngOnInit(): void {
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

    this.subscriptions.push(
      this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(() => {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
      })
    );

    this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(() => (this.isSelected = false)));

    this.subscriptions.push(
      this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe((e: NodeDraggableEvent) => {
        // Remove child nodes if parent is being moved (child nodes will move with the parent)
        const nodesToMove = e.captured.filter(cn => !cn.tree.parent.checked);

        let i = nodesToMove.length;
        while (i--) {
          const node = nodesToMove[i];
          const ctrl = this.treeService.getController(node.tree.id);
          if (ctrl.isChecked()) {
            ctrl.uncheck();
          }

          if (this.tree.isBranch() && e.position === DropPosition.Into) {
            this.moveNodeToThisTreeAndRemoveFromPreviousOne(node.tree, this.tree);
          } else if (this.tree.hasSibling(node.tree)) {
            this.moveSibling(node.tree, this.tree, e.position);
          } else {
            this.moveNodeToParentTreeAndRemoveFromPreviousOne(node.tree, this.tree, e.position);
          }
        }
        const parentCtrl = this.treeService.getController(this.tree.parent.id);
        if (parentCtrl) {
          parentCtrl.updateCheckboxState();
        }
      })
    );

    this.subscriptions.push(
      this.treeService.nodeChecked$
        .merge(this.treeService.nodeUnchecked$)
        .filter((e: NodeCheckedEvent) => this.eventContainsId(e) && this.tree.hasChild(e.node))
        .subscribe((e: NodeCheckedEvent) => this.updateCheckboxState())
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.controller = new TreeController(this);
  }

  public ngOnDestroy(): void {
    if (get(this.tree, 'node.id', '') && !(this.tree.parent && this.tree.parent.children.indexOf(this.tree) > -1)) {
      this.treeService.deleteController(this.tree.node.id);
    }

    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }

  private moveSibling(sibling: Tree, tree: Tree, position: DropPosition): void {
    const previousPositionInParent = sibling.positionInParent;
    if (position === DropPosition.Above) {
      tree.moveSiblingAbove(sibling);
    } else {
      tree.moveSiblingBelow(sibling);
    }
    this.treeService.fireNodeMoved(sibling, sibling.parent, previousPositionInParent);
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(capturedTree: Tree, moveToTree: Tree): void {
    capturedTree.removeItselfFromParent();
    setTimeout(() => {
      const addedChild = moveToTree.addChild(capturedTree);
      this.treeService.fireNodeMoved(addedChild, capturedTree.parent);
    });
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(
    capturedTree: Tree,
    moveToTree: Tree,
    position: DropPosition
  ): void {
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

  public onNodeDoubleClicked(): void {
    if (!this.tree.selectionAllowed) {
      return;
    }

    this.treeService.fireNodeDoubleClicked(this.tree);
  }

  public onNodeSelected(e: { button: number }): void {
    if (!this.tree.selectionAllowed) {
      return;
    }

    if (EventUtils.isLeftButtonClicked(e as MouseEvent)) {
      this.isSelected = true;
      this.treeService.fireNodeSelected(this.tree);
    }
  }

  public onNodeUnselected(e: { button: number }): void {
    if (!this.tree.selectionAllowed) {
      return;
    }

    if (EventUtils.isLeftButtonClicked(e as MouseEvent)) {
      this.isSelected = false;
      this.treeService.fireNodeUnselected(this.tree);
    }
  }

  public showRightMenu(e: MouseEvent): void {
    if (!this.tree.hasRightMenu()) {
      return;
    }

    if (EventUtils.isRightButtonClicked(e)) {
      this.isRightMenuVisible = !this.isRightMenuVisible;
      this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
    }
    e.preventDefault();
  }

  public showLeftMenu(e: MouseEvent): void {
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

  public onMenuItemSelected(e: NodeMenuItemSelectedEvent): void {
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

  private onNewSelected(e: NodeMenuItemSelectedEvent): void {
    this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
    this.isRightMenuVisible = false;
    this.isLeftMenuVisible = false;
  }

  private onRenameSelected(): void {
    this.tree.markAsBeingRenamed();
    this.isRightMenuVisible = false;
    this.isLeftMenuVisible = false;
  }

  private onRemoveSelected(): void {
    this.treeService.deleteController(get(this.tree, 'node.id', ''));
    this.treeService.fireNodeRemoved(this.tree);
  }

  private onCustomSelected(): void {
    this.isRightMenuVisible = false;
    this.isLeftMenuVisible = false;
  }

  public onSwitchFoldingType(): void {
    this.tree.switchFoldingType();
    this.treeService.fireNodeSwitchFoldingType(this.tree);
  }

  public applyNewValue(e: NodeEditableEvent): void {
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

  public shouldShowInputForTreeValue(): boolean {
    return this.tree.isNew() || this.tree.isBeingRenamed();
  }

  public isRootHidden(): boolean {
    return this.tree.isRoot() && !this.settings.rootIsVisible;
  }

  public hasCustomMenu(): boolean {
    return this.tree.hasCustomMenu();
  }

  public switchNodeCheckStatus() {
    if (!this.tree.checked) {
      this.onNodeChecked();
    } else {
      this.onNodeUnchecked();
    }
  }

  public onNodeChecked(ignoreChildren: boolean = false): void {
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

  public onNodeUnchecked(ignoreChildren: boolean = false): void {
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

  public onNodeIndeterminate(indeterminate: boolean): void {
    if (!this.checkboxElementRef || this.checkboxElementRef.nativeElement.indeterminate === indeterminate) {
      return;
    }

    this.checkboxElementRef.nativeElement.indeterminate = indeterminate;
    this.treeService.fireNodeIndeterminate(this.tree, indeterminate);
  }

  private executeOnChildController(executor: (controller: TreeController) => void) {
    if (this.tree.hasLoadedChildren()) {
      this.tree.children.forEach((child: Tree) => {
        const controller = this.treeService.getController(child.id);
        if (!isNil(controller)) {
          executor(controller);
        }
      });
    }
  }

  updateCheckboxState(): void {
    // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
    setTimeout(() => {
      const checkedChildrenAmount = this.tree.checkedChildrenAmount();
      if (checkedChildrenAmount === 0) {
        this.onNodeUnchecked(true);
        this.onNodeIndeterminate(false);
      } else if (checkedChildrenAmount === this.tree.loadedChildrenAmount()) {
        if (!this.settings.ignoreParentOnCheck) {
          this.onNodeChecked(true);
          this.onNodeIndeterminate(false);
        } else if (!this.tree.checked) {
          this.onNodeIndeterminate(true);
        }
      } else {
        this.onNodeUnchecked(true);
        this.onNodeIndeterminate(true);
      }
    });
  }

  private eventContainsId(event: NodeEvent): boolean {
    if (!event.node.id) {
      console.warn(
        '"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.'
      );
      return false;
    }
    return true;
  }
}
