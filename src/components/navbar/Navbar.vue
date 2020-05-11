<template>
  <div class="navbar">
    <button class="routerBtn">
      <router-link class="routerText" to="/" style="padding-right: 1%;">HOME
      </router-link>
    </button>
    <button class="routerBtn">
      <router-link class="routerText" to="/about">ABOUT
      </router-link>
    </button>
  </div>
</template>

<script>
export default {
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
