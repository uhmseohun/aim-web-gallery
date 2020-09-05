import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import db from './firebase/db';
import storage from './firebase/storage';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false;
Vue.prototype.$db = db;
Vue.prototype.$storage = storage;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
