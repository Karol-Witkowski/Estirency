<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/chart-bell-curve.png" alt="bell curve chart icon" class="logoIcon">
      <span class="namePart1">ESTI</span>
      <span class="namePart2">RENCY</span>
    </div>
    <router-link to="/about">
      <button class="routerAboutBtn">
        <span class="routerText">ABOUT</span>
      </button>
    </router-link>
    <router-link to="/">
      <button class="routerHomeBtn">
        <span class="routerText">HOME</span>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
