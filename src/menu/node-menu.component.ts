import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuAction, NodeMenuItemAction, NodeMenuItemSelectedEvent } from './menu.events';
import { isEscapePressed, isLeftButtonClicked } from '../utils/event.utils';

@Component({
  selector: 'node-menu',
  template: `
    <div class="node-menu" [ngStyle]="{'visibility': visibility}" #menuContainer>
      <ul class="node-menu-content" #menuContent>
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
          (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
})
export class NodeMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  public visibility = 'hidden';

  @Output()
  public menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter<NodeMenuItemSelectedEvent>();

  @Input() public menuItems: NodeMenuItem[];
  @Input() public cursorCoordinates?: ICursorCoordinates;

  @ViewChild('menuContent') public menuContent: any;
  @ViewChild('menuContainer') public menuContainer: any;

  public availableMenuItems: NodeMenuItem[] = [
    {
      name: 'New tag',
      action: NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    },
    {
      name: 'New folder',
      action: NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder'
    },
    {
      name: 'Rename',
      action: NodeMenuItemAction.Rename,
      cssClass: 'rename'
    },
    {
      name: 'Remove',
      action: NodeMenuItemAction.Remove,
      cssClass: 'remove'
    }
  ];

  private disposersForGlobalListeners: Function[] = [];

  public constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService
  ) {}

  public ngOnInit(): void {
    this.availableMenuItems = this.menuItems || this.availableMenuItems;
    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
  }

  public ngAfterViewInit(): void {
    this.positionMenu();
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  public onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void {
    if (isLeftButtonClicked(e)) {
      this.menuItemSelected.emit({
        nodeMenuItemAction: selectedMenuItem.action,
        nodeMenuItemSelected: selectedMenuItem.name
      });

      this.nodeMenuService.fireMenuEvent(e.target as HTMLElement, NodeMenuAction.Close);
    }
  }

  private positionMenu(): void {
    const menuContentElem = this.menuContent.nativeElement as HTMLElement;

    const elemBCR = menuContentElem.getBoundingClientRect();
    const elemTop = elemBCR.top;
    const elemHeight = elemBCR.height;

    const defaultDisplay = menuContentElem.style.display;
    menuContentElem.style.display = 'none';
    const scrollContainer = this.getScrollParent(menuContentElem);
    menuContentElem.style.display = defaultDisplay;

    let viewportBottom;
    if (scrollContainer) {
      const containerBCR = scrollContainer.getBoundingClientRect();
      const containerBottom = containerBCR.top + containerBCR.height;
      viewportBottom = containerBottom > window.innerHeight ? window.innerHeight : containerBottom;
    } else {
      viewportBottom = window.innerHeight;
    }

    const style = elemTop + elemHeight > viewportBottom ? 'bottom: 0' : 'top: 0';
    menuContentElem.setAttribute('style', style);

    if (this.cursorCoordinates && this.cursorCoordinates.x && this.cursorCoordinates.y) {
      const menuContainerElem = this.menuContainer.nativeElement as HTMLElement;
      menuContainerElem.setAttribute(
        'style',
        `position: fixed; top: ${this.cursorCoordinates.y}px; left: ${this.cursorCoordinates.x}px`
      );
    }
    setTimeout(() => (this.visibility = 'visible'));
  }

  private getScrollParent(node: HTMLElement): HTMLElement {
    if (node == null) {
      return null;
    }

    if (node.clientHeight && node.clientHeight < node.scrollHeight) {
      return node;
    } else {
      return this.getScrollParent(node.parentElement);
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    // Check if the click is fired on an element inside a menu
    const containingTarget =
      this.menuContent.nativeElement !== e.target && this.menuContent.nativeElement.contains(e.target);

    if ((mouseClicked && !containingTarget) || isEscapePressed(e as KeyboardEvent)) {
      this.nodeMenuService.fireMenuEvent(e.target as HTMLElement, NodeMenuAction.Close);
    }
  }
}

export interface NodeMenuItem {
  name: string;
  action: NodeMenuItemAction;
  cssClass?: string;
}

export interface ICursorCoordinates {
  x?: number;
  y?: number;
}
