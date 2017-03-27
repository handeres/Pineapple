import { Component, OnInit } from '@angular/core';

import { RouterService } from '../../../shared';

/**
 * Registrierung Erfolgreich  Komponente.
 * Wir nach der erfolgreichen Registrierung als Organisation angezeigt
 */
@Component({
  selector: 'app-register-organisation-success',
  templateUrl: 'organisation/organisation-register/organisation-register-success/organisation-register-success.component.html',
  styleUrls: ['organisation/organisation-register/organisation-register-success/organisation-register-success.component.css']
})
export class OrganisationRegisterSuccessComponent implements OnInit {

  constructor(private routerService: RouterService) { }

  ngOnInit() {
  }

  /**
   * Navigiert zur Registrierung als Benutzer Page
   */
  public onRegister(): void {
    this.routerService.navigateSlideLeft(['authentication/register']);
  }

  /**
   * Navigiert zur Home Page
   */
  public onHome(): void {
    this.routerService.navigateSlideLeft(['']);
  }
}
