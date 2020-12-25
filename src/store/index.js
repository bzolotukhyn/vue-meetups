import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        meetups: [],
        user: null,
    },
    getters: {
        registrations(state) {
            return state.user.registrations || [];
        },
    },
    mutations: {
        addRegistration(state, meetupId) {
            if (!state.user.registrations) {
                Vue.set(state.user, 'registrations', []);
            }
            state.user.registrations.push(meetupId);
        },
        removeRegistration(state, meetupId) {
            const registrationInd = state.user.registrations.indexOf(meetupId);
            state.user.registrations.splice(registrationInd, 1);
        },
        setLoadedMeetups(state, meetups) {
            state.meetups = meetups;
        },
        setLoadedRegistrations(state, registrations) {
            Vue.set(state.user, 'registrations', registrations);
        },
        createMeetup(state, newMeetup) {
            state.meetups.push(newMeetup);
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        async loadMeetups({ commit }) {
            const data = await firebase.database().ref('meetups').once('value');
            const meetups = [];
            const dbMeetups = data.val();
            for (const key in dbMeetups) {
                const meetup = dbMeetups[key];
                meetups.push({
                    id: key,
                    ...meetup,
                });
            }
            commit('setLoadedMeetups', meetups);
        },
        async loadUserData({ state, commit }) {
            const userId = state.user.id;
            const data = await firebase
                .database()
                .ref(`users/${userId}`)
                .once('value');
            const dbUserData = data.val();
            if (dbUserData) {
                commit(
                    'setLoadedRegistrations',
                    Object.keys(dbUserData.registrations)
                );
            }
        },
        async registerAtMeetup({ state, commit }, { meetupId }) {
            await firebase
                .database()
                .ref()
                .update({
                    [`users/${state.user.id}/registrations/${meetupId}`]: true,
                });
            commit('addRegistration', meetupId);
        },
        async unregisterAtMeetup({ state, commit }, { meetupId }) {
            await firebase
                .database()
                .ref(`users/${state.user.id}/registrations/${meetupId}`)
                .remove();
            commit('removeRegistration', meetupId);
        },
        async createMeetup(
            { commit, state },
            { title, description, location, image, date }
        ) {
            const meetup = {
                title,
                description,
                location,
                date,
                imageSrc: '',
                createdBy: state.user.id,
            };
            const { key } = await firebase
                .database()
                .ref('meetups')
                .push(meetup);
            const imageName = image.name;
            const imageExt = imageName.slice(imageName.lastIndexOf('.'));
            const fileData = await firebase
                .storage()
                .ref('meetups/' + key + imageExt)
                .put(image);
            const imageSrc = await fileData.ref.getDownloadURL();
            await firebase
                .database()
                .ref('meetups')
                .child(key)
                .update({ imageSrc });
            meetup.imageSrc = imageSrc;
            meetup.id = key;
            commit('createMeetup', meetup);
        },
        signUserUp({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    const newUser = { id: user.uid };
                    commit('setUser', newUser);
                })
                .catch((error) => console.log(error));
        },
        async signUserIn({ commit }, { email, password }) {
            const { user } = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            commit('setUser', { id: user.uid });
        },
        async logout({ commit }) {
            await firebase.auth().signOut();
            commit('setUser', null);
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid });
        },
    },
    modules: {},
});
