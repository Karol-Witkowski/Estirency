<template>
  <div class="app">
    <Theme />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue';
import Theme from './components/Theme.vue';

export default {
  components: {
    Navbar,
    Theme,
  },
  name: 'App',
  data() {
    return {
    };
  },
};
</script>

<style src="./App.scss" lang="scss" />
