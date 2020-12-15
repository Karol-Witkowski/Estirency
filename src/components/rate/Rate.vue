<template>
  <div class="rate">
    <h3>Description</h3>
    <p>The rate of transaction is <span class="numbers">{{ setRate }}</span></p>
    <span class="numbers">{{ $store.state.amountValue }}</span>
    <span> {{ $store.state.baseCurrency.symbol }} ({{ $store.state.baseCurrency.name }}) is </span>
    <span class="numbers">{{ setAmount }}</span>
    <span> {{ $store.state.targetCurrency.symbol }} ({{ $store.state.targetCurrency.name }})</span>
    <p>
      The data is provided by the European Central Bank placed in Frankfurt am Main and
      base on The reference rates that are updated usually around<span>16:00</span>CET
      on every working day.
    </p>
    <h5 class="apiInfo">This app was created thanks to the API service provided by:</h5>
    <div class="apiIcon">
       <a
         href="https://exchangeratesapi.io/"
         target="_blank"
       >
        <figure>
          <img
            alt="API provider logo"
            src="@/assets/api.svg"
          >
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      const currencyRate = 'https://api.exchangeratesapi.io/latest?base=';
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
