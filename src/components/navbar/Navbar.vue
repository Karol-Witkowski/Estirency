<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/chart-bell-curve.png" alt="bell curve chart icon" class="logoIcon">
      <span class="namePart1">ESTI</span>
      <span class="namePart2">RENCY</span>
    </div>
    <router-link class="routerAboutBtn effectBtn" to="/about">
      <span class="routerText">ABOUT</span>
    </router-link>
    <router-link class="routerHomeBtn effectBtn" to="/home">
      <span class="routerText">HOME</span>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
