import Vue from 'vue';
import Vuex from 'vuex';
import 'vue-select/src/scss/vue-select.scss';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Vuex,
  render: (h) => h(App),
}).$mount('#app');
