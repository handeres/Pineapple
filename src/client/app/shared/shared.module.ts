import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui-pro/sidedrawer/angular';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui-pro/listview/angular';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { SideDrawerComponent, BorderlessBtnDirective, BusyIndicatorComponent } from './index';

import {
  ConfigurationService,
  DialogService,
  ErrorHandlerService,
  ErrorLoggerService,
  JwtService,
  JwtHttpService,
  NotificationService,
  UsersService,
  ImageService,
  SnackbarService,
  RouterService,
  NavigationComponent,
  AutoGridPipe
} from './index';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUIDataFormModule
  ],
  declarations: [
    SIDEDRAWER_DIRECTIVES,
    SideDrawerComponent,
    BorderlessBtnDirective,
    BusyIndicatorComponent,
    LISTVIEW_DIRECTIVES,
    NavigationComponent,
    AutoGridPipe
  ],
  exports: [
    SideDrawerComponent,
    BorderlessBtnDirective,
    BusyIndicatorComponent,
    LISTVIEW_DIRECTIVES,
    NavigationComponent,
    AutoGridPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ConfigurationService,
        DialogService,
        ErrorLoggerService,
        ErrorHandlerService,
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        UsersService,
        JwtService,
        JwtHttpService,
        NotificationService,
        ImageService,
        SnackbarService,
        RouterService
      ]
    };
  }
}
