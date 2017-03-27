import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import { Page } from 'ui/page';

import { Organisation } from '../model/organisation';
import { OrganisationService } from '../service/organisation.service';
import { DialogService, RouterService, UsersService } from '../../shared/services';
import { DetailBase } from '../../shared/base';

/**
 * Organisations Dashboard Komponente
 */
@Component({
  selector: 'app-register-organisation',
  templateUrl: 'organisation/organisation-register/organisation-register.component.html',
  styleUrls: ['organisation/organisation-register/organisation-register.component.css']
})
export class OrganisationRegisterComponent extends DetailBase<Organisation> implements OnInit {

    /**
     * Organisation für das Formular
     */
    public organisation: Organisation;
    /**
     *  TRUE wenn nach dem ersten Login die Komponente aufgerufen wird
     */
    public isFirstLogin: boolean;

    /**
     *  Adress Daten Formular ViewChild
     */
    @ViewChild('adressDataFormComp')
    adressDataFormCompRad: RadDataFormComponent;
    /**
     *  Organisationsnamen Formular ViewChild.
     *  Notwendig, da das RadDataFormComponent keine Nested Daten verarbeiten kann
     */
    @ViewChild('organisationDataFormComp')
    organisationDataFormComp: RadDataFormComponent;

    constructor(private page: Page,
                private route: ActivatedRoute,
                protected routerService: RouterService,
                private organisationService: OrganisationService,
                protected usersService: UsersService,
                private dialogService: DialogService) {
        super(routerService,
              usersService);
        this.organisation = new Organisation();
        this.isEditMode = false;
    }

    ngOnInit() {
        this.isFirstLogin = this.usersService.getIsFirstLogin();
        this.organisation.form.name = this.organisation.name;

        this.subscriptions.push(this.route.data.subscribe(data => {
          if (data !== undefined && data !== null) {
              let organisation = data['organisation'];
              if (organisation !== undefined) {
                  this.page.actionBar.title = 'Organisation editieren';
                  this.organisation._id = organisation[0]._id;
                  this.organisation.name = organisation[0].name;
                  this.organisation.adress = organisation[0].adress;
                  this.organisation.form.name = this.organisation.name;
                  this.isEditMode = true;
              }
          }
        }));
    }

    /**
     *  Erzeugt oder updated eine Organisation auf dem Server
     */
    public onSubmit(): void {
        this.organisationDataFormComp.dataForm.commitAll();
        this.adressDataFormCompRad.dataForm.commitAll();

        if (    (false === this.adressDataFormCompRad.dataForm.hasValidationErrors())
             && (false === this.organisationDataFormComp.dataForm.hasValidationErrors())) {
            this.routerService.isBusy = true;
            this.organisation.name = this.organisation.form.name;
            this.subscriptions.push(this.organisationService.create(this.organisation)
                .subscribe(
                    data => {
                        if (data.success) {
                            if (this.isEditMode) {
                                this.onBack();
                            } else {
                                this.routerService.navigateSlideLeft(['organisation/success']);
                            }
                        } else {
                            this.routerService.isBusy = false;
                        }
                  }));
        } else {
          this.dialogService.confirm('Bitte alle geforderten Felder ausfüllen');
        }
    }

}
