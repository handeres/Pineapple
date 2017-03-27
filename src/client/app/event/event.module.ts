import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './event.routes';

import {
  EventOverviewComponent,
  EventDetailComponent,
  EventService,
  EventResolver,
  EventDetailResolver,
  EventFilterPipe
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
    EventOverviewComponent,
    EventDetailComponent,
    EventFilterPipe
  ]
})
export class EventModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventModule,
      providers: [
        EventService,
        EventResolver,
        EventDetailResolver
      ]
    };
  }
}
