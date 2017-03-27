import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './index';

import { GroupDetailComponent, GroupOverviewComponent } from './index';
import { GroupService, GroupResolver, GroupDetailResolver } from './index';
import { GroupFilterPipe } from './index';
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
    GroupDetailComponent,
    GroupOverviewComponent,
    GroupFilterPipe
  ]
})
export class GroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModule,
      providers: [
        GroupService,
        GroupResolver,
        GroupDetailResolver
      ]
    };
  }
}
