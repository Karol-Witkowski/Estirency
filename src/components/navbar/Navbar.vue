<template>
  <div class="navbar">
    <router-link to="/home" active-class="">
      <div class="logo">
        <img src="@/assets/chart-bell-curve.png" alt="bell curve chart icon">
        <span>esti</span>
        <span>rency</span>
      </div>
    </router-link>
    <div class="buttons">
      <router-link class="routerBtn effectBtn" to="/about">about</router-link>
      <router-link class="routerBtn effectBtn" style="padding: 0.9em 1.2em 0.6em;" to="/home">home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style src="./Navbar.scss" lang="scss" scoped/>
