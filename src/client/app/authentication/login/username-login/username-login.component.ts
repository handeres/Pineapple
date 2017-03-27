import { Component } from '@angular/core';

import { PageRoute } from 'nativescript-angular/router';
import { Page } from 'ui/page';

import * as EmailValidator from 'email-validator';

import { AuthenticationService } from '../../service';
import { DialogService, RouterService } from '../../../shared/services';
import { SubscriptionBase } from '../../../shared/base';

/**
 *  Benutzername Komponente. Eingabe, überprüfung und speichern des Benutzernames
 */
@Component({
  selector: 'username-login',
  templateUrl: 'authentication/login/username-login/username-login.component.html',
  styleUrls: ['authentication/login/username-login/username-login.component.css']
})
export class UsernameLoginComponent extends SubscriptionBase {

    /**
     *  Benutzername für das Formular
     */
    public userName: string;


    constructor(page: Page,
                private routerService: RouterService,
                private authenticationService: AuthenticationService,
                private pageRoute: PageRoute,
                private dialogService: DialogService) {
        super();
        page.actionBarHidden = false;
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe(params => {
                this.authenticationService.logout();
                this.userName = this.authenticationService.getLoginName();
            });
    }


    /**
     *  Validiert E-Mail und navigiert auf die Passwort Page
     */
    public onSubmit(): void {
        if (!EmailValidator.validate(this.userName)) {
            this.dialogService.confirm ('Bitte ein gültige E-Mail Adresse eingeben!');
            return;
        }
        this.routerService.isBusy = true;
        this.authenticationService.setLoginName(this.userName);
        this.subscriptions.push(this.authenticationService.validateUser().subscribe(data => {
            if (data.success) {
                this.routerService.navigateSlideLeft(['authentication/password']);
            }
        }));
    }

    /**
     *  Navigiert zur Registierungs Page
     */
    public onRegister(): void {
        this.routerService.navigateSlideLeft(['authentication/register']);
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack(): void {
        this.routerService.navigateToPrevious(this);
    }
}
