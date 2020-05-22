<template>
  <div class="results">
    <Chart />
    <Rate />
  </div>
</template>

<script>
import Rate from '@/components/rate/Rate.vue';
import Chart from '@/components/chart/Chart.vue';

export default {
  name: 'Results',
  components: {
    Rate,
    Chart,
  },
};
</script>

<style src="./Results.scss" lang="scss"></style>
