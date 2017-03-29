import { Component, OnInit, ViewChild } from '@angular/core';

import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import { Register } from '../model';
import { AuthenticationService } from '../service';
import { DialogService, RouterService } from '../../shared/services';
import { SubscriptionBase } from '../../shared/base';

/**
 * Registeriungs Komponente. Ermöglicht das registrieren als Benutzer.
 */
@Component({
  selector: 'auth-register',
  templateUrl: 'authentication/register/register.component.html',
  styleUrls: ['authentication/register/register.component.css']
})
export class RegisterComponent extends SubscriptionBase implements OnInit {

    public model: Register;
    @ViewChild('registerDataFormComp') registerDataFormComp: RadDataFormComponent;

    constructor (private authenticationService: AuthenticationService,
                 private routerService: RouterService,
                 private dialogService: DialogService) {
        super();
    }

    ngOnInit() {
        this.model = new Register();
    }


    /**
     * Registrierung des Benutzers
     */
    public onSubmit(): void {
        if (this.model.password !== this.model.password2) {
            this.dialogService.confirm('Kennwörter sind nicht identisch');
            return;
        }
        this.registerDataFormComp.dataForm.commitAll();
        if (true === this.registerDataFormComp.dataForm.hasValidationErrors()) {
            return;
        }
        this.subscriptions.push(this.authenticationService.register(this.model)
            .subscribe(data => {
                if (data.success) {
                    this.routerService.navigateSlideLeft(['authentication/login']);
                }
            }));
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack(): void {
        this.routerService.navigateToPrevious(this);
    }
}
