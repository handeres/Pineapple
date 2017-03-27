import { AbsenceRegisterComponent, AbsenceOverviewComponent, AbsenceResolver } from './index';

export const routes = [
    {
        path: '',
        component: AbsenceRegisterComponent
    },
    {
        path: 'register',
        component: AbsenceRegisterComponent,
        resolve: {
            absence: AbsenceResolver
        }
    },
    {
        path: 'overview',
        component: AbsenceOverviewComponent,
        resolve: {
            absences: AbsenceResolver
        }
    },
    {
        path: 'overview/:id',
        component: AbsenceOverviewComponent,
        resolve: {
            absences: AbsenceResolver
        }
    },
    {
        path: 'detail/:id',
        component: AbsenceRegisterComponent,
        resolve: {
            absence: AbsenceResolver
        }
    },
];
