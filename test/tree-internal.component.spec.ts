import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef, DebugElement } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel, Ng2TreeSettings } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
import { NodeMenuService } from '../src/menu/node-menu.service';
import { NodeMenuComponent } from '../src/menu/node-menu.component';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { NodeDraggableDirective } from '../src/draggable/node-draggable.directive';
import { NodeEditableDirective } from '../src/editable/node-editable.directive';
import * as EventUtils from '../src/utils/event.utils';
import { CapturedNode } from '../src/draggable/captured-node';
import { SafeHtmlPipe } from '../src/utils/safe-html.pipe';
import { DropPosition, NodeDraggableEvent } from '../src/draggable/draggable.events';
import { noop } from '../src/rxjs-imports';

let fixture;
let masterInternalTreeEl;
let masterComponentInstance;
let lordInternalTreeEl;
let lordComponentInstance;
let faceInternalTreeEl;
let faceComponentInstance;
let nodeMenuService;
let nodeDraggableService: NodeDraggableService;
let treeService;
let safeHtml;

const tree: TreeModel = {
  value: 'Master',
  id: 'master',
  children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
};

const tree2: TreeModel = {
  value: 'Lord',
  id: 'lord',
  children: [
    {
      value: 'Disciple#1',
      children: [{ value: 'SubDisciple#1' }, { value: 'SubDisciple#2' }]
    },
    { value: 'Disciple#2' }
  ]
};

const tree3: TreeModel = {
  value: 'Face',
  settings: {
    static: true
  },
  children: [
    {
      value: 'Eyes',
      children: [
        {
          value: 'Retina',
          settings: { static: false }
        },
        { value: 'Eyebrow' }
      ]
    },
    { value: 'Lips' }
  ]
};

@Component({
  template: `
    <div><tree id="master" [tree]="tree"></tree></div>
    <div><tree id="lord" [tree]="tree2"></tree></div>
    <div><tree id="face" [tree]="tree3" [settings]="settings"></tree></div>
  `
})
class TestComponent {
  public tree: TreeModel = tree;
  public tree2: TreeModel = tree2;
  public tree3: TreeModel = tree3;

  public settings: Ng2TreeSettings = {
    rootIsVisible: false,
    showCheckboxes: true
  };

  public constructor(public treeHolder: ElementRef) {}
}

describe('TreeInternalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TreeInternalComponent,
        TreeComponent,
        NodeEditableDirective,
        NodeMenuComponent,
        NodeDraggableDirective,
        SafeHtmlPipe
      ],
      providers: [NodeMenuService, NodeDraggableService, TreeService, SafeHtmlPipe]
    });

    fixture = TestBed.createComponent(TestComponent);

    masterInternalTreeEl = fixture.debugElement.query(By.css('#master')).query(By.directive(TreeInternalComponent));
    masterComponentInstance = masterInternalTreeEl.componentInstance;

    lordInternalTreeEl = fixture.debugElement.query(By.css('#lord')).query(By.directive(TreeInternalComponent));
    lordComponentInstance = lordInternalTreeEl.componentInstance;

    faceInternalTreeEl = fixture.debugElement.query(By.css('#face')).query(By.directive(TreeInternalComponent));
    faceComponentInstance = faceInternalTreeEl.componentInstance;

    nodeMenuService = TestBed.get(NodeMenuService);
    nodeDraggableService = TestBed.get(NodeDraggableService);
    treeService = TestBed.get(TreeService);
    safeHtml = TestBed.get(SafeHtmlPipe);

    fixture.detectChanges();
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
    expect(safeHtml).not.toBeNull();
  });

  it('should have properly set tree property', () => {
    expect(masterComponentInstance.tree).toBeDefined();
    expect(masterComponentInstance.tree.value).toEqual('Master');
  });

  it('should unselect selected node when another node is selected', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;

    const allNodeValues: DebugElement[] = masterInternalTreeEl.queryAll(By.css('.node-value'));

    expect(allNodeValues[0].nativeElement.innerText).toEqual('Master');

    allNodeValues[0].triggerEventHandler('click', event);

    fixture.detectChanges();

    expect(masterComponentInstance.isSelected).toEqual(true);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(true);

    const servantNumber1El = allNodeValues[1].parent.parent.parent.parent;
    const servantNumber2El = allNodeValues[2].parent.parent.parent.parent;

    expect(servantNumber1El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(false);

    expect(servantNumber2El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(false);

    allNodeValues[1].triggerEventHandler('click', event);

    fixture.detectChanges();
    expect(masterComponentInstance.isSelected).toEqual(false);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(false);

    expect(servantNumber1El.componentInstance.isSelected).toEqual(true);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(true);

    expect(servantNumber2El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(false);
  });

  it('should drag node to the tree (though technically every node IS a tree)', () => {
    const internalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1InternalTreeEl = internalTreeChildren[0];
    const servant2InternalTreeEl = internalTreeChildren[1];

    expect(servant1InternalTreeEl.componentInstance.tree.value).toEqual('Servant#1');
    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(servant2InternalTreeEl.componentInstance.tree.value).toEqual('Servant#2');
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);

    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');

    const capturedNode = new CapturedNode(
      servant1InternalTreeEl.componentInstance.nodeElementRef,
      servant1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(
      [capturedNode],
      servant2InternalTreeEl.componentInstance.nodeElementRef,
      DropPosition.Below
    );

    fixture.detectChanges();

    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

    const masterElement = fixture.debugElement.nativeElement;
    const nodeValues = masterElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#2');
    expect(nodeValues[2].innerText).toEqual('Servant#1');
  });

  it('should not add node to the children of a sibling branch node', () => {
    const internalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const disciple1InternalTreeEl = internalTreeChildren[0];
    const disciple2InternalTreeEl = internalTreeChildren[3];

    expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
    expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');

    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#2');

    const capturedNode = new CapturedNode(
      disciple1InternalTreeEl.componentInstance.nodeElementRef,
      disciple1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(
      [capturedNode],
      disciple2InternalTreeEl.componentInstance.nodeElementRef,
      DropPosition.Below
    );

    fixture.detectChanges();

    expect(disciple1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(disciple2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#2');

    expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(2);
    expect(disciple2InternalTreeEl.componentInstance.tree.children).toBeNull();

    const lordElement = lordInternalTreeEl.nativeElement;
    const nodeValues = lordElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Lord');
    expect(nodeValues[1].innerText).toEqual('Disciple#2');
    expect(nodeValues[2].innerText).toEqual('Disciple#1');
    expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(nodeValues[4].innerText).toEqual('SubDisciple#2');
  });

  it('should be impossible to drag parent onto its child', () => {
    const internalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant2InternalTreeEl = internalTreeChildren[1];

    const capturedNode = new CapturedNode(masterComponentInstance.nodeElementRef, masterComponentInstance.tree);
    nodeDraggableService.fireNodeDragged(
      [capturedNode],
      servant2InternalTreeEl.componentInstance.nodeElementRef,
      DropPosition.Below
    );

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');

    const masterElement = fixture.debugElement.nativeElement;
    const nodeValues = masterElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#1');
    expect(nodeValues[2].innerText).toEqual('Servant#2');
  });

  it(
    'should be possible to drag node from one subtree to another subtree in the same parent tree',
    fakeAsync(() => {
      const internalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const disciple1InternalTreeEl = internalTreeChildren[0];
      const subDisciple1InternalTreeEl = internalTreeChildren[1];
      const subDisciple2InternalTreeEl = internalTreeChildren[2];
      const disciple2InternalTreeEl = internalTreeChildren[3];

      expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
      expect(subDisciple1InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#1');
      expect(subDisciple2InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#2');
      expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');

      const capturedNode = new CapturedNode(
        subDisciple1InternalTreeEl.componentInstance.nodeElementRef,
        subDisciple1InternalTreeEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(
        [capturedNode],
        disciple2InternalTreeEl.componentInstance.nodeElementRef,
        DropPosition.Into
      );

      tick();
      fixture.detectChanges();

      expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(3);
      expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
      expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
      expect(lordInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Disciple#2');

      expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(1);
      expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#2');

      const lordElement = lordInternalTreeEl.nativeElement;
      const nodeValues = lordElement.querySelectorAll('.node-value');

      expect(nodeValues[0].innerText).toEqual('Lord');
      expect(nodeValues[1].innerText).toEqual('Disciple#1');
      expect(nodeValues[2].innerText).toEqual('SubDisciple#2');
      expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
      expect(nodeValues[4].innerText).toEqual('Disciple#2');
    })
  );

  it(
    'should be possible to drag node from one subtree to another subtree in different parent trees',
    fakeAsync(() => {
      const lordInternalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const disciple1InternalTreeEl = lordInternalTreeChildren[0];
      const subDisciple1InternalTreeEl = lordInternalTreeChildren[1];

      const masterInternalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const servant1InternalTreeEl = masterInternalTreeChildren[0];

      const capturedNode = new CapturedNode(
        servant1InternalTreeEl.componentInstance.nodeElementRef,
        servant1InternalTreeEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(
        [capturedNode],
        subDisciple1InternalTreeEl.componentInstance.nodeElementRef,
        DropPosition.Into
      );

      tick();
      fixture.detectChanges();

      expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
      expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
      expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
      expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('SubDisciple#2');

      expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
      expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

      const lordElement = lordInternalTreeEl.nativeElement;
      const lordNodeValues = lordElement.querySelectorAll('.node-value');

      expect(lordNodeValues[0].innerText).toEqual('Lord');
      expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
      expect(lordNodeValues[2].innerText).toEqual('Servant#1');
      expect(lordNodeValues[3].innerText).toEqual('SubDisciple#1');
      expect(lordNodeValues[4].innerText).toEqual('SubDisciple#2');
      expect(lordNodeValues[5].innerText).toEqual('Disciple#2');

      const masterElement = masterInternalTreeEl.nativeElement;
      const masterNodeValues = masterElement.querySelectorAll('.node-value');

      expect(masterNodeValues[0].innerText).toEqual('Master');
      expect(masterNodeValues[1].innerText).toEqual('Servant#2');
    })
  );

  it(
    'add node to its children',
    fakeAsync(() => {
      const lordInternalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const disciple1InternalTreeEl = lordInternalTreeChildren[0];

      const masterInternalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const servant1InternalTreeEl = masterInternalTreeChildren[0];

      const capturedNode = new CapturedNode(
        servant1InternalTreeEl.componentInstance.nodeElementRef,
        servant1InternalTreeEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(
        [capturedNode],
        disciple1InternalTreeEl.componentInstance.nodeElementRef,
        DropPosition.Into
      );

      tick();
      fixture.detectChanges();

      expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
      expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#1');
      expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#2');
      expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('Servant#1');

      expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
      expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

      const lordElement = lordInternalTreeEl.nativeElement;
      const lordNodeValues = lordElement.querySelectorAll('.node-value');

      expect(lordNodeValues[0].innerText).toEqual('Lord');
      expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
      expect(lordNodeValues[2].innerText).toEqual('SubDisciple#1');
      expect(lordNodeValues[3].innerText).toEqual('SubDisciple#2');
      expect(lordNodeValues[4].innerText).toEqual('Servant#1');
      expect(lordNodeValues[5].innerText).toEqual('Disciple#2');

      const masterElement = masterInternalTreeEl.nativeElement;
      const masterNodeValues = masterElement.querySelectorAll('.node-value');

      expect(masterNodeValues[0].innerText).toEqual('Master');
      expect(masterNodeValues[1].innerText).toEqual('Servant#2');
    })
  );

  it('should be possible to collapse node', () => {
    const foldingControl = masterInternalTreeEl.query(By.css('.folding'));
    spyOn(masterComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(masterComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    const children = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);
  });

  it('should be possible to expand node', () => {
    const foldingControl = masterInternalTreeEl.query(By.css('.folding'));
    spyOn(masterComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(masterComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    let children = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    children = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(2);
  });

  it("shouldn't show root of the tree", () => {
    expect(faceComponentInstance.tree.isRoot()).toEqual(
      true,
      'Element that has rootless class should be a root of the tree'
    );

    const treeUl = faceInternalTreeEl.query(By.css('.tree'));
    expect(treeUl.classes['rootless']).toEqual(true, 'Tree with hidden root should have "rootless" css class');

    const valueContainer = faceInternalTreeEl.query(By.css('.value-container'));
    expect(valueContainer.classes['rootless']).toEqual(
      true,
      'Element which contains tree value should also have "rootless" css class'
    );
  });

  it('should not propagate root visibility to its children - in other words only root should be modified in the tree and hidden', () => {
    const childEl = faceInternalTreeEl.query(By.directive(TreeInternalComponent));
    expect(childEl.componentInstance.tree.isRoot()).toEqual(false);
    expect(childEl.query(By.css('.tree')).classes['rootless']).toEqual(
      false,
      'Only element with root tree node can have rootless class'
    );
    expect(childEl.query(By.css('.value-container')).classes['rootless']).toEqual(
      false,
      'Only element with root tree node can have rootless class'
    );
  });

  describe('Static Tree', () => {
    it('should not show menu', () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      faceInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(faceComponentInstance.isRightMenuVisible).toEqual(false);
      expect(faceInternalTreeEl.query(By.css('.node-menu'))).toEqual(null);

      const childEl = faceInternalTreeEl.query(By.directive(TreeInternalComponent));
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(false);
      expect(childEl.query(By.css('.node-menu'))).toEqual(null);
    });

    it("should allow to override static option for it's children", () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      const childEl = faceInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[1];

      childEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(childEl.componentInstance.tree.value).toEqual('Retina');
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(true);
      expect(childEl.query(By.css('.node-menu'))).toBeTruthy();
    });

    it('should not be draggable', () => {
      const internalTreeChildren = faceInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const eyesEl = internalTreeChildren[0];
      const lipsEl = internalTreeChildren[3];

      expect(eyesEl.componentInstance.tree.value).toEqual('Eyes');
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);

      expect(lipsEl.componentInstance.tree.value).toEqual('Lips');
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);

      const capturedNode = new CapturedNode(eyesEl.componentInstance.nodeElementRef, eyesEl.componentInstance.tree);
      nodeDraggableService.fireNodeDragged([capturedNode], lipsEl.componentInstance.nodeElementRef, DropPosition.Below);

      fixture.detectChanges();

      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);

      expect(faceInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(faceInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Lips');

      const nativeElement = faceInternalTreeEl.nativeElement;
      const nodeValues = nativeElement.querySelectorAll('.node-value');

      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyebrow');
      expect(nodeValues[4].innerText).toEqual('Lips');
    });
  });

  describe('nodeDraggedHandler', () => {
    it(`should call correct 'move' function for each dragged item and uncheck moved items`, () => {
      const mockCtrl = { isChecked: noop, uncheck: noop };
      spyOn(mockCtrl, 'isChecked').and.returnValue(true);
      spyOn(mockCtrl, 'uncheck');
      spyOn(lordComponentInstance.treeService, 'getController').and.returnValue(mockCtrl);
      spyOn(lordComponentInstance.tree, 'isBranch').and.returnValue(true);
      spyOn(lordComponentInstance.tree, 'hasSibling').and.returnValue(true);
      spyOn(lordComponentInstance, 'moveNodeToThisTreeAndRemoveFromPreviousOne');
      spyOn(lordComponentInstance, 'moveSibling');
      spyOn(lordComponentInstance, 'moveNodeToParentTreeAndRemoveFromPreviousOne');

      const e1 = new NodeDraggableEvent(
        [new CapturedNode({} as ElementRef, masterComponentInstance.tree)],
        null,
        DropPosition.Into
      );
      lordComponentInstance.nodeDraggedHandler(e1);
      expect(lordComponentInstance.treeService.getController).toHaveBeenCalled();
      expect(mockCtrl.isChecked).toHaveBeenCalled();
      expect(mockCtrl.uncheck).toHaveBeenCalled();
      expect(lordComponentInstance.tree.isBranch).toHaveBeenCalled();
      expect(lordComponentInstance.moveNodeToThisTreeAndRemoveFromPreviousOne).toHaveBeenCalled();

      lordComponentInstance.tree.isBranch.and.returnValue(false);
      const e2 = new NodeDraggableEvent(
        [new CapturedNode({} as ElementRef, masterComponentInstance.tree)],
        null,
        DropPosition.Above
      );
      lordComponentInstance.nodeDraggedHandler(e2);
      expect(lordComponentInstance.tree.hasSibling).toHaveBeenCalled();
      expect(lordComponentInstance.moveSibling).toHaveBeenCalled();

      lordComponentInstance.tree.hasSibling.and.returnValue(false);
      const e3 = new NodeDraggableEvent(
        [new CapturedNode({} as ElementRef, masterComponentInstance.tree)],
        null,
        DropPosition.Below
      );
      lordComponentInstance.nodeDraggedHandler(e3);
      expect(lordComponentInstance.moveNodeToParentTreeAndRemoveFromPreviousOne).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should delete the controller and release checked/dragged nodes', () => {
      spyOn(masterComponentInstance.nodeDraggableService, 'releaseDraggedNode');
      spyOn(masterComponentInstance.nodeDraggableService, 'releaseCheckedNodes');
      spyOn(masterComponentInstance.treeService, 'deleteController');

      masterComponentInstance.ngOnDestroy();
      expect(masterComponentInstance.nodeDraggableService.releaseDraggedNode).toHaveBeenCalled();
      expect(masterComponentInstance.nodeDraggableService.releaseCheckedNodes).toHaveBeenCalled();
      expect(masterComponentInstance.treeService.deleteController).toHaveBeenCalled();
    });
  });

  describe('moveSibling', () => {
    it('should move sibling either above ore below the current tree, based on the option passed', () => {
      const mockTree = { moveSiblingAbove: noop, moveSiblingBelow: noop };
      const mockSibling = { parent: mockTree, positionInParent: 0 };
      spyOn(mockTree, 'moveSiblingAbove');
      spyOn(mockTree, 'moveSiblingBelow');
      spyOn(masterComponentInstance.treeService, 'fireNodeMoved');

      masterComponentInstance.moveSibling(mockSibling, mockTree, DropPosition.Above);
      expect(mockTree.moveSiblingAbove).toHaveBeenCalledWith(mockSibling);
      expect(masterComponentInstance.treeService.fireNodeMoved).toHaveBeenCalledWith(
        mockSibling,
        mockSibling.parent,
        mockSibling.positionInParent
      );

      masterComponentInstance.moveSibling(mockSibling, mockTree, DropPosition.Below);
      expect(mockTree.moveSiblingBelow).toHaveBeenCalledWith(mockSibling);
    });
  });

  describe('moveNodeToThisTreeAndRemoveFromPreviousOne', () => {
    it(
      'should move given node to a given tree as a child',
      fakeAsync(() => {
        const capturedTree = { parent: {}, removeItselfFromParent: noop };
        const moveToTree = { addChild: noop };

        spyOn(capturedTree, 'removeItselfFromParent');
        spyOn(moveToTree, 'addChild').and.returnValue(capturedTree);
        spyOn(masterComponentInstance.treeService, 'fireNodeMoved');

        masterComponentInstance.moveNodeToThisTreeAndRemoveFromPreviousOne(capturedTree, moveToTree);
        expect(capturedTree.removeItselfFromParent).toHaveBeenCalled();
        tick();
        expect(moveToTree.addChild).toHaveBeenCalledWith(capturedTree);
        expect(masterComponentInstance.treeService.fireNodeMoved).toHaveBeenCalledWith(
          capturedTree,
          capturedTree.parent
        );
      })
    );
  });

  describe('moveNodeToParentTreeAndRemoveFromPreviousOne', () => {
    it(
      'should move given node to a given tree as a sibling',
      fakeAsync(() => {
        const capturedTree = { parent: {}, removeItselfFromParent: noop };
        const moveToTree = { addSibling: noop, positionInParent: 0 };

        spyOn(capturedTree, 'removeItselfFromParent');
        spyOn(moveToTree, 'addSibling').and.returnValue(capturedTree);
        spyOn(masterComponentInstance.treeService, 'fireNodeMoved');

        masterComponentInstance.moveNodeToParentTreeAndRemoveFromPreviousOne(
          capturedTree,
          moveToTree,
          DropPosition.Below
        );
        expect(capturedTree.removeItselfFromParent).toHaveBeenCalled();
        tick();
        expect(moveToTree.addSibling).toHaveBeenCalledWith(capturedTree, 1);
        expect(masterComponentInstance.treeService.fireNodeMoved).toHaveBeenCalledWith(
          capturedTree,
          capturedTree.parent
        );
      })
    );
  });

  describe('onRemoveSelected', () => {
    it('should fire node removed event', () => {
      spyOn(masterComponentInstance.nodeDraggableService, 'removeCheckedNodeById');
      spyOn(masterComponentInstance.treeService, 'deleteController');
      spyOn(masterComponentInstance.treeService, 'fireNodeRemoved');

      masterComponentInstance.onRemoveSelected();
      expect(masterComponentInstance.nodeDraggableService.removeCheckedNodeById).toHaveBeenCalledWith('master');
      expect(masterComponentInstance.treeService.deleteController).toHaveBeenCalledWith('master');
      expect(masterComponentInstance.treeService.fireNodeRemoved).toHaveBeenCalledWith(masterComponentInstance.tree);
    });
  });

  describe('onNodeDoubleClicked', () => {
    it('should fire node double clicked event', () => {
      spyOn(masterComponentInstance.treeService, 'fireNodeDoubleClicked');
      masterComponentInstance.onNodeDoubleClicked();
      expect(masterComponentInstance.treeService.fireNodeDoubleClicked).toHaveBeenCalledWith(
        masterComponentInstance.tree
      );
    });
  });

  describe('onNodeChecked', () => {
    it('should fire node checked event', () => {
      spyOn(faceComponentInstance.nodeDraggableService, 'addCheckedNode');
      spyOn(faceComponentInstance, 'onNodeIndeterminate');
      spyOn(faceComponentInstance.treeService, 'fireNodeChecked');
      spyOn(faceComponentInstance, 'executeOnChildController');

      faceComponentInstance.onNodeChecked();
      expect(faceComponentInstance.nodeDraggableService.addCheckedNode).toHaveBeenCalled();
      expect(faceComponentInstance.onNodeIndeterminate).toHaveBeenCalled();
      expect(faceComponentInstance.treeService.fireNodeChecked).toHaveBeenCalledWith(faceComponentInstance.tree);
      expect(faceComponentInstance.executeOnChildController).toHaveBeenCalled();
      expect(faceComponentInstance.tree.checked).toBe(true);
    });
  });

  describe('onNodeIndeterminate', () => {
    it('should fire node indeterminate event', () => {
      spyOn(faceComponentInstance.treeService, 'fireNodeIndeterminate');
      faceComponentInstance.onNodeIndeterminate(true);
      expect(faceComponentInstance.treeService.fireNodeIndeterminate).toHaveBeenCalledWith(
        faceComponentInstance.tree,
        true
      );
    });
  });

  describe('updateCheckboxState', () => {
    it(
      'should update checkbox state based on children states',
      fakeAsync(() => {
        spyOn(masterComponentInstance.tree, 'checkedChildrenAmount').and.returnValue(0);
        spyOn(masterComponentInstance.tree, 'loadedChildrenAmount');
        spyOn(masterComponentInstance, 'onNodeUnchecked');
        spyOn(masterComponentInstance, 'onNodeIndeterminate');
        spyOn(masterComponentInstance, 'onNodeChecked');

        masterComponentInstance.updateCheckboxState();
        tick();
        expect(masterComponentInstance.tree.checkedChildrenAmount).toHaveBeenCalled();
        expect(masterComponentInstance.onNodeUnchecked).toHaveBeenCalledWith(true);
        expect(masterComponentInstance.onNodeIndeterminate).toHaveBeenCalledWith(false);

        masterComponentInstance.onNodeUnchecked.calls.reset();
        masterComponentInstance.onNodeIndeterminate.calls.reset();
        masterComponentInstance.tree.checkedChildrenAmount.and.returnValue(1);
        masterComponentInstance.tree.loadedChildrenAmount.and.returnValue(1);

        masterComponentInstance.updateCheckboxState();
        tick();
        expect(masterComponentInstance.tree.loadedChildrenAmount).toHaveBeenCalled();
        expect(masterComponentInstance.onNodeChecked).toHaveBeenCalledWith(true);
        expect(masterComponentInstance.onNodeIndeterminate).toHaveBeenCalledWith(false);

        masterComponentInstance.onNodeChecked.calls.reset();
        masterComponentInstance.onNodeIndeterminate.calls.reset();
        masterComponentInstance.tree.loadedChildrenAmount.and.returnValue(2);

        masterComponentInstance.updateCheckboxState();
        tick();
        expect(masterComponentInstance.onNodeUnchecked).toHaveBeenCalledWith(true);
        expect(masterComponentInstance.onNodeIndeterminate).toHaveBeenCalledWith(true);
      })
    );
  });
});
