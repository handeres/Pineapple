import { TimeTableOverviewComponent , TimeTableDetailComponent,  TimeTableResolver } from './index';

export const routes = [
    {
        path: 'overview/:id',
        component: TimeTableOverviewComponent,
        resolve: {
            timetable: TimeTableResolver
        }
    },
    {
        path: 'detail/:id',
        component: TimeTableDetailComponent,
        resolve: {
            timetable: TimeTableResolver
        }
    }
];
