import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import frameModule = require('ui/frame');

import { Absence } from '../model/absence';
import { AbsenceService } from '../service/absence.service';
import { RouterService, UsersService, DialogService } from '../../shared/services';
import { OverviewBase } from '../../shared/base';

/**
 * Absenzen Übersichtskomponente.
 * Listet alle Absenzen in einer ListView auf.
 */
@Component({
  selector: 'app-absence-overview',
  templateUrl: 'absence/absence-overview/absence-overview.component.html',
  styleUrls: ['absence/absence-overview/absence-overview.component.css']
})
export class AbsenceOverviewComponent extends OverviewBase<Absence> implements OnInit {


    constructor(private route: ActivatedRoute,
                protected routerService: RouterService,
                protected absenceService: AbsenceService,
                protected dialogService: DialogService,
                protected usersService: UsersService) {
        super(dialogService,
              routerService,
              usersService,
              absenceService);

        this.setDeleteConfirmText('Möchten Sie die Abwesenheit löschen?')
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.route.data.subscribe(data => {
            let result = data['absences'];
            if (result !== undefined) {
                this.items = result;
                this.absenceService.getImageSource(this.items);
            }
        }));
    }

    /**
     * Navigiert zur Absenz Detail Ansicht
     */
    public onItemSelected(args: ListViewEventData): void {
        this.routerService.navigateSlideLeft(['absence/detail', this.items[args.itemIndex]._id]);
    }

    /**
     * Navigiert zur Absenz Registrierung
     */
    public onAdd(): void {
        this.routerService.navigateSlideLeft(['absence/register/', { filter: 'register' }]);
    }
}
