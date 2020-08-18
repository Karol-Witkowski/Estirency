import Vue from 'vue';
import Vuex from 'vuex';
import currencies from '@/data/currencies.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currency: currencies,
    baseCurrency: currencies[21],
    targetCurrency: currencies[9],
    amountValue: 100,
  },
  mutations: {
    setBaseCurrency(state, base) {
      state.baseCurrency = base;
    },
    setTargetCurrency(state, wanted) {
      state.targetCurrency = wanted;
    },
    setAmountValue(state, amount) {
      state.amountValue = amount;
    },
  },
});
