import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageRoute } from 'nativescript-angular/router';
import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import { Parent } from '../model';
import { ParentService } from '../service';

import { UsersService, DialogService, NotificationService, RouterService } from '../../shared';
import { DetailBase } from '../../shared/base';

/**
 * Parent Registrierungs und Detail Komponente
 */
@Component({
  selector: 'app-register-parent',
  templateUrl: 'parent/parent-register/parent-register.component.html',
  styleUrls: ['parent/parent-register/parent-register.component.css'],
})
export class ParentRegisterComponent extends DetailBase<Parent>  implements OnInit {

    /**
     * Parent für das Formular
     */
    public parent: Parent;
    /**
     * Vertags ID
     */
    private contractId: string;
    /**
     * TRUE wenn ein besthender Parent editiert wird
     */
    public isEditingDetail: boolean;
    /**
     *  Adress Daten Formular ViewChild
     */
    @ViewChild('adressDataFormComp')
    adressDataFormCompRad: RadDataFormComponent;

    constructor(private pageRoute: PageRoute,
                protected routerService: RouterService,
                private route: ActivatedRoute,
                protected usersService: UsersService,
                private dialogService: DialogService,
                private notificationService: NotificationService,
                private parentService: ParentService) {
        super(routerService,
              usersService);
        this.parent = new Parent();
        this.isEditingDetail = false;
    }

    ngOnInit() {
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe(params => {
                this.contractId = params['contractId'];
            });
        if (this.route.data !== undefined) {
            this.subscriptions.push(this.route.data.subscribe(data => {
                let parent = data['parent'];
                if (undefined !== parent) {
                    this.parent = parent[0];
                    this.isEditingDetail = true;
                }
            }));
        }
    }

    /**
     *  Speichert oder updated einen Parent auf dem Server
     */
    public onSubmit(): void {
        if (undefined !== this.contractId) {
            this.parent.contractId = this.contractId;
        }
        this.adressDataFormCompRad.dataForm.commitAll();
        if (false === this.adressDataFormCompRad.dataForm.hasValidationErrors()) {
            this.routerService.isBusy = true;
            this.subscriptions.push(this.parentService.create(this.parent)
                .subscribe(
                    data => {
                        if (data.success) {
                            if (false === this.isEditingDetail) {
                                this.usersService.saveParentId(data.parentId);
                                this.notificationService.connect();
                                this.routerService.navigateSlideLeft(['member/detail', data.memberId, { filter: 'detail' }]);
                            } else {
                               this.onBack();
                            }
                        }
                    }));
        } else {
            this.dialogService.confirm('Bitte alle geforderten Felder ausfüllen');
        }
    }
}
