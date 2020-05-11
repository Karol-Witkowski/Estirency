<template>
  <div class="navbar">
    <router-link to="/" style="padding-right: 1%;">
      <button class="routerBtn">
        <span class="routerText">HOME</span>
      </button>
    </router-link>
    <router-link to="/about">
      <button class="routerBtn">
        <span class="routerText">ABOUT</span>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
