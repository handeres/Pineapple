import { OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SubscriptionBase } from './';
import { NavItem, UsersService, RouterService } from '../../shared';

/**
 * Basis Klasse für das unsubscribe von subscriptions
 */
export class Base extends SubscriptionBase {

    /**
     * Liste aller navigation items
     * @type {Array}
     */
    public navItems: Array<NavItem> = [];

    /**
     * TRUE == Bei aktiver Organisations Rolle , FALSE == Bei aktiver Parent Rolle
     */
    public isOrganisation: boolean;

    constructor(protected usersService: UsersService,
                protected routerService: RouterService) {
        super();
        this.isOrganisation = this.usersService.hasOrganisationRole();

        this.navItems.push({ index: 0, id: 'home', name: 'Home', commands: [this.isOrganisation ? 'organisation/dashboard' : 'parent/dashboard'], clearHistory: true });
        this.navItems.push({ index: 1, id: 'group', name: 'Klassen', commands: ['group/overview/', { filter: this.isOrganisation ? 'organisation' : 'parent' }] });
        this.navItems.push({ index: 2, id: 'event', name: 'Ereignis', commands: ['event'] });
        this.navItems.push({ index: 3, id: 'absence', name: 'Absenzen', commands: ['absence/overview', { filter: 'parentOrOrganisation' }] });
        this.navItems.push({ index: 4, id: 'child', name: 'Kinder', commands: ['member/overview/', { filter: this.isOrganisation ? 'organisation' : 'parent' }] });
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack() {
        this.routerService.navigateToPrevious(this);
    }
}
