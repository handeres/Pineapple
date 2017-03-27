import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './index';
import { AbsenceOverviewComponent, AbsenceRegisterComponent } from './index';
import { AbsenceService, AbsenceFilterPipe, AbsenceResolver } from './index';
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
  providers: [
    DatePipe
  ],
  declarations: [
    AbsenceOverviewComponent,
    AbsenceRegisterComponent,
    AbsenceFilterPipe
  ]
})
export class AbsenceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AbsenceModule,
      providers: [
        AbsenceService,
        AbsenceResolver,
      ]
    };
  }
}
