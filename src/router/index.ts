import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Feed from '../views/Feed.vue';
import Gallery from '../views/Gallery.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import auth from '../firebase/auth';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((v) => v.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next({ name: 'sign-up' });
  } else {
    next();
  }
});

export default router;
