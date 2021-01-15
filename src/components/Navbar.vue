<template>
  <nav class="navbar">
    <router-link
      active-class=""
      to="/home"
    >
      <div class="logo">
        <img
          alt="bell curve chart icon"
          src="@/assets/chart-bell-curve.png"
        >
        <span>esti</span>
        <span>rency</span>
      </div>
    </router-link>
    <router-link
      class="effect"
      tag="nav"
      to="/about"
    >
      about
    </router-link>
    <router-link
      class="effect"
      tag="nav"
      to="/home"
    >
      home
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style src="@/stylesheets/Navbar.scss" lang="scss" scoped />
