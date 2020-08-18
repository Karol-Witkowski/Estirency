<template>
  <div/>
</template>

<script>
export default {
  name: 'Theme',
};
</script>

<style lang="scss" scoped>
@import 'src/styles/var/_colors.scss';

div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-color: $backgrundColor;
}
</style>
