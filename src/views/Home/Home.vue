<template>
  <div class="home">
    <Selectmenu class="selectMenu"/>
    <span class="whiteSpace"></span>
    <Rate class="rate"/>
    <Chart class="chart"/>
  </div>
</template>

<script>
import Rate from '@/components/rate/Rate.vue';
import Chart from '@/components/chart/Chart.vue';
import Selectmenu from '@/components/selectmenu/Selectmenu.vue';

export default {
  name: 'Home',
  components: {
    Selectmenu,
    Rate,
    Chart,
  },
};
</script>

<style src="./Home.scss" lang="scss"/>
