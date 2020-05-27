import Vue from 'vue';
import Vuex from 'vuex';
import currencies from '@/data/Currencies.json';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currency: currencies,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
