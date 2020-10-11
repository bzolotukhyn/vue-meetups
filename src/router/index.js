import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Meetups from '@/views/Meetup/Meetups';
import CreateMeetup from '@/views/Meetup/CreateMeetup';
import Profile from '@/views/User/Profile';
import SignIn from '@/views/User/SignIn';
import SignUp from '@/views/User/SignUp';
Vue.use(VueRouter);

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
        path: '/newmeetup',
        name: 'CreateMeetup',
        component: CreateMeetup,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
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
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
