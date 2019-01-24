import Home from '@app/views/home/home';
import Login from '@app/views/login/login';
import App from '@app/views/App';

export default [
    {
        path: '/',
        component: App,
        routes: [
            {
                path: '/food/login',
                component: Login
            },
            {
                path: '/food/home',
                component: Home,
            }
        ]
    }
];