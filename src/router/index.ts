import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Feed from '../views/Feed.vue';
import Gallery from '../views/Gallery.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
