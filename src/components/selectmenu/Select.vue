<template>
    <div class="select">
      <p class="menu">MENU</p>
      <p class="base">SELECT BASE CURRENCY</p>
      <v-select :options="options" placeholder="select base currency"
       class="style-chooser"></v-select>
    </div>
</template>

<script>


export default {
  name: 'Select',
};
</script>

<style src="./Select.scss" lang="scss" scoped></style>
