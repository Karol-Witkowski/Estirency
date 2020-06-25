<template>
  <div class="navbar">
    <router-link to="/home" class="" active-class="">
      <div class="logo">
        <img src="@/assets/chart-bell-curve.png" alt="bell curve chart icon" class="logoIcon">
        <span class="namePart1">
          esti
        </span>
        <span class="namePart2">
          rency
        </span>
      </div>
    </router-link>
    <div class="buttons">
      <router-link class="routerAboutBtn effectBtn" to="/about">
        <span class="routerText">
          about
        </span>
      </router-link>
      <router-link class="routerHomeBtn effectBtn" to="/home">
        <span class="routerText">
          home
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
