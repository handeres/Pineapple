import { Component, Input, ViewChild, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Page } from 'ui/page';
import { isAndroid } from 'platform';
import { ActionItem } from 'ui/action-bar';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui-pro/sidedrawer/angular';
import { PushTransition, SlideInOnTopTransition } from 'nativescript-telerik-ui-pro/sidedrawer';

import { NavMenuItem } from '../nav-menu-item';

import { ConfigurationService, RouterService } from '../../';

@Component({
  selector: 'side-drawer',
  templateUrl: 'shared/ui/side-drawer/side-drawer.component.html',
  styleUrls: ['shared/ui/side-drawer/side-drawer.component.css']
})
export class SideDrawerComponent implements AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

  /**
   * On tap of any side-drawer item, hiding content if this flag is true.
   */
  isContentVisible: boolean = true;

  /**
   * For android using SlideOnTop transition and for iOS, push transition.
   */
  drawerTransition: any;

  /**
   * Navigation Menu Items
   */
  @Input()
  navMenu: Array<NavMenuItem> = [];
  /**
   * Benutzername
   */
  @Input()
  username: string = 'unbekannt';

  private drawer: SideDrawerType;

  constructor(
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute,
    private page: Page,
    private ngZone: NgZone,
    private configurationService: ConfigurationService
  ) {
    this.setActionBarIcon(this.page);
    this.setDrawerTransition();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  ngOnDestroy() {
    this.drawer.off('drawerClosed');
  }

  toggleSideDrawer() {
    this.drawer.toggleDrawerState();
  }

  /**
   * Navigates to next page after drawer is closed.
   */
  navigateTo(navItem: NavMenuItem) {
    this.drawer.closeDrawer();
    let currentUrl = this.routerService.routerExtensions.router.routerState.snapshot.url;
    let newUrlTree = this.routerService.routerExtensions.router.createUrlTree(navItem.commands);
    let newUrl = this.routerService.routerExtensions.router.serializeUrl(newUrlTree);
    if (currentUrl !== newUrl) {
      this.isContentVisible = false;

      this.drawer.on('drawerClosed', () => {
        if (typeof navItem.callback === 'function') {
          navItem.callback();
        }

        this.ngZone.run(() => {
          this.routerService.navigateSlideLeft(navItem.commands, navItem.clearHistory);
          this.isContentVisible = true;
        });
        this.drawer.off('drawerClosed');
      });
    }
  }

  private setDrawerTransition() {
    if (isAndroid) {
      this.drawerTransition = new SlideInOnTopTransition();
    }
  }

  private setActionBarIcon(page: Page) {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton();
    }
  }

  private getNavigationButton() {
    let navActionItem = new ActionItem();
    navActionItem.icon = 'res://ic_menu_white';
    navActionItem.on('tap', this.toggleDrawer.bind(this));
    return navActionItem;
  }

  private toggleDrawer() {
    this.drawer.toggleDrawerState();
  }
}
