import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import { Group } from '../model';
import { GroupService } from '../service';
import { UsersService, RouterService, DialogService } from '../../shared/services';
import { OverviewBase } from '../../shared/base';


/**
 * Gruppen Übersichtskomponente.
 * Listet alle Gruppen in einer ListView auf. Eine Gruppe ist eine Kindergarten Klasse.
 */
@Component({
  selector: 'app-group-overview',
  templateUrl: 'group/group-overview/group-overview.component.html',
  styleUrls: ['group/group-overview/group-overview.component.css']
})
export class GroupOverviewComponent extends OverviewBase<Group> implements OnInit {


    constructor(private route: ActivatedRoute,
                protected groupService: GroupService,
                protected usersService: UsersService,
                protected dialogService: DialogService,
                protected routerService: RouterService) {
        super(dialogService,
              routerService,
              usersService,
              groupService);

        this.setDeleteConfirmText('Möchten Sie die Klasse löschen?')
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.route.data.subscribe(data => {
            this.items = data['groups'];
            if (this.items !== undefined) {
                this.groupService.setImageSource(this.items);
            }
        }));
    }

    /**
     *  Navigiert zur Group Register Page
     */
    public onAdd(): void {
        this.routerService.navigateSlideLeft(['group/register']);
    }

    /**
     *  Navigiert zum editieren der Gruppe bei einer Organisation. Bei den Eltern wird die Klassenliste angezeigt
     */
    public onItemSelected(args: ListViewEventData): void {
        this.routerService.navigateSlideLeft(['group/detail', this.items[args.itemIndex]._id]);
    }
}
