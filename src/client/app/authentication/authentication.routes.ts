import { UsernameLoginComponent, PasswordLoginComponent, RegisterComponent } from './';

export const routes = [
    {
        path: '',
        component: UsernameLoginComponent
    },
    {
        path: 'login',
        component: UsernameLoginComponent
    },
    {
        path: 'password',
        component: PasswordLoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
