import {
    GroupDetailComponent,
    GroupOverviewComponent,
    GroupResolver,
    GroupDetailResolver
} from './';

export const routes = [
    {
        path: '',
        component: GroupOverviewComponent
    },
    {
        path: 'overview',
        component: GroupOverviewComponent,
        resolve: {
            groups: GroupResolver
        }
    },
    {
        path: 'register',
        component: GroupDetailComponent,
        resolve: {
            groups: GroupDetailResolver
        }
    },
    {
        path: 'detail/:id',
        component: GroupDetailComponent,
        resolve: {
            group: GroupResolver
        }
    }
];
