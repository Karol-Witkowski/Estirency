<template>
  <div/>
</template>

<script>
export default {
  name: 'Theme',
};
</script>

<style lang="scss" scoped>

div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-color: rgb(34, 34, 34);
}

div::after {
  content: "";
  background: rgba(0, 0, 0, .1);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
}
</style>
