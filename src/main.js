import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
    created() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCxCsXyvqwIwBrG2mM9NUC1XtwtP8LILQs',
            authDomain: 'homeworkproject-1bde7.firebaseapp.com',
            databaseURL: 'https://homeworkproject-1bde7.firebaseio.com',
            projectId: 'homeworkproject-1bde7',
            storageBucket: 'homeworkproject-1bde7.appspot.com',
            appId: '1:406969059083:web:947a80947cb17b6ed5440e',
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.dispatch('autoSignIn', user);
                this.$store.dispatch('loadUserData');
                if (this.$route.meta.nonAuth) {
                    this.$router.push('/');
                }
            } else {
                this.$store.commit('setUser', null);
                if (this.$route.meta.auth) {
                    this.$router.push('/');
                }
            }
        });
        this.$store.dispatch('loadMeetups');
        window.firebase = firebase;
    },
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
