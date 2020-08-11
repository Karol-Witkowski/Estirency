<template>
  <div class="rate">
    <div class="main">
      <p class="header">
        Description
      </p>
      <div class="transactionRate">
      The rate of transaction is
      <span class="calculated">{{ setRate }}</span>
      </div>
      <div class="transactionRate">
        <span class="calculated">{{ $store.state.amountValue }}</span>
        {{ $store.state.baseCurrency.cc }} ({{ $store.state.baseCurrency.name }}) is
        <span class="calculated">{{ setAmount }}</span>
        {{ $store.state.targetCurrency.cc }}
        ({{ $store.state.targetCurrency.name }})
      </div>
    </div>
    <div  class="dataInfo">
      The data is provided by the European Central Bank placed in Frankfurt am Main and
      base on The reference rates that are updated usually around
      <span class="time">16:00</span>
      CET on every working day.
    </div>
    <div class="apiInfo">
      This app was created thanks to the API service provided by:
    </div>
    <div class="apiIcon">
       <a target="_blank" href="https://exchangeratesapi.io/">
        <img src="@/assets/api.svg" alt="api provider logo">
      </a>
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

    setTargetCurrency() {
      return this.$store.state.targetCurrency.cc;
    },

    setRate() {
      return Math.round(this.rate * 1000) / 1000;
    },

    setAmount() {
      return Math.round((this.$store.state.amountValue * this.setRate) * 100) / 100;
    },
  },

  methods: {
    getRates() {
      axios.get(`${currencyRate}${this.setBaseCurrency}`)
        .then((response) => {
          this.rate = response.data.rates[this.setTargetCurrency];
        })
        .catch((error) => error);
    },
  },

  updated() {
    this.getRates();
  },

  mounted() {
    this.getRates();
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
