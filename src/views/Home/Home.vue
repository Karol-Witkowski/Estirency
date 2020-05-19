<template>
  <div class="home">
    <Selectmenu />
    <Results />
  </div>
</template>

<script>
import Selectmenu from '@/components/selectmenu/Selectmenu.vue';
import Results from '@/components/results/Results.vue';

export default {
  name: 'Home',
  components: {
    Selectmenu,
    Results,
  },
};
</script>

<style src="./Home.scss" lang="scss"></style>
