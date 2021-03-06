import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TreeService } from './tree.service';
import * as TreeTypes from './tree.types';

import {
  MenuItemSelectedEvent,
  NodeCheckedEvent,
  NodeEvent,
  NodeUncheckedEvent,
  NodeDoubleClickedEvent,
  NodeRenameKeydownEvent,
  NodeRenameInputChangeEvent
} from './tree.events';

import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { Subscription } from 'rxjs/Subscription';
import { NodeDragStartEvent } from './draggable/draggable.events';

@Component({
  selector: 'tree',
  template: `<tree-internal #rootComponent [tree]="tree" [settings]="settings" [template]="template"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit, OnChanges, OnDestroy {
  private static EMPTY_TREE: Tree = new Tree({ value: '' });

  /* tslint:disable-next-line:no-input-rename */
  @Input('tree') public treeModel: TreeTypes.TreeModel;
  @Input() public settings: TreeTypes.Ng2TreeSettings;

  @Output() public nodeCreated: EventEmitter<any> = new EventEmitter();
  @Output() public nodeRemoved: EventEmitter<any> = new EventEmitter();
  @Output() public nodeRenamed: EventEmitter<any> = new EventEmitter();
  @Output() public nodeDoubleClicked: EventEmitter<NodeDoubleClickedEvent> = new EventEmitter();
  @Output() public nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() public nodeUnselected: EventEmitter<any> = new EventEmitter();
  @Output() public nodeDragStarted: EventEmitter<NodeDragStartEvent> = new EventEmitter();
  @Output() public nodeMoved: EventEmitter<any> = new EventEmitter();
  @Output() public nodeExpanded: EventEmitter<any> = new EventEmitter();
  @Output() public nodeCollapsed: EventEmitter<any> = new EventEmitter();
  @Output() public loadNextLevel: EventEmitter<any> = new EventEmitter();
  @Output() public nodeChecked: EventEmitter<NodeCheckedEvent> = new EventEmitter();
  @Output() public nodeUnchecked: EventEmitter<NodeUncheckedEvent> = new EventEmitter();
  @Output() public nodeRenameKeydown: EventEmitter<NodeRenameKeydownEvent> = new EventEmitter();
  @Output() public nodeRenameInputChange: EventEmitter<NodeRenameInputChangeEvent> = new EventEmitter();
  @Output() public menuItemSelected: EventEmitter<any> = new EventEmitter();

  public tree: Tree;

  @ViewChild('rootComponent') public rootComponent;

  @ContentChild(TemplateRef) public template;

  private subscriptions: Subscription[] = [];

  public constructor(@Inject(TreeService) private treeService: TreeService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.treeModel) {
      this.tree = TreeComponent.EMPTY_TREE;
    } else {
      this.tree = new Tree(this.treeModel);
    }
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.treeService.nodeRemoved$.subscribe((e: NodeEvent) => {
        this.nodeRemoved.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeRenamed$.subscribe((e: NodeEvent) => {
        this.nodeRenamed.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeCreated$.subscribe((e: NodeEvent) => {
        this.nodeCreated.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeDoubleClicked$.subscribe((e: NodeDoubleClickedEvent) => {
        this.nodeDoubleClicked.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeSelected$.subscribe((e: NodeEvent) => {
        this.nodeSelected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeUnselected$.subscribe((e: NodeEvent) => {
        this.nodeUnselected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeMoveStarted$.subscribe((e: NodeDragStartEvent) => {
        this.nodeDragStarted.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
        this.nodeMoved.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeExpanded$.subscribe((e: NodeEvent) => {
        this.nodeExpanded.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeCollapsed$.subscribe((e: NodeEvent) => {
        this.nodeCollapsed.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.menuItemSelected$.subscribe((e: MenuItemSelectedEvent) => {
        this.menuItemSelected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.loadNextLevel$.subscribe((e: NodeEvent) => {
        this.loadNextLevel.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeChecked$.subscribe((e: NodeCheckedEvent) => {
        this.nodeChecked.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeUnchecked$.subscribe((e: NodeUncheckedEvent) => {
        this.nodeUnchecked.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeRenameKeydown$.subscribe((e: NodeRenameKeydownEvent) => {
        this.nodeRenameKeydown.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeRenameInputChange$.subscribe((e: NodeRenameInputChangeEvent) => {
        this.nodeRenameInputChange.emit(e);
      })
    );
  }

  public getController(): TreeController {
    return this.rootComponent.controller;
  }

  public getControllerByNodeId(id: number | string): TreeController {
    return this.treeService.getController(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }
}
