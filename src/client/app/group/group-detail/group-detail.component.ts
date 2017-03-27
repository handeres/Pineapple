import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PageRoute  } from 'nativescript-angular/router';
import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import { Page } from 'ui/page';

import { ImageService, RouterService, UsersService, DialogService } from '../../shared/services';
import { DetailBase } from '../../shared/base';

import { GroupService } from '../service';
import { Group } from '../model';

/**
 *  Gruppen Komponente.
 *  Erstellen und editeren einer Gruppe bzw. einer Kindergarten Klasse
 */
@Component({
  selector: 'app-group-detail',
  templateUrl: 'group/group-detail/group-detail.component.html',
  styleUrls: ['group/group-detail/group-detail.component.css']
})
export class GroupDetailComponent extends DetailBase<Group> implements OnInit {

    /**
     * Gruppe die erstellt oder editiert wird
     */
    public group: Group;
    /**
     *  Gruppen Daten Formular ViewChild
     */
    @ViewChild('groupDetailDataFormComp')
    groupDetailDataFormComp: RadDataFormComponent;

    constructor(private page: Page,
                protected routerService: RouterService,
                private route: ActivatedRoute,
                private pageRoute: PageRoute,
                protected userService: UsersService,
                private imageService: ImageService,
                private dialogService: DialogService,
                private groupService: GroupService) {
        super(routerService,
              userService);
        this.group = new Group();
        this.isEditMode = false;
    }

    ngOnInit() {
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params )
            .subscribe(params => {
                this.id = params['id'];
                if (undefined !== this.id) {
                    this.isEditMode = true;
                } else {
                    this.page.actionBar.title = 'Klasse erstellen';
                    this.group.imageSource = this.imageService.getImageFromCache(this.group._id);
                }
            });
            /* Daten vom Resolver */
            this.subscriptions.push(this.route.data.subscribe(data => {
                if (data !== undefined && data !== null) {
                    let group = data['group'];
                    if (group !== undefined) {
                        this.group = group[0];
                        if (undefined !== this.group) {
                            this.group.imageSource =  this.imageService.getImageFromCache(this.group._id);
                        }
                    }
                }
            }));
    }


    /**
     *  Navigiert zur Kinder Übersicht einer Klasse
     */
    public onMemberOverview(): void {
        this.routerService.navigateSlideLeft(['member/overview', this.id, { filter: 'group' }]);
    }

    /**
     *  Navigiert zur Stundenpan Übersicht einer Klasse
     */
    public onTimeTableOverview(): void {
        if (this.isOrganisation) {
            this.routerService.navigateSlideLeft(['timetable/detail', this.id]);
        } else {
            this.routerService.navigateSlideLeft(['timetable/overview', this.id]);
        }
    }

    /**
     *  Speichert eine Gruppe. Falls ein neues Bild selektiert wurde, wir auch dieses gespeichert
     */
    public onSubmit(): void {
        this.groupDetailDataFormComp.dataForm.commitAll();
        if (true === this.groupDetailDataFormComp.dataForm.hasValidationErrors()) {
            return;
        }
        this.routerService.isBusy = true;
        /* Wenn ein neues Bild ausgewählt wurde, wird dies gespeichert */
        if (this.isEditMode) {
            if (this.imageService.hasNewImage(this.group._id)) {
                this.subscriptions.push(this.imageService.saveImage(this.group._id)
                    .subscribe(
                        data => {

                        }));
            }
        }
        this.subscriptions.push(this.groupService.create(this.group)
          .subscribe(
            data => {
                if (data.success) {
                    if (this.isEditMode) {
                        this.onBack();
                    } else {
                        if (this.imageService.hasNewImage(data.userData)) {
                            this.group._id = data.userData;
                            this.subscriptions.push(this.imageService.saveImage(data.userData)
                                .subscribe(imageData => {
                                        this.editTimeTable(data.userData);
                                    }));
                        } else {
                            this.editTimeTable(data.userData);
                        }
                    }
                }
            }));
    }

    private editTimeTable(groupId: string): void {
        let context = this;
        this.dialogService.confirmNowLater('Möchten Sie jetzt den Stundenplan erstellen?', 'Stundenplan').then(function (result) {
            if (result) {
                context.routerService.navigateSlideLeft(['timetable/detail/' + groupId], false, false);
            } else {
                context.onBack();
            }
        });
    }

    /**
     *  Öffnen des Image Dialog des Device um eine Bild auszuwählen
     */
    public onSelectSingleTap(args): void  {
        this.imageService.openNew(this.group._id, this.group);
    }
}
