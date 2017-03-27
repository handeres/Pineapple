import { Component,  OnInit } from '@angular/core';

import { Page } from 'ui/page';

import { ConfigurationService, UsersService, NotificationService, RouterService, SnackbarService, ImageService } from '../shared';

/**
 * Gruppen Übersichtskomponente.
 * Listet alle Gruppen in einer ListView auf. Eine Gruppe ist eine Kindergarten Klasse.
 */
@Component({
  selector: 'home-login',
  templateUrl: 'home/home.component.html',
  styleUrls: ['home/home.component.css']
})
export class HomeComponent implements OnInit {


    constructor(page: Page,
                private routerService: RouterService,
                private userService: UsersService,
                private configurationService: ConfigurationService,
                private snackbarService: SnackbarService,
                private imageService: ImageService,
                private notificationService: NotificationService) {
        page.actionBarHidden = true;
        routerService.navigate(['']);
    }

    public ngOnInit(): void {
        if (this.userService.isLoggedIn()) {
            /* Connect websockets */
            this.notificationService.connect();
            /* loading of the images */
            this.imageService.loadAllImages();
            this.snackbarService.makeText('Angemeldet als ' + this.userService.getUserName(), 10000);
            if (this.configurationService.organisationRole === this.userService.getUserRole()) {
                this.routerService.navigateSlideLeft(['organisation/dashboard']);
            }
            else if (this.configurationService.parentRole === this.userService.getUserRole()) {
                this.routerService.navigateSlideLeft(['parent/dashboard']);
            }
        }
    }

    /**
     *  Navigiert zur Login Page
     */
    public onLogin(): void {
        this.routerService.navigateSlideLeft(['authentication/login']);
    }

    /**
     *  Navigiert zur Organisations Registrierungs Page
     */
    public onRegisterOrganisation(): void {
        this.routerService.navigateSlideLeft(['organisation/register']);
    }

    /**
     *  Navigiert zur Parent Registrierungs Page
     */
    public onRegisterParent(): void {
        this.routerService.navigateSlideLeft(['authentication/register']);
    }
}