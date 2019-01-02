import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core';
import { NodeDraggableDirective } from '../../src/draggable/node-draggable.directive';
import { NodeDraggableService } from '../../src/draggable/node-draggable.service';
import { CapturedNode } from '../../src/draggable/captured-node';
import { Tree } from '../../src/tree';
import { noop } from '../../src/rxjs-imports';
import { DropPosition } from '../../src/draggable/draggable.events';

let fixture;
let directiveEl;
let directiveInstance: NodeDraggableDirective;
let nodeDraggableService: NodeDraggableService;

@Component({
  template: '<div id="draggableTarget" [nodeDraggable]="draggableTarget" [tree]="tree"></div>'
})
class TestComponent {
  public tree: Tree = new Tree({
    value: '42'
  });

  public constructor(public draggableTarget: ElementRef) {}
}

describe('NodeDraggableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodeDraggableDirective, TestComponent],
      providers: [NodeDraggableService]
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(By.directive(NodeDraggableDirective));
    directiveInstance = directiveEl.injector.get(NodeDraggableDirective);
    nodeDraggableService = TestBed.get(NodeDraggableService);
  });

  it('should have correctly set "tree" property', () => {
    fixture.detectChanges();

    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.tree.value).toEqual('42');
  });

  it('should have correctly set "nodeDraggable" property', () => {
    fixture.detectChanges();

    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.nodeDraggable).toBe(fixture.componentInstance.draggableTarget);
  });

  it('should have correctly set "element" property', () => {
    fixture.detectChanges();

    const draggableElement = directiveEl.nativeElement;
    expect(directiveInstance.element.nativeElement).toBe(draggableElement);
  });

  it('should make host draggable', () => {
    fixture.detectChanges();

    const draggableElement = directiveEl.nativeElement;
    expect(draggableElement.draggable).toBe(true);
  });

  it('should add appropriate class on "dragenter"', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 0;
    dragenterEvent.y = 0;

    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(0, 0);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(true);
  });

  it('should not add appropriate class if "dragenter" was triggered on element which is not child or target element itself', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 1;
    dragenterEvent.y = 2;

    spyOn(document, 'elementFromPoint').and.returnValue(null);

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(false);
  });

  it('should use clientX, clientY properties on event if there are no x and y properties', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.clientX = 42;
    dragenterEvent.clientY = 12;

    spyOn(document, 'elementFromPoint');

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.clientX, dragenterEvent.clientY);
  });

  it('should set dropEffect to "move" on dragover', () => {
    fixture.detectChanges();

    spyOn(directiveInstance as any, 'determineDropPosition');
    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.dataTransfer = {};

    directiveEl.triggerEventHandler('dragover', dragenterEvent);

    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.dataTransfer.dropEffect).toBe('move');
  });

  it('should capture a node on dragstart and notify that it is being dragged', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation']);
    dragenterEvent.dataTransfer = jasmine.createSpyObj('dataTransfer', ['setData']);
    spyOn(nodeDraggableService, 'fireNodeDragStart');

    directiveEl.triggerEventHandler('dragstart', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);

    const capturedNode: CapturedNode = nodeDraggableService.getDraggedNode();
    expect(capturedNode.element).toBe(directiveInstance.nodeDraggable);
    expect(capturedNode.tree).toBe(directiveInstance.tree);
    expect(nodeDraggableService.fireNodeDragStart).toHaveBeenCalled();
    expect(dragenterEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'text',
      NodeDraggableDirective.DATA_TRANSFER_STUB_DATA
    );
    expect(dragenterEvent.dataTransfer.effectAllowed).toBe('move');
  });

  it('should remove "over-drop-target" class on dragleave if dragging left target element', () => {
    fixture.detectChanges();

    const dragenterEvent = { x: 1, y: 2 };

    spyOn(document, 'elementFromPoint').and.returnValue(null);

    const draggableElementClassList = directiveEl.nativeElement.classList;

    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    directiveEl.triggerEventHandler('dragleave', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
  });

  it('should not remove "over-drop-target" dragging is happening on element', () => {
    fixture.detectChanges();

    const dragenterEvent = { x: 1, y: 2 };

    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    const draggableElementClassList = directiveEl.nativeElement.classList;

    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    directiveEl.triggerEventHandler('dragleave', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
  });

  it('should release captured node on "dragend" and get rid of "over-drop-target" class', () => {
    fixture.detectChanges();

    const draggableElementClassList = directiveEl.nativeElement.classList;
    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    spyOn(nodeDraggableService, 'releaseDraggedNode');

    directiveEl.triggerEventHandler('dragend');

    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
    expect(nodeDraggableService.releaseDraggedNode).toHaveBeenCalled();
  });

  it('should handle drop event: prevent default action and stop event propagation', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getDraggedNode').and.returnValue(null);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getDraggedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it('should handle drop event: remove "over-drop-target" class', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getDraggedNode').and.returnValue(null);

    spyOn(directiveEl.nativeElement.classList, 'remove');

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);

    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledWith(
      'over-drop-target',
      'over-drop-leaf',
      undefined
    );
    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledTimes(1);

    expect(nodeDraggableService.getDraggedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it(`should handle drop event: do not notify that node was dropped if it is not a target's child element or target itself`, () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');

    const capturedNode = new CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);

    spyOn(nodeDraggableService, 'getDraggedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(null);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getDraggedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it('should handle drop event: should notify about successfully dropped node', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');

    const capturedNode = new CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);

    spyOn(nodeDraggableService, 'getDraggedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);

    expect(nodeDraggableService.getDraggedNode).toHaveBeenCalledTimes(5);
    expect(nodeDraggableService.fireNodeDragged).toHaveBeenCalledTimes(1);

    const fireCapturedNode = (nodeDraggableService.fireNodeDragged as jasmine.Spy).calls.argsFor(0)[0];
    const fireTarget = (nodeDraggableService.fireNodeDragged as jasmine.Spy).calls.argsFor(0)[1];
    expect(fireCapturedNode).toEqual([capturedNode]);
    expect(fireTarget).toBe(directiveInstance.nodeDraggable);
  });

  it('should not make tree draggable if it is static', () => {
    directiveInstance.tree = { isStatic: noop } as any;
    spyOn(directiveInstance.tree, 'isStatic').and.returnValue(true);

    expect((directiveInstance as any).disposersForDragListeners.length).toBe(0);
    directiveInstance.ngOnInit();
    expect((directiveInstance as any).disposersForDragListeners.length).toBe(0);
  });

  describe('handleDragStart', () => {
    it('should not start dragging if node is being renamed', () => {
      fixture.detectChanges();

      const e = jasmine.createSpyObj('e', ['preventDefault']);
      e.dataTransfer = jasmine.createSpyObj('dataTransfer', ['setData', 'setDragImage']);
      e.dataTransfer.effectAllowed = 'none';

      spyOn(directiveInstance.tree, 'isBeingRenamed').and.returnValue(true);

      (directiveInstance as any).handleDragStart(e);
      expect(directiveInstance.tree.isBeingRenamed).toHaveBeenCalled();
      expect(e.preventDefault).toHaveBeenCalled();
      expect(e.dataTransfer.effectAllowed).toBe('none');
    });
    it('should set dragged node, notify that drag started, set drag image and set dataTransfer', () => {
      fixture.detectChanges();

      const e = jasmine.createSpyObj('e', ['stopPropagation']);
      e.dataTransfer = jasmine.createSpyObj('dataTransfer', ['setData', 'setDragImage']);
      e.dataTransfer.effectAllowed = 'none';

      directiveInstance.tree.node.settings.dragImageId = 'dragImageId';
      spyOn(directiveInstance.tree, 'isBeingRenamed').and.returnValue(false);
      spyOn((directiveInstance as any).nodeDraggableService, 'setDraggedNode');
      spyOn(directiveInstance as any, 'notifyThatNodeIsBeingDragged');
      spyOn(directiveInstance as any, 'applyDraggedNodeClasses');
      spyOn(document, 'getElementById').and.returnValue({});

      (directiveInstance as any).handleDragStart(e);
      expect(e.stopPropagation).toHaveBeenCalled();
      expect((directiveInstance as any).nodeDraggableService.setDraggedNode).toHaveBeenCalled();
      expect((directiveInstance as any).notifyThatNodeIsBeingDragged).toHaveBeenCalled();
      expect(document.getElementById).toHaveBeenCalledWith('dragImageId');
      expect(e.dataTransfer.setDragImage).toHaveBeenCalled();
      expect((directiveInstance as any).applyDraggedNodeClasses).toHaveBeenCalled();
      expect(e.dataTransfer.setData).toHaveBeenCalled();
      expect(e.dataTransfer.effectAllowed).toBe('move');
    });
  });

  describe('handleDragOver', () => {
    it('TODO', () => {});
  });

  describe('handleDragEnter', () => {
    it('should add correct CSS classes', () => {
      const e = jasmine.createSpyObj('e', ['preventDefault']);
      spyOn(directiveInstance as any, 'containsElementAt').and.returnValue(true);
      spyOn(directiveInstance as any, 'getDragOverClassName').and.returnValue('test');
      spyOn(directiveInstance as any, 'addClasses');

      (directiveInstance as any).handleDragEnter(e);
      expect(e.preventDefault).toHaveBeenCalled();
      expect((directiveInstance as any).containsElementAt).toHaveBeenCalledWith(e);
      expect((directiveInstance as any).getDragOverClassName).toHaveBeenCalled();
      expect((directiveInstance as any).addClasses).toHaveBeenCalledWith(['over-drop-target', 'test']);
    });
  });

  describe('handleDragLeave', () => {
    it('should remove correct CSS classes', () => {
      const e = { test: 'test' };
      spyOn(directiveInstance as any, 'containsElementAt').and.returnValue(false);
      spyOn(directiveInstance as any, 'getDragOverClassName').and.returnValue('test-over');
      spyOn(directiveInstance as any, 'getDropPositionClassName').and.returnValue('test-position');
      spyOn(directiveInstance as any, 'removeClasses');

      (directiveInstance as any).handleDragLeave(e);
      expect((directiveInstance as any).containsElementAt).toHaveBeenCalledWith(e);
      expect((directiveInstance as any).getDragOverClassName).toHaveBeenCalled();
      expect((directiveInstance as any).getDropPositionClassName).toHaveBeenCalled();
      expect((directiveInstance as any).removeClasses).toHaveBeenCalledWith([
        'over-drop-target',
        'test-over',
        'test-position'
      ]);
    });
  });

  describe('handleDragEnd', () => {
    it('should remove correct CSS classes', () => {
      spyOn(directiveInstance as any, 'getDragOverClassName').and.returnValue('test-over');
      spyOn(directiveInstance as any, 'getDropPositionClassName').and.returnValue('test-position');
      spyOn(directiveInstance as any, 'removeClasses');

      (directiveInstance as any).handleDragEnd();
      expect((directiveInstance as any).getDragOverClassName).toHaveBeenCalled();
      expect((directiveInstance as any).getDropPositionClassName).toHaveBeenCalled();
      expect((directiveInstance as any).removeClasses).toHaveBeenCalledWith([
        'over-drop-target',
        'test-over',
        'test-position'
      ]);
    });
  });

  describe('handleDrop', () => {
    it('should remove css classes and notify that node was dropped', () => {
      const e = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
      spyOn(directiveInstance as any, 'getDragOverClassName').and.returnValue('drag-over');
      spyOn(directiveInstance as any, 'getDropPositionClassName').and.returnValue('drop-into');
      spyOn(directiveInstance as any, 'removeClasses');
      spyOn(directiveInstance as any, 'isDropPossible').and.returnValue(true);
      spyOn(directiveInstance as any, 'removeDraggedNodeClasses');
      spyOn(directiveInstance as any, 'notifyThatNodeWasDropped');
      spyOn(directiveInstance as any, 'releaseNodes');
      spyOn((directiveInstance as any).nodeDraggableService, 'getDraggedNode').and.returnValue({});
      spyOn((directiveInstance as any).nodeDraggableService, 'getCheckedNodes').and.returnValue([{}]);
      (directiveInstance as any).currentDropPosition = 1;

      (directiveInstance as any).handleDrop(e);
      expect(e.preventDefault).toHaveBeenCalled();
      expect(e.stopPropagation).toHaveBeenCalled();
      expect((directiveInstance as any).getDragOverClassName).toHaveBeenCalled();
      expect((directiveInstance as any).getDropPositionClassName).toHaveBeenCalledWith(1);
      expect((directiveInstance as any).removeClasses).toHaveBeenCalledWith([
        'over-drop-target',
        'drag-over',
        'drop-into'
      ]);
      expect((directiveInstance as any).isDropPossible).toHaveBeenCalled();
      expect((directiveInstance as any).nodeDraggableService.getDraggedNode).toHaveBeenCalled();
      expect((directiveInstance as any).removeDraggedNodeClasses).toHaveBeenCalled();
      expect((directiveInstance as any).notifyThatNodeWasDropped).toHaveBeenCalled();
      expect((directiveInstance as any).releaseNodes).toHaveBeenCalled();
    });
  });

  describe('determineDropPosition', () => {
    it('TODO', () => {});
  });

  describe('getDragOverClassName', () => {
    it('should return correct CSS class name for dragover event', () => {
      fixture.detectChanges();
      spyOn(directiveInstance.tree, 'isBranch').and.returnValue(true);
      expect((directiveInstance as any).getDragOverClassName()).toBe('over-drop-branch');

      (directiveInstance.tree.isBranch as jasmine.Spy).and.returnValue(false);
      expect((directiveInstance as any).getDragOverClassName()).toBe('over-drop-leaf');
    });
  });

  describe('getDropPositionClassName', () => {
    it('should return correct CSS class name for different drop positions', () => {
      expect((directiveInstance as any).getDropPositionClassName(DropPosition.Above)).toBe('over-drop-above');
      expect((directiveInstance as any).getDropPositionClassName(DropPosition.Into)).toBe('over-drop-into');
      expect((directiveInstance as any).getDropPositionClassName(DropPosition.Below)).toBe('over-drop-below');
    });
  });

  describe('isDropPossible', () => {
    it('should return boolean whether the dragged node(s) can be dropped at current node', () => {
      // Dragged node
      const e = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
      const draggedNode = jasmine.createSpyObj('draggedNode', ['canBeDroppedAt']);
      draggedNode.canBeDroppedAt.and.returnValue(true);
      spyOn((directiveInstance as any).nodeDraggableService, 'getDraggedNode').and.returnValue(draggedNode);
      spyOn(directiveInstance as any, 'containsElementAt').and.returnValue(true);
      directiveInstance.nodeDraggable = {} as any;

      expect((directiveInstance as any).isDropPossible(e)).toBe(true);
      expect((directiveInstance as any).nodeDraggableService.getDraggedNode).toHaveBeenCalled();
      expect(draggedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
      expect((directiveInstance as any).containsElementAt).toHaveBeenCalledWith(e);

      // Checked nodes
      draggedNode.canBeDroppedAt.calls.reset();
      (directiveInstance as any).containsElementAt.calls.reset();
      (directiveInstance as any).nodeDraggableService.getDraggedNode.and.returnValue(null);
      spyOn((directiveInstance as any).nodeDraggableService, 'getCheckedNodes').and.returnValue([draggedNode]);

      expect((directiveInstance as any).isDropPossible(e)).toBe(true);
      expect((directiveInstance as any).nodeDraggableService.getCheckedNodes).toHaveBeenCalled();
      expect(draggedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
      expect((directiveInstance as any).containsElementAt).toHaveBeenCalledWith(e);
    });
  });

  describe('releaseNodes', () => {
    it('should correctly release either dragged node or checked nodes', () => {
      spyOn((directiveInstance as any).nodeDraggableService, 'getDraggedNode');
      spyOn((directiveInstance as any).nodeDraggableService, 'releaseDraggedNode');
      spyOn((directiveInstance as any).nodeDraggableService, 'releaseCheckedNodes');

      (directiveInstance as any).releaseNodes();
      expect((directiveInstance as any).nodeDraggableService.getDraggedNode).toHaveBeenCalled();
      expect((directiveInstance as any).nodeDraggableService.releaseDraggedNode).not.toHaveBeenCalled();
      expect((directiveInstance as any).nodeDraggableService.releaseCheckedNodes).toHaveBeenCalled();

      (directiveInstance as any).nodeDraggableService.getDraggedNode.and.returnValue({});
      (directiveInstance as any).releaseNodes();
      expect((directiveInstance as any).nodeDraggableService.releaseDraggedNode).toHaveBeenCalled();
    });
  });

  describe('applyDraggedNodeClasses', () => {
    it('TODO', () => {});
  });

  describe('removeDraggedNodeClasses', () => {
    it('TODO', () => {});
  });

  describe('notifyThatNodeWasDropped', () => {
    it('TODO', () => {});
  });

  describe('notifyThatNodeIsBeingDragged', () => {
    it('TODO', () => {});
  });
});
