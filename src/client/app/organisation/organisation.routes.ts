import { OrganisationDashboardComponent, OrganisationRegisterSuccessComponent, OrganisationRegisterComponent, OrganisationResolver } from './index';

export const routes = [
    {
        path: '',
        component: OrganisationDashboardComponent,
    },
    {
        path: 'dashboard',
        component: OrganisationDashboardComponent
    },
    {
        path: 'register',
        component: OrganisationRegisterComponent
    },
    {
        path: 'success',
        component: OrganisationRegisterSuccessComponent,
    },
    {
        path: 'detail/:id',
        component: OrganisationRegisterComponent,
        resolve: {
            organisation: OrganisationResolver
        }
    }
];
