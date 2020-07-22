import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/src/scss/vue-select.scss';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
