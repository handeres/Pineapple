import { AfterViewInit, Component, ElementRef, OnInit, ViewChild  } from '@angular/core';

import { WrapLayout } from 'ui/layouts/wrap-layout';

import { CardViewItem, NavMenuItem } from '../../shared';
import { AuthenticationService } from '../../authentication';
import { RouterService, UsersService } from '../../shared/services';

/**
 * Organisations Dashboard Komponente
 */
@Component({
    selector: 'organisation-dashboard',
    templateUrl: 'organisation/organisation-dashboard/organisation-dashboard.component.html',
    styleUrls: ['organisation/organisation-dashboard/organisation-dashboard.component.css']
})
export class OrganisationDashboardComponent implements AfterViewInit, OnInit {

    /**
     * Array von CardView Items für das Dashboard
     * @type {Array}
     */
    public cardViews: Array<CardViewItem> = [];
    /**
     * Array von NavMenuItem für den Sidedrawer
     * @type {Array}
     */
    public navMenu: Array<NavMenuItem> = [];
    /**
     * Benutzername
     * @type {string}
     */
    public username: string;
    /**
     * Element Referenz auf Container
     */
    @ViewChild('container')
    container: ElementRef;

    constructor(private routerService: RouterService,
                private usersService: UsersService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.cardViews.push({
            id: 'class',
            image: 'res://classes',
            title: 'Klassen',
            actions: [
                { image: 'res://ic_menu_add', callback: () => this.routerService.navigateSlideLeft(['group/register'])}
            ]
        });
        this.cardViews.push({
            id: 'event',
            image: 'res://events',
            title: 'Ereignis',
            actions: [
                { image: 'res://ic_menu_add', callback: () => this.routerService.navigateSlideLeft(['event/detail']) }
            ]
        });
        this.cardViews.push({
            id: 'absence',
            image: 'res://absences',
            title: 'Absenzen',
            actions: []
        });
        this.cardViews.push({
            id: 'child',
            image: 'res://child',
            title: 'Kinder',
            actions: [
                { image: 'res://ic_menu_add', callback: () => this.routerService.navigateSlideLeft(['member/register']) }
            ]
        });

        this.navMenu.push({ name: 'Neue Klasse', commands: ['group/register']});
        this.navMenu.push({ name: 'Neues Kind', commands: ['member/register']});
        this.navMenu.push({ name: 'Profil', commands: ['organisation/detail/' + this.usersService.getOrganisationId()]});
        this.navMenu.push({
            name: 'Abmelden',
            commands: [''],
            callback: () => this.onLogout(),
            clearHistory: true
        });
        this.username = this.usersService.getUserName();
    }

    public ngAfterViewInit(): void {
        let self = this;
        let container = <WrapLayout>this.container.nativeElement;
        for (let i = 0; i < container.getChildrenCount(); i++) {
            let cardView = container.getChildAt(i);
            cardView.on('tap', function(args) {
                self.onNavigate(args.object.get('id'));
            });
        }
    }

    /**
     * Navigiert zu einer Page
     * @param component
     */
    public onNavigate(component: string): void {
        this.routerService.isBusy = true;
        switch (component) {
            case 'class': { this.routerService.navigateSlideLeft(['group/overview/', { filter: 'organisation' }]); break; }
            case 'event': { this.routerService.navigateSlideLeft(['event']); break; }
            case 'absence': { this.routerService.navigateSlideLeft(['absence/overview', { filter: 'parentOrOrganisation' }]); break; }
            case 'parent': { break; }
            case 'child': { this.routerService.navigateSlideLeft(['member/overview/', { filter: 'organisation' }]); break; }
            case 'addChild': { this.routerService.navigateSlideLeft(['member/register']); break; }
            default: { this.routerService.isBusy = false; break; }
        }
    }

    /**
     *  Abmelden als Benutzer
     */
    public onLogout(): void {
        this.authenticationService.logout();
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack(): void {
        this.routerService.navigateToPrevious();
    }
}
