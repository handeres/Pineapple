import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './organisation.routes';

import { OrganisationDashboardComponent, OrganisationRegisterComponent, OrganisationRegisterSuccessComponent } from './index';
import { OrganisationService, OrganisationFilterPipe, OrganisationResolver } from './index';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUIDataFormModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    OrganisationDashboardComponent,
    OrganisationRegisterComponent,
    OrganisationRegisterSuccessComponent,
    OrganisationFilterPipe,
  ]
})
export class OrganisationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrganisationModule,
      providers: [
        OrganisationService,
        OrganisationResolver
      ]
    };
  }
}
