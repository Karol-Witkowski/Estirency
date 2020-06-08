<template>
  <div class="rate">
    <div>
      <span>{{ $store.state.amountValue }}</span> {{ $store.state.baseCurrency.cc }}
      ({{ $store.state.baseCurrency.name }}) is
      </div>
    <div>
      XXX {{ $store.state.wantedCurrency.cc }}
    </div>
    <div>
     The rate of transaction is {{ rate }}
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import currencies from '@/data/currencies.json';

const currencyRate = 'https://api.exchangeratesapi.io/latest?base=';

export default {
  name: 'Rate',
  data() {
    return {
      rate: null,
      store: this.$store.state,
      currencies,
    };
  },
  computed: {
    setBaseCurrency() {
      return this.$store.state.baseCurrency;
    },
  },
  methods: {
    reRender() {
      this.index = +1;
    },
  },
  created() {
    axios.get(`${currencyRate}${this.setBaseCurrency.cc}`)
      .then((response) => {
        this.rate = response.data.rates.PLN;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updated() {
    axios.get(`${currencyRate}${this.setBaseCurrency.cc}`)
      .then((response) => {
        console.log(response.data);
        this.rate = response.data.rates.PLN;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
