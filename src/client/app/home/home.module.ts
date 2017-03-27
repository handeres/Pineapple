import { NgModule } from '@angular/core';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptModule} from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HomeComponent } from './index';
import { routes } from './home.routes';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    NativeScriptFormsModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
