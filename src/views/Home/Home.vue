<template>
  <div class="home">
    <div class="selectrateContainer">
      <Selectmenu class="selectMenu"/>
      <Rate class="rate" />
    </div>
    <Chart class="chart" />
  </div>
</template>

<script>
import Selectmenu from '@/components/selectmenu/Selectmenu.vue';
import Rate from '@/components/rate/Rate.vue';
import Chart from '@/components/chart/Chart.vue';

export default {
  name: 'Home',
  components: {
    Selectmenu,
    Rate,
    Chart,
  },
};
</script>

<style src="./Home.scss" lang="scss"></style>
