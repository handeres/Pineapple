import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageRoute  } from 'nativescript-angular/router';
import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import 'rxjs/add/operator/pairwise';

import { RouterService, UsersService } from '../../shared';
import { TimetableDay, Timetable, TimetableForm, TimeTableService } from '../index';
import { DetailBase } from '../../shared/base';

/**
 *  Event Kompononte.
 *  Erstellen und editeren eines Events
 */
@Component({
  selector: 'app-timetable-detail',
  templateUrl: 'timetable/timetable-detail/timetable-detail.component.html',
  styleUrls: ['timetable/timetable-detail/timetable-detail.component.css']
})
export class TimeTableDetailComponent extends DetailBase<TimetableDay> implements OnInit  {

    /**
     * Event das erstelt wird oder editiert
     */
    public itemForm: TimetableForm;
    /**
     * Timetable für
     */
    private timeTable: Timetable;
    /**
     * Id der timeTable Tabelle
     */
    private _id: string;
    /**
     *  Event Daten Formular ViewChild
     */
    @ViewChild('timetableDataFormComp')
    timetableDataFormComp: RadDataFormComponent;

    constructor(private route: ActivatedRoute,
                private pageRoute: PageRoute,
                protected routerService: RouterService,
                protected userService: UsersService,
                private timetableService: TimeTableService) {
        super(routerService,
              userService);
        this.itemForm = new TimetableForm();
    }

    public ngOnInit(): void {
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params )
            .subscribe(params => {
                this.id = params['id'];
            });

        this.subscriptions.push(this.route.data.subscribe(data => {
            if (null === data) {
                return;
            }
            let timetableData = data['timetable'];
            if (timetableData !== undefined) {
                if (timetableData._id !== undefined) {
                    this._id = timetableData._id;
                    this.transformateToForm(timetableData.days);
                }
            }
        }));
    }

    /**
    *  Erzeugt oder updated einer timetable
    */
    public onSubmit(): void {
        this.timetableDataFormComp.dataForm.commitAll();
        if (this.timetableDataFormComp.dataForm.hasValidationErrors()) {
            return;
        }
        this.routerService.isBusy = true;
        this.transformateToTable();
        this.subscriptions.push(this.timetableService.create(this.timeTable)
            .subscribe(data => {
                if (data.success) {
                    /* Nicht cachen */
                    this.routerService.navigateSlideRight(['group/detail/', this.id], false, false);
                } else {
                    this.routerService.isBusy = false;
                }
          }));
    }

    public onBackGroupDetail(): void {
        this.routerService.pop();
        this.routerService.navigateSlideRight(['group/detail/', this.id], false, false);
    }

    /**
     * Leider notwendig, da Formular keine Array darstellen kann
     */
    private transformateToTable() {
        this.timeTable = new Timetable();
        this.timeTable._id = this._id;
        this.timeTable.groupId = this.id;

        let monday = new TimetableDay();
        monday.textMorning = this.itemForm.monday_textMorning;
        monday.timefromMorning = this.itemForm.monday_timefromMorning;
        monday.timeToMorning = this.itemForm.monday_timeToMorning;
        monday.textAfternoon = this.itemForm.monday_textAfternoon;
        monday.timefromAfternoon = this.itemForm.monday_timefromAfternoon;
        monday.timeToAfternoon = this.itemForm.monday_timeToAfternoon;
        this.timeTable.days.push(monday);

        let tuesday = new TimetableDay();
        tuesday.textMorning = this.itemForm.tuesday_textMorning;
        tuesday.timefromMorning = this.itemForm.tuesday_timefromMorning;
        tuesday.timeToMorning = this.itemForm.tuesday_timeToMorning;
        tuesday.textAfternoon = this.itemForm.tuesday_textAfternoon;
        tuesday.timefromAfternoon = this.itemForm.tuesday_timefromAfternoon;
        tuesday.timeToAfternoon = this.itemForm.tuesday_timeToAfternoon;
        this.timeTable.days.push(tuesday);

        let wednesday = new TimetableDay();
        wednesday.textMorning = this.itemForm.wednesday_textMorning;
        wednesday.timefromMorning = this.itemForm.wednesday_timefromMorning;
        wednesday.timeToMorning = this.itemForm.wednesday_timeToMorning;
        wednesday.textAfternoon = this.itemForm.wednesday_textAfternoon;
        wednesday.timefromAfternoon = this.itemForm.wednesday_timefromAfternoon;
        wednesday.timeToAfternoon = this.itemForm.wednesday_timeToAfternoon;
        this.timeTable.days.push(wednesday);

        let thursday = new TimetableDay();
        thursday.textMorning = this.itemForm.thursday_textMorning;
        thursday.timefromMorning = this.itemForm.thursday_timefromMorning;
        thursday.timeToMorning = this.itemForm.thursday_timeToMorning;
        thursday.textAfternoon = this.itemForm.thursday_textAfternoon;
        thursday.timefromAfternoon = this.itemForm.thursday_timefromAfternoon;
        thursday.timeToAfternoon = this.itemForm.thursday_timeToAfternoon;
        this.timeTable.days.push(thursday);

        let friday = new TimetableDay();
        friday.textMorning = this.itemForm.friday_textMorning;
        friday.timefromMorning = this.itemForm.friday_timefromMorning;
        friday.timeToMorning = this.itemForm.friday_timeToMorning;
        friday.textAfternoon = this.itemForm.friday_textAfternoon;
        friday.timefromAfternoon = this.itemForm.friday_timefromAfternoon;
        friday.timeToAfternoon = this.itemForm.friday_timeToAfternoon;
        this.timeTable.days.push(friday);
    }

    /**
     * Empfangene Array wird umgemappt auf Struktur.
     * Leider notwendig wegene Telerik Formular
     * @param data
     */
    private transformateToForm(data): void {
        this.itemForm.monday_textMorning = data[0].textMorning;
        this.itemForm.monday_timefromMorning = data[0].timefromMorning;
        this.itemForm.monday_timeToMorning = data[0].timeToMorning;
        this.itemForm.monday_textAfternoon = data[0].textAfternoon;
        this.itemForm.monday_timefromAfternoon = data[0].timefromAfternoon;
        this.itemForm.monday_timeToAfternoon = data[0].timeToAfternoon;

        this.itemForm.tuesday_textMorning = data[1].textMorning;
        this.itemForm.tuesday_timefromMorning  = data[1].timefromMorning;
        this.itemForm.tuesday_timeToMorning = data[1].timeToMorning;
        this.itemForm.tuesday_textAfternoon = data[1].textAfternoon;
        this.itemForm.tuesday_timefromAfternoon  = data[1].timefromAfternoon;
        this.itemForm.tuesday_timeToAfternoon = data[1].timeToAfternoon;

        this.itemForm.wednesday_textMorning = data[2].textMorning;
        this.itemForm.wednesday_timefromMorning = data[2].timefromMorning;
        this.itemForm.wednesday_timeToMorning = data[2].timeToMorning;
        this.itemForm.wednesday_textAfternoon = data[2].textAfternoon;
        this.itemForm.wednesday_timefromAfternoon = data[2].timefromAfternoon;
        this.itemForm.wednesday_timeToAfternoon = data[2].timeToAfternoon;

        this.itemForm.thursday_textMorning = data[3].textMorning;
        this.itemForm.thursday_timefromMorning = data[3].timefromMorning;
        this.itemForm.thursday_timeToMorning  = data[3].timeToMorning;
        this.itemForm.thursday_textAfternoon = data[3].textAfternoon;
        this.itemForm.thursday_timefromAfternoon  = data[3].timefromAfternoon;
        this.itemForm.thursday_timeToAfternoon = data[3].timeToAfternoon;


        this.itemForm.friday_textMorning = data[4].textMorning;
        this.itemForm.friday_timefromMorning = data[4].timefromMorning;
        this.itemForm.friday_timeToMorning  = data[4].timeToMorning;
        this.itemForm.friday_textAfternoon = data[4].textAfternoon;
        this.itemForm.friday_timefromAfternoon  = data[4].timefromAfternoon;
        this.itemForm.friday_timeToAfternoon = data[4].timeToAfternoon;
    }
}
