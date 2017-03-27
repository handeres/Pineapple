import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './index';
import { UsernameLoginComponent, PasswordLoginComponent, RegisterComponent } from './index';
import { AuthenticationService } from './index';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUIDataFormModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    PasswordLoginComponent,
    RegisterComponent,
    UsernameLoginComponent
  ]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationService,
      ]
    };
  }
}
