<template>
  <div class="navbar">
    <router-link to="/home" active-class="">
      <div class="logo">
        <img src="@/assets/chart-bell-curve.png" alt="bell curve chart icon">
        <span>esti</span>
        <span>rency</span>
      </div>
    </router-link>
    <router-link tag="nav" class="effect" to="/about">about</router-link>
    <router-link tag="nav" class="effect" to="/home">home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style src="./Navbar.scss" lang="scss" scoped/>
