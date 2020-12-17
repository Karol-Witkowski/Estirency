<template>
  <main class="home">
    <SelectMenu class="selectMenu"/>
    <Rate class="rate"/>
    <ChartComponent class="chart"/>
  </main>
</template>

<script>
import ChartComponent from '@/components/chartComponent/ChartComponent.vue';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';
import Rate from '@/components/rate/Rate.vue';

export default {
  name: 'Home',
  components: {
    ChartComponent,
    SelectMenu,
    Rate,
  },
};
</script>

<style src="./Home.scss" lang="scss"/>
