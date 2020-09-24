import router from '@/router';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from '../firebase/auth';
import db from '../firebase/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    signedIn: false,
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
      state.signedIn = true;
      return state;
    },
  },
  actions: {
    async signInWithAccount({ dispatch }, account) {
      const { user } = await auth.signInWithEmailAndPassword(
        account.email,
        account.password,
      );
      dispatch('fetchUserProfile', user);
      router.push({ name: 'Feed' });
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = (await db
        .collection('user')
        .doc(user.uid)
        .get())
        .data();
      commit('setUserProfile', userProfile);
    },
    async signUpAccount(_, account) {
      const { user } = await auth.createUserWithEmailAndPassword(
        account.email,
        account.password,
      );
      await db
        .collection('user')
        .doc(user?.uid)
        .set({
          email: account.email,
          name: account.name,
        });
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
