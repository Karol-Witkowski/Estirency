<template>
  <div class="rate">
    <p>{{amountValue}}</p>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  computed: {
    data() { return this.$store.state.amountValue.cc; },
  },
};
</script>

<style src="./Rate.scss" lang="scss"></style>
