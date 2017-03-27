import { Component, Input } from '@angular/core';

import { RouterService } from '../../services/router/router.service';
import { NavItem } from '../../index';

@Component({
  selector: 'app-navigation',
  templateUrl: 'shared/components/navigation/navigation.component.html',
  styleUrls: ['shared/components/navigation/navigation.component.css']
})
export class NavigationComponent {

  @Input()
  public navItems: Array<NavItem> = [];

  constructor(private routerService: RouterService) { }

  public onNavigate(item: NavItem) {
      if (item.id === 'home') {
          this.routerService.navigateSlideRight(item.commands);
          return;
      }
      this.routerService.navigateSlideLeft(item.commands);
  }
}
