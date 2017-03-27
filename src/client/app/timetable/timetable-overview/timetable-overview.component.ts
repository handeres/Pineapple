import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import { TimetableDay } from '../model';
import { TimeTableService } from '../service';
import { UsersService, RouterService, DialogService } from '../../shared/services';
import { OverviewBase } from '../../shared/base';


/**
 * Gruppen Stundenplan.
 */
@Component({
  selector: 'app-timetable-overview',
  templateUrl: 'timetable/timetable-overview/timetable-overview.component.html',
  styleUrls: ['timetable/timetable-overview/timetable-overview.component.css']
})
export class TimeTableOverviewComponent extends OverviewBase<TimetableDay> implements OnInit {


    constructor(private route: ActivatedRoute,
                protected timeTableService: TimeTableService,
                protected usersService: UsersService,
                protected dialogService: DialogService,
                protected routerService: RouterService) {
        super(dialogService,
              routerService,
              usersService,
              timeTableService);
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.route.data.subscribe(data => {
            if (data === null) {
                return;
            }
            let timeTabelData = data['timetable'];
            if (timeTabelData !== undefined && timeTabelData !== null) {
                let days =  timeTabelData;
                if(undefined !== days) {
                    if (days.days !== undefined) {
                        this.items = days.days;
                    }
                }
            }
        }));
    }

    /**
     *  Nicht verwendet.
     */
    public onAdd(): void {
        /* not used */
    }

    /**
     *  Nicht verwendet.
     */
    public onItemSelected(args: ListViewEventData): void {
       /* not used */
    }
}
