import Vue from 'vue';
import sweetAlert2 from 'vue-sweetalert2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import db from './firebase/db';
import storage from './firebase/storage';
import auth from './firebase/auth';

import 'vue-loading-overlay/dist/vue-loading.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

Vue.prototype.$db = db;
Vue.prototype.$storage = storage;
Vue.prototype.$auth = auth;

Vue.use(sweetAlert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
