import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Feed from '../views/Feed.vue';
import Gallery from '../views/Gallery.vue';
import ProjectList from '../views/ProjectList.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/Profile.vue';
import EditProfile from '../views/EditProfile.vue';
import UploadProduct from '../views/UploadProduct.vue';
import UploadProject from '../views/UploadProject.vue';
import Product from '../views/Product.vue';
import Project from '../views/Project.vue';
import Test from '../views/Test.vue';
import Uhmseohun from '../views/UHMSEOHUN.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Funding',
    component: ProjectList,
    meta: {
      requiresAuth: false,
    },
  },
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
    path: '/project-list',
    name: 'ProjectList',
    component: ProjectList,
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
  {
    path: '/upload',
    name: 'UploadProduct',
    component: UploadProduct,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/upload-project',
    name: 'UploadProject',
    component: UploadProject,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/product/:productId',
    name: 'Product',
    component: Product,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/project/:projectId',
    name: 'Project',
    component: Project,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/exhibition',
    name: 'Exhibition',
    component: Test,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/uhmseohun',
    name: 'UHMSEOHUN',
    component: Uhmseohun,
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

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((v) => v.meta.requiresAuth);

//   if (requiresAuth) {
//     next({ name: 'sign-in' });
//   } else {
//     next();
//   }
// });

export default router;
