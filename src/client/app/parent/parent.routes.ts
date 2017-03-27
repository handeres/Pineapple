import { ParentRegisterComponent, ParentDashboardComponent, ParentResolver } from './index';

export const routes = [
    {
        path: '',
        component: ParentDashboardComponent
    },
    {
        path: 'dashboard',
        component: ParentDashboardComponent
    },
    {
        path: 'register/:contractId',
        component: ParentRegisterComponent,
    },
    {
        path: 'detail/:id',
        component: ParentRegisterComponent,
        resolve: {
            parent: ParentResolver
        }
    },
];
