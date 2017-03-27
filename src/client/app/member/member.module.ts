import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routes } from './index';

import { MemberOverviewComponent, MemberRegisterComponent, MemberRegisterParentComponent, MemberDetailComponent } from './index';
import { MemberService, MemberResolver, MemberRegisterResolver } from './index';
import { MemberFilterPipe } from './index';
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
    MemberService
  ],
  declarations: [
    MemberOverviewComponent,
    MemberRegisterComponent,
    MemberRegisterParentComponent,
    MemberDetailComponent,
    MemberFilterPipe
  ]
})
export class MemberModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MemberModule,
      providers: [
        MemberService,
        MemberResolver,
        MemberRegisterResolver
      ]
    };
  }
}
