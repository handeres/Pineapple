import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import { EventService } from '../service';
import { Event } from '../index';
import { DialogService, RouterService, UsersService } from '../../shared/services';
import { OverviewBase } from '../../shared/base';
import { NavItem } from '../../shared';

/**
 * Event Übersichtskomponente.
 * Listet alle Events in einer ListView auf.
 */
@Component({
  selector: 'event-overview',
  templateUrl: 'event/event-overview/event-overview.component.html',
  styleUrls: ['event/event-overview/event-overview.component.css']
})
export class EventOverviewComponent extends OverviewBase<Event> implements OnInit {

    constructor(protected route: ActivatedRoute,
                protected eventService: EventService,
                protected routerService: RouterService,
                protected usersService: UsersService,
                protected dialogService: DialogService) {
        super(dialogService,
              routerService,
              usersService,
              eventService);

        this.setDeleteConfirmText('Möchten Sie das Ereignis löschen?');
    }

    public ngOnInit(): void {
        /* Daten vom Resolver */
        this.subscriptions.push(this.route.data.subscribe(data => {
            let eventData = data['events'];
            if (eventData !== undefined) {
                this.items = eventData;
            }
        }));
    }

    /**
     *  Navigiert zur Event Detail Page zum erstellen eines Events
     */
    public onAdd(): void {
        this.routerService.navigateSlideLeft(['event/detail']);
    }

    /**
     * Navigiert zur Event Detail Page zum editieren eines Events
     * @param args
     */
    public onItemSelected(args: ListViewEventData): void {
        this.routerService.navigateSlideLeft(['event/detail', this.items[args.itemIndex]._id]);
    }
}
