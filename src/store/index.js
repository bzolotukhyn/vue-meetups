import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        meetups: [],
        user: null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
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
