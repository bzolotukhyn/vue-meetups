<template>
    <v-app>
        <v-app-bar app>
            <v-app-bar-nav-icon
                class="d-flex d-sm-none"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                <router-link to="/">Meetuper</router-link>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="d-none d-sm-flex">
                <v-btn
                    v-for="item in menuItems"
                    :key="item.title"
                    text
                    link
                    :to="{ name: item.routeName }">
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn v-if="user" text @click="logOut">
                    <v-icon left>mdi-door-open</v-icon>
                    Log out
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
    }),
    computed: {
        user() {
            return this.$store.state.user;
        },
        menuItems() {
            const common = [
                {
                    icon: 'mdi-account-supervisor',
                    title: 'View Meetups',
                    routeName: 'Meetups',
                },
            ];
            if (this.user) {
                return common.concat([
                    {
                        icon: 'mdi-map-marker',
                        title: 'Organize Meetup',
                        routeName: 'CreateMeetup',
                    },
                    {
                        icon: 'mdi-account',
                        title: 'Profile',
                        routeName: 'Profile',
                    },
                ]);
            } else {
                return common.concat([
                    {
                        icon: 'mdi-lock-open',
                        title: 'Sign In',
                        routeName: 'SignIn',
                    },
                    { icon: 'mdi-face', title: 'Sign Up', routeName: 'SignUp' },
                ]);
            }
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout');
        },
    },
};
</script>
