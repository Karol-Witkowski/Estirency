<template>
  <div class="home">
    <Selectmenu class="selectMenu"/>
    <span class="whiteSpace"/>
    <Rate class="rate"/>
    <Chart class="chart"/>
  </div>
</template>

<script>
import Chart from '@/components/chart/Chart.vue';
import Selectmenu from '@/components/selectmenu/Selectmenu.vue';
import Rate from '@/components/rate/Rate.vue';

export default {
  name: 'Home',
  components: {
    Chart,
    Selectmenu,
    Rate,
  },
};
</script>

<style src="./Home.scss" lang="scss"/>
