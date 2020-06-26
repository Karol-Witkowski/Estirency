<template>
  <div class="rate">
    <div class="transactionRate">
     The rate of transaction is
     <span class="calculated">
        {{ setRate }}
     </span>
    </div>
    <div class="transactionRate">
      <span class="calculated">
        {{ $store.state.amountValue }}
      </span>
         {{ $store.state.baseCurrency.cc }} ({{ $store.state.baseCurrency.name }}) is
      <span class="calculated">
        {{ setAmount }}
      </span>
      {{ $store.state.wantedCurrency.cc }}
      ({{ $store.state.wantedCurrency.name }})
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
    getRates() {
      axios.get(`${currencyRate}${this.setBaseCurrency}`)
        .then((response) => {
          this.rate = response.data.rates[this.setWantedCurrency];
          this.isLoaded = true;
        });
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
