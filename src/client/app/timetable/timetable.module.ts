import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './timetable.routes';

import {
  TimeTableOverviewComponent,
  TimeTableDetailComponent,
  TimeTableService,
  TimeTableResolver,
  TimeTableFilterPipe
} from './index';
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
    TimeTableOverviewComponent,
    TimeTableDetailComponent,
    TimeTableFilterPipe
  ]
})
export class TimeTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimeTableModule,
      providers: [
        TimeTableService,
        TimeTableResolver,
      ]
    };
  }
}
