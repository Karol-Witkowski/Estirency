<template>
  <div class="rate">
    <div>
      <p>Description</p>
      <div>The rate of transaction is <span class="numbers">{{ setRate }}</span></div>
      <div>
        <span class="numbers">{{ $store.state.amountValue }}</span>
        <span> {{ $store.state.baseCurrency.cc }} ({{ $store.state.baseCurrency.name }}) is </span>
        <span class="numbers">{{ setAmount }}</span>
        <span> {{ $store.state.targetCurrency.cc }} ({{ $store.state.targetCurrency.name }})</span>
      </div>
    </div>
    <div  class="dataInfo">
      The data is provided by the European Central Bank placed in Frankfurt am Main and
      base on The reference rates that are updated usually around
      <span>16:00</span>
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

    setAmount() {
      return Math.round((this.$store.state.amountValue * this.setRate) * 100) / 100;
    },

    setBaseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },

    setTargetCurrency() {
      return this.$store.state.targetCurrency.cc;
    },

    setRate() {
      return Math.round(this.rate * 1000) / 1000;
    },
  },

  methods: {

    async getRates() {
      axios.get(`${currencyRate}${this.setBaseCurrency}`)
        .then((response) => {
          this.rate = response.data.rates[this.setTargetCurrency];
        })
        .catch((error) => error);
      return this.rate;
    },
  },
  mounted() {
    this.getRates();
  },

  updated() {
    this.getRates();
  },
};
</script>

<style src="./Rate.scss" lang="scss"/>
