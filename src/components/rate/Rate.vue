<template>
  <div class="rate">
    <div>
     The rate of transaction is {{ setRate }}
    </div>
    <div>
      <span>
        {{ $store.state.amountValue }}
      </span>
         {{ $store.state.baseCurrency.cc }} ({{ $store.state.baseCurrency.name }}) is
    </div>
    <div>
      {{ setAmount }} {{ $store.state.wantedCurrency.cc }} ({{ $store.state.wantedCurrency.name }})
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
    setRate() {
      return Math.round(this.rate * 1000) / 1000;
    },
    setAmount() {
      return Math.round((this.$store.state.amountValue * this.setRate) * 100) / 100;
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
