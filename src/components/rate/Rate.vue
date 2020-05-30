<template>
  <div class="rate">
    <p>{{ $store.state.baseCurrency.name }}</p>
    <p>{{ $store.state.wantedCurrency.name }}</p>
    <p>{{ $store.state.amountValue }}</p>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  computed: {
    store() {
      return this.$store.state;
    },
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
