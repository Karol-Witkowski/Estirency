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
     The rate of transaction is {{ss}}
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
      response: [],
      getBaseCurrency: this.$store.state.baseCurrency.cc,
    };
  },
  methods: {
  },
  mounted() {
    axios.get(`${currencyRate}${this.getBaseCurrency}`)
      .then((response) => {
        console.log(response);
      });
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
