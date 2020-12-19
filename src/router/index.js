import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Meetups from '@/views/Meetup/Meetups';
import CreateMeetup from '@/views/Meetup/CreateMeetup';
import Profile from '@/views/User/Profile';
import SignIn from '@/views/User/SignIn';
import SignUp from '@/views/User/SignUp';
import authGuard from './auth-guard';
Vue.use(VueRouter);
const authRoutes = [
    {
        path: '/newmeetup',
        name: 'CreateMeetup',
        component: CreateMeetup,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
].map((route) => {
    route.beforeEnter = authGuard;
    route.meta = { auth: true };
    return route;
});

const nonAuthRoutes = [
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    },
    {
        path: '/singup',
        name: 'SignUp',
        component: SignUp,
    },
].map((route) => {
    route.meta = { nonAuth: true };
    return route;
});

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/meetups',
        name: 'Meetups',
        component: Meetups,
    },
    {
        path: '*',
        name: 'NotFound',
        component: {
            render: (h) =>
                h('h1', { domProps: { innerHTML: '404 Not Found' } }),
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: authRoutes.concat(nonAuthRoutes).concat(routes),
});

export default router;
