<template>
  <div>
    <SelectMenu />
    <Rate data-cy="rate" />
    <ChartComponent />
  </div>
</template>

<script>
import ChartComponent from '@/components/ChartComponent.vue';
import SelectMenu from '@/components/SelectMenu.vue';
import Rate from '@/components/Rate.vue';

export default {
  name: 'Home',
  components: {
    ChartComponent,
    SelectMenu,
    Rate,
  },
};
</script>

<style src="@/stylesheets/Home.scss" lang="scss" scoped />
