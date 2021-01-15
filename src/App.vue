<template>
  <main>
    <Theme />
    <Navbar />
    <router-view />
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Theme from './components/Theme.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Theme,
  },
};
</script>

<style src="@/stylesheets/App.scss" lang="scss" scoped />
