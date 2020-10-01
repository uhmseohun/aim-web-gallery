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
    userLikes: [],
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
      state.signedIn = true;
      return state;
    },
    setUserLikes(state, userLikes) {
      state.userLikes = userLikes;
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
      dispatch('fetchUserLikes', user);
      router.push({ name: 'Feed' });
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = (await db
        .collection('user')
        .doc(user.uid)
        .get())
        .data();
      commit('setUserProfile', {
        ...userProfile,
        userId: user.uid,
      });
    },
    async fetchUserLikes({ commit }, user) {
      const userLikes = (await db
        .collection('products')
        .where('likers', 'array-contains', user.uid)
        .get()
      ).docs.map((v) => v.id);
      commit('setUserLikes', userLikes);
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
          nickname: null,
          phone: null,
          introduce: null,
          category: null,
        });
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
