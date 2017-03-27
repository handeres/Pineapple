import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { WrapLayout } from 'ui/layouts/wrap-layout';

import { CardViewItem, NavMenuItem, RouterService, UsersService } from '../../shared';
import { AuthenticationService } from '../../authentication';

/**
 * Parent Dashboard Komponente
 */
@Component({
    selector: 'parent-dashboard',
    templateUrl: 'parent/parent-dashboard/parent-dashboard.component.html',
    styleUrls: ['parent/parent-dashboard/parent-dashboard.component.css']
})
export class ParentDashboardComponent implements AfterViewInit, OnInit {

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
                private authenticationService: AuthenticationService,
                private useresService: UsersService) {
    }

    public ngOnInit(): void {
        this.cardViews.push({
            id: 'class',
            image: 'res://classes',
            title: 'Klassen',
            actions: []
        });
        this.cardViews.push({
            id: 'event',
            image: 'res://events',
            title: 'Ereignis',
            actions: []
        });
        this.cardViews.push({
            id: 'absence',
            image: 'res://absences',
            title: 'Absenzen',
            actions: [
                { image: 'res://ic_menu_add', callback: () => this.routerService.navigateSlideLeft(['absence/register', { filter: 'register' }]) }
            ]
        });
        this.cardViews.push({
            id: 'child',
            image: 'res://child',
            title: 'Kinder',
            actions: [
                { image: 'res://ic_menu_add', callback: () => this.routerService.navigateSlideLeft(['member/registerParent']) }
            ]
        });

        this.navMenu.push({ name: 'Registriere ein weiteres Kind', commands: ['member/registerParent'] });
        this.navMenu.push({ name: 'Melde Abwesenheit', commands: ['absence/register/', { filter: 'register' }] });
        this.navMenu.push({ name: 'Persönliche Angaben', commands: ['parent/detail', this.useresService.getParentId()]});
        this.navMenu.push({
            name: 'Abmelden',
            commands: [''],
            callback: () => this.onLogout(),
            clearHistory: true
        });

        this.username = this.useresService.getUserName();
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
        switch (component) {
            case 'class': { this.routerService.navigateSlideLeft(['group/overview', { filter: 'parent' }]); break; }
            case 'event': { this.routerService.navigateSlideLeft(['event']); break; }
            case 'pinnwand': { break; }
            case 'absence': { this.routerService.navigateSlideLeft(['absence/overview', { filter: 'parentOrOrganisation' }]); break; }
            case 'message': { break; }
            case 'parent': { break; }
            case 'child': { this.routerService.navigateSlideLeft(['member/overview/', { filter: 'parent' }]); break; }
            default: { break; }
        }
    }

    /**
     *  Abmelden als Benutzer
     */
    private onLogout(): void {
        this.authenticationService.logout();
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack(): void {
        this.routerService.navigateToPrevious();
    }
}
