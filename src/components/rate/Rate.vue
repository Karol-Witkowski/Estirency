<template>
  <div class="rate">
    <p>{{ $store.state.baseCurrency.name }} {{ $store.state.baseCurrency.symbol }}</p>
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
