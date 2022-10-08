import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import Notifications from 'vue-notification';
import { router } from './router';
import { store } from './store';

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.notify({ duration: 5000 });

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/styles/global.scss';

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
