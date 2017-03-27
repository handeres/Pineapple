import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';
import { Page } from 'ui/page';

import 'rxjs/add/operator/pairwise';

import { RouterService, UsersService, NavItem } from '../../shared';
import { Event, EventService } from '../index';
import { DetailBase } from '../../shared/base';

/**
 *  Event Kompononte.
 *  Erstellen und editeren eines Events
 */
@Component({
  selector: 'app-event-detail',
  templateUrl: 'event/event-detail/event-detail.component.html',
  styleUrls: ['event/event-detail/event-detail.component.css']
})
export class EventDetailComponent extends DetailBase<Event> implements OnInit  {

    /**
     * Event das erstelt wird oder editiert
     */
    public event: Event;
    /**
     *  Event Daten Formular ViewChild
     */
    @ViewChild('eventDataFormComp')
    eventDataFormComp: RadDataFormComponent;

    constructor(private page: Page,
                private route: ActivatedRoute,
                protected routerService: RouterService,
                protected userService: UsersService,
                private eventService: EventService) {
        super(routerService,
              userService);
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.route.data.subscribe(data => {
            let eventData = data['event'];
            if (eventData === undefined) {
                let newDate = new Date();
                let timeFrom = newDate.getHours() + ':' + newDate.getMinutes();
                let timeTo = newDate.getHours() + ':' + newDate.getMinutes();

                this.event = new Event();
                this.event.from = newDate;
                this.event.to = newDate;
                this.event.timeFrom = timeFrom;
                this.event.timeTo = timeTo;
                this.page.actionBar.title = 'Neues Ereignis';
            }
            else {
                if (eventData.success !== undefined) {
                    if (eventData.success === false) {
                       this.onBack();
                    }
                } else {
                    this.event = data['event'][0];
                    this.page.actionBar.title = this.event.title;
                }
            }
        }));
    }

    /**
    *  Erzeugt oder updated einen Event
    */
    public onSave() {
        this.eventDataFormComp.dataForm.commitAll();
        if (this.eventDataFormComp.dataForm.hasValidationErrors()) {
            return;
        }
        this.routerService.isBusy = true;
        this.event.organisationId = this.userService.getOrganisationId();
        this.subscriptions.push(this.eventService.create(this.event)
            .subscribe(data => {
                if (data.success) {
                    this.onBack();
                } else {
                    this.routerService.isBusy = false;
                }
          }));
    }
}
