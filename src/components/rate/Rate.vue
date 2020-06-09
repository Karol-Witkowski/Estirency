<template>
  <div class="rate">
    <div>
      <span>
        {{ $store.state.amountValue }}
      </span>
         {{ $store.state.baseCurrency.cc }} ({{ $store.state.baseCurrency.name }}) is
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

const currencyRate = 'https://api.exchangeratesapi.io/latest?base=';

export default {
  name: 'Rate',
  data() {
    return {
      rate: Number,
    };
  },
  computed: {
    setBaseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },
    setWantedCurrency() {
      return this.$store.state.wantedCurrency.cc;
    },
  },
  methods: {
  },
  mounted() {
    axios.get(`${currencyRate}${this.setBaseCurrency}`)
      .then((response) => {
        this.rate = response.data.rates[this.setWantedCurrency];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updated() {
    axios.get(`${currencyRate}${this.setBaseCurrency}`)
      .then((response) => {
        this.rate = response.data.rates[this.setWantedCurrency];
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
