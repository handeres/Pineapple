import { HomeComponent } from './index';

export const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
