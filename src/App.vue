<template>
    <v-app>
        <v-app-bar app class="light-green">
            <v-app-bar-nav-icon
                class="d-flex d-sm-none"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                <router-link to="/">Meetuper</router-link>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items
                class="d-none d-sm-flex"
                v-for="item in menuItems"
                :key="item.title">
                <v-btn text link :to="{ name: item.routeName }">
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app></v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        drawer: false,
        menuItems: [
            {
                icon: 'mdi-account-supervisor',
                title: 'View Meetups',
                routeName: 'Meetups',
            },
            {
                icon: 'mdi-map-marker',
                title: 'Organize Meetup',
                routeName: 'CreateMeetup',
            },
            { icon: 'mdi-account', title: 'Profile', routeName: 'Profile' },
            { icon: 'mdi-face', title: 'Sign Up', routeName: 'SignUp' },
            { icon: 'mdi-lock-open', title: 'Sign In', routeName: 'SignIn' },
        ],
    }),
};
</script>
