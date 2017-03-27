import { Component, OnInit } from '@angular/core';


import { ConfigurationService, RouterService, SnackbarService, ImageService } from '../../../shared/services';
import { AuthenticationService } from '../../service';
import { SubscriptionBase } from '../../../shared/base';

/**
 * Passwort Login Komponente. Ermöglicht das einloggen.
 */
@Component({
  selector: 'password-login',
  templateUrl: 'authentication/login/password-login/password-login.component.html',
  styleUrls: ['authentication/login/password-login/password-login.component.css']
})
export class PasswordLoginComponent extends SubscriptionBase implements OnInit {


    /**
     * Passwort für das Formular
     * @type {string}
     */
    public password: string = '';
    /**
     * Benutzername für das Formular
     * @type {string}
     */
    public username: string = '';


    constructor(public routerService: RouterService,
                private authenticationService: AuthenticationService,
                private snackbarService: SnackbarService,
                private imageService: ImageService,
                private configurationService: ConfigurationService) {
        super();
    }

    public ngOnInit(): void {
        this.username = this.authenticationService.getLoginName();
    }

    /**
    *  Führt einen Login durch
    */
    public onSubmit(): void {
        this.routerService.isBusy = true;
        this.authenticationService.setPassword(this.password);
        this.subscriptions.push(this.authenticationService.login()
            .subscribe(data => {
                if (data.success) {
                    this.imageService.loadAllImages();
                    this.toast();
                    if (this.configurationService.organisationRole === data.role) {
                        this.routerService.navigateSlideLeft(['organisation/dashboard']);
                    }
                    else if (this.configurationService.parentRole === data.role) {
                        if (data.firstLogin) {
                            this.routerService.navigateSlideLeft(['parent/register/', data.contractId]);
                        } else {
                            this.routerService.navigateSlideLeft(['parent/dashboard']);
                        }
                    }
                    else {
                        this.routerService.navigateSlideLeft(['organisation/overview']);
                    }
                }
            }));
    }

    /**
    *  Erzeugt einen Toast und zeigt an welcher User eingeloggt ist
    */
    private toast(): void {
        this.snackbarService.makeText('Angemeldet als ' + this.authenticationService.getLoginName(), 10000);
    }

    /**
    *  Navigiert zur letzten Page zurück
    */
    public onBack(): void {
        this.routerService.navigateToPrevious(this);
    }
}
