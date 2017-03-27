import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes as homeRoutes } from './home';

const appRoutes = [
    ...homeRoutes,
        {
            path: 'absence',
            loadChildren: './absence/absence.module#AbsenceModule'
        },
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        },
        {
            path: 'event',
            loadChildren: './event/event.module#EventModule'
        },
        {
            path: 'group',
            loadChildren: './group/group.module#GroupModule'
        },
        {
            path: 'member',
            loadChildren: './member/member.module#MemberModule'
        },
        {
            path: 'organisation',
            loadChildren: './organisation/organisation.module#OrganisationModule'
        },
        {
            path: 'parent',
            loadChildren: './parent/parent.module#ParentModule'
        },
        {
            path: 'timetable',
            loadChildren: './timetable/timetable.module#TimeTableModule'
        }
];

export const routing = NativeScriptRouterModule.forRoot(appRoutes);
