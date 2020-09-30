import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Feed from '../views/Feed.vue';
import Gallery from '../views/Gallery.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/Profile.vue';
import EditProfile from '../views/EditProfile.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: SignUp,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/profile/:userId',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((v) => v.meta.requiresAuth);

//   if (requiresAuth) {
//     next({ name: 'sign-in' });
//   } else {
//     next();
//   }
// });

export default router;
