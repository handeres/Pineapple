import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './parent.routes';

import { ParentRegisterComponent, ParentDashboardComponent } from './index';
import { ParentService, ParentFilterPipe, ParentResolver } from './index';
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
    ParentRegisterComponent,
    ParentDashboardComponent,
    ParentFilterPipe
  ]
})
export class ParentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ParentModule,
      providers: [
        ParentService,
        ParentResolver
      ]
    };
  }
}
