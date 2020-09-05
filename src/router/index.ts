import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Featured from '../views/Featured.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/featured',
    name: 'Featured',
    component: Featured,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
