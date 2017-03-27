import { EventOverviewComponent, EventDetailComponent, EventResolver, EventDetailResolver } from './index';

export const routes = [
    {
        path: '',
        component: EventOverviewComponent,
        resolve: {
            events: EventResolver
        }
    },
    {
        path: 'detail',
        component: EventDetailComponent,
    },
    {
        path: 'detail/:id',
        component: EventDetailComponent,
        resolve: {
            event: EventDetailResolver
        }
    }
];
