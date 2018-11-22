import { inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { NodeDraggableService } from '../../src/draggable/node-draggable.service';
import { CapturedNode } from '../../src/draggable/captured-node';
import { ElementRef } from '@angular/core';
import { NodeDraggableEvent, DropPosition } from '../../src/draggable/draggable.events';
import { Tree } from '../../src/tree';

describe('NodeDraggableService', function() {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeDraggableService]
    });
  });

  it(
    'should have draggable event bus set up',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      expect(nodeDraggableService).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$ instanceof Subject).toBe(true);
    })
  );

  it(
    'should have captured node undefined right after creation',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      const capturedNode = nodeDraggableService.getDraggedNode();
      expect(capturedNode).toBeUndefined();
    })
  );

  it(
    'should fire node dragged event',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const stubCapturedNode = new CapturedNode(null, new Tree({ value: 'Master' }));
      const target = new ElementRef({});

      nodeDraggableService.fireNodeDragged([stubCapturedNode], target, DropPosition.Below);

      expect(nodeDraggableService.draggableNodeEvents$.next).toHaveBeenCalledTimes(1);

      const event: NodeDraggableEvent = (nodeDraggableService.draggableNodeEvents$.next as jasmine.Spy).calls.argsFor(
        0
      )[0];
      expect(event.target).toBe(target);
      expect(event.captured).toEqual([stubCapturedNode]);
    })
  );

  it(
    'should not fire event if node is static',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      const masterTree = new Tree({
        value: 'Master',
        settings: {
          static: true
        }
      });

      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const elementRef = new ElementRef(null);
      nodeDraggableService.fireNodeDragged([new CapturedNode(elementRef, masterTree)], elementRef, DropPosition.Below);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );

  it(
    'should not fire event if there is no tree in captured node',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const elementRef = new ElementRef(null);
      nodeDraggableService.fireNodeDragged([new CapturedNode(elementRef, null)], elementRef, DropPosition.Below);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );

  it(
    'should capture node',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      const stubCapturedNode = new CapturedNode(null, null);

      nodeDraggableService.setDraggedNode(stubCapturedNode);
      const actualCapturedNode = nodeDraggableService.getDraggedNode();

      expect(actualCapturedNode).toBe(stubCapturedNode);
    })
  );

  it(
    'should release captured node',
    inject([NodeDraggableService], (nodeDraggableService: NodeDraggableService) => {
      const stubCapturedNode = new CapturedNode(null, null);

      nodeDraggableService.setDraggedNode(stubCapturedNode);
      expect(nodeDraggableService.getDraggedNode()).toBe(stubCapturedNode);

      nodeDraggableService.releaseDraggedNode();
      expect(nodeDraggableService.getDraggedNode()).toBeNull();
    })
  );
});
