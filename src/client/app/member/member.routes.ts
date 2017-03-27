import {
    MemberOverviewComponent,
    MemberRegisterComponent,
    MemberRegisterParentComponent,
    MemberDetailComponent,
    MemberResolver,
    MemberRegisterResolver
} from './';

export const routes = [
    {
        path: '',
        component: MemberOverviewComponent
    },
    {
        path: 'overview',
        component: MemberOverviewComponent,
        resolve: {
            members: MemberResolver
        }
    },
    {
        path: 'overview/:id',
        component: MemberOverviewComponent,
        resolve: {
            members: MemberResolver
        }
    },
    {
        path: 'register/:id',
        component: MemberRegisterComponent,
        resolve: {
            groups: MemberRegisterResolver
        }
    },
    {
        path: 'register',
        component: MemberRegisterComponent,
        resolve: {
            groups: MemberRegisterResolver
        }
    },
    {
        path: 'registerParent',
        component: MemberRegisterParentComponent
    },
    {
        path: 'detail/:id',
        component: MemberDetailComponent,
        resolve: {
            member: MemberResolver
        }
    }
];
