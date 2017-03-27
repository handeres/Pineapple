import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule, NSModuleFactoryLoader } from 'nativescript-angular/router';

import { NativeScriptUIDataFormModule } from 'nativescript-telerik-ui-pro/dataform/angular';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AbsenceModule } from './absence';
import { AuthenticationModule } from './authentication';
import { EventModule } from './event';
import { GroupModule } from './group';
import { HomeModule } from './home';
import { MemberModule } from './member';
import { OrganisationModule } from './organisation';
import { ParentModule } from './parent';
import { TimeTableModule } from './timetable';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptUIDataFormModule,
      HomeModule,
      AbsenceModule.forRoot(),
      AuthenticationModule.forRoot(),
      EventModule.forRoot(),
      GroupModule.forRoot(),
      MemberModule.forRoot(),
      OrganisationModule.forRoot(),
      ParentModule.forRoot(),
      TimeTableModule.forRoot(),
      SharedModule.forRoot(),
      routing
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
