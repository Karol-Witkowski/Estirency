<template>
  <div>
    <SelectMenu />
    <rate data-cy="rate" />
    <ChartComponent />
  </div>
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

<style src="./Home.scss" lang="scss" scoped />
