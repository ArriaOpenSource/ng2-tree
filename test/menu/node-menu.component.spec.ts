import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { NodeMenuComponent } from '../../src/menu/node-menu.component';
import { NodeMenuService } from '../../src/menu/node-menu.service';
import { NodeMenuItemAction, NodeMenuAction, NodeMenuEvent } from '../../src/menu/menu.events';
import { MouseButtons, Keys } from '../../src/utils/event.utils';

let fixture;
let nodeMenuService;
let componentInstance;

describe('NodeMenuComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodeMenuComponent],
      providers: [NodeMenuService]
    });

    fixture = TestBed.createComponent(NodeMenuComponent);
    componentInstance = fixture.debugElement.componentInstance;
    nodeMenuService = TestBed.get(NodeMenuService);
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
  });

  it('should have event emitter properly created', () => {
    expect(fixture.componentInstance.menuItemSelected instanceof EventEmitter).toBe(true);
  });

  it('should have basic menu items', () => {
    expect(fixture.componentInstance.availableMenuItems.length).toEqual(4);
    expect(fixture.componentInstance.availableMenuItems[0]).toEqual({
      name: 'New tag',
      action: NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    });

    expect(fixture.componentInstance.availableMenuItems[1]).toEqual({
      name: 'New folder',
      action: NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder'
    });

    expect(fixture.componentInstance.availableMenuItems[2]).toEqual({
      name: 'Rename',
      action: NodeMenuItemAction.Rename,
      cssClass: 'rename'
    });

    expect(fixture.componentInstance.availableMenuItems[3]).toEqual({
      name: 'Remove',
      action: NodeMenuItemAction.Remove,
      cssClass: 'remove'
    });
  });

  it('should render basic menu items', () => {
    componentInstance.visibility = 'visible';
    fixture.detectChanges();
    const menuItems = fixture.debugElement.queryAll(By.css('.node-menu-item'));
    expect(menuItems).not.toBeNull();
    expect(menuItems.length).toEqual(4);

    expect(menuItems[0].query(By.css('.node-menu-item-icon')).nativeElement.classList).toContain('new-tag');
    expect(menuItems[0].query(By.css('.node-menu-item-value')).nativeElement.innerText).toEqual('New tag');

    expect(menuItems[1].query(By.css('.node-menu-item-icon')).nativeElement.classList).toContain('new-folder');
    expect(menuItems[1].query(By.css('.node-menu-item-value')).nativeElement.innerText).toEqual('New folder');

    expect(menuItems[2].query(By.css('.node-menu-item-icon')).nativeElement.classList).toContain('rename');
    expect(menuItems[2].query(By.css('.node-menu-item-value')).nativeElement.innerText).toEqual('Rename');

    expect(menuItems[3].query(By.css('.node-menu-item-icon')).nativeElement.classList).toContain('remove');
    expect(menuItems[3].query(By.css('.node-menu-item-value')).nativeElement.innerText).toEqual('Remove');
  });

  it('should not emit an action on right mouse button click', () => {
    fixture.detectChanges();

    const event = {
      button: MouseButtons.Right
    };

    const menuItem = fixture.debugElement.query(By.css('.node-menu-item'));

    spyOn(componentInstance.menuItemSelected, 'emit');

    menuItem.triggerEventHandler('click', event);

    expect(componentInstance.menuItemSelected.emit).not.toHaveBeenCalled();
  });

  it('should emit an action on left mouse button click', () => {
    fixture.detectChanges();

    const event = {
      button: MouseButtons.Left
    };

    const menuItem = fixture.debugElement.query(By.css('.node-menu-item'));
    spyOn(componentInstance.menuItemSelected, 'emit');

    menuItem.triggerEventHandler('click', event);

    expect(componentInstance.menuItemSelected.emit).toHaveBeenCalledWith({
      nodeMenuItemAction: NodeMenuItemAction.NewTag,
      nodeMenuItemSelected: 'New tag'
    });
  });

  it('should close menu on any click outside of it', () => {
    fixture.detectChanges();

    spyOn(nodeMenuService.nodeMenuEvents$, 'next');

    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.dispatchEvent(event);

    const expectedNodeMenuEvent: NodeMenuEvent = {
      sender: event.target as HTMLElement,
      action: NodeMenuAction.Close
    };

    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledWith(expectedNodeMenuEvent);
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledTimes(1);
  });

  it('should close menu on any keyup outside of it', () => {
    fixture.detectChanges();

    spyOn(nodeMenuService.nodeMenuEvents$, 'next');

    const event: any = document.createEvent('Events');
    event.keyCode = Keys.Escape;
    event.initEvent('keyup', true, true);

    document.dispatchEvent(event);

    const expectedNodeMenuEvent: NodeMenuEvent = {
      sender: event.target as HTMLElement,
      action: NodeMenuAction.Close
    };

    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledWith(expectedNodeMenuEvent);
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledTimes(1);
  });

  it('should not close menu on event not considered to do so', () => {
    fixture.detectChanges();

    spyOn(nodeMenuService.nodeMenuEvents$, 'next');

    const event: any = document.createEvent('Events');
    event.initEvent('keyup', true, true);

    document.dispatchEvent(event);

    expect(nodeMenuService.nodeMenuEvents$.next).not.toHaveBeenCalled();
  });

  it('should destroy globally registered event listeners', () => {
    fixture.detectChanges();

    spyOn(nodeMenuService.nodeMenuEvents$, 'next');

    componentInstance.ngOnDestroy();

    const mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    const keyboardEvent: any = document.createEvent('Events');
    keyboardEvent.keyCode = Keys.Escape;
    keyboardEvent.initEvent('keyup', true, true);

    document.dispatchEvent(keyboardEvent);
    document.dispatchEvent(mouseEvent);

    expect(nodeMenuService.nodeMenuEvents$.next).not.toHaveBeenCalled();
  });

  describe('ngAfterViewInit', () => {
    it('should display the menu', () => {
      spyOn(componentInstance, 'positionMenu');
      componentInstance.ngAfterViewInit();
      expect(componentInstance.positionMenu).toHaveBeenCalled();
    });
  });

  describe('positionMenu', () => {
    it('should determine if menu should open upwards or downwards based on available space', () => {
      const scrollableParent = document.createElement('div');
      scrollableParent.style.height = '300px';

      const menuContentElem = document.createElement('div');
      menuContentElem.style.height = '100px';

      scrollableParent.appendChild(menuContentElem);
      document.body.appendChild(scrollableParent);
      componentInstance.menuContent = { nativeElement: menuContentElem };

      componentInstance.positionMenu();
      expect(menuContentElem.getAttribute('style')).toEqual('top: 0');

      menuContentElem.setAttribute('style', 'height: 200px');
      scrollableParent.insertBefore(menuContentElem.cloneNode(true), menuContentElem);
      scrollableParent.insertBefore(menuContentElem.cloneNode(true), menuContentElem);

      componentInstance.positionMenu();
      expect(menuContentElem.getAttribute('style')).toEqual('bottom: 0');

      document.body.removeChild(scrollableParent);
    });
    it('should position menu as fixed if cursor coordinates are available', () => {
      const menuContentElem = document.createElement('div');
      componentInstance.menuContent = { nativeElement: menuContentElem };
      const menuContainerElem = document.createElement('div');
      componentInstance.menuContainer = { nativeElement: menuContainerElem };
      componentInstance.cursorCoordinates = { x: 1, y: 2 };

      componentInstance.positionMenu();
      expect(menuContainerElem.getAttribute('style')).toEqual('position: fixed; top: 2px; left: 1px');
    });
  });

  describe('getScrollParent', () => {
    it('should recursively find the closest scrollable parent', () => {
      const scrollableParent = document.createElement('div');
      scrollableParent.style.height = '100px';

      const scrollChild = document.createElement('div');
      scrollChild.style.height = '200px';
      scrollableParent.appendChild(scrollChild);
      document.body.appendChild(scrollableParent);

      spyOn(componentInstance, 'getScrollParent').and.callThrough();
      const result = componentInstance.getScrollParent(scrollChild);

      expect(componentInstance.getScrollParent).toHaveBeenCalledTimes(2);
      expect(result).toBe(scrollableParent);
      document.body.removeChild(scrollableParent);
    });
  });
});
