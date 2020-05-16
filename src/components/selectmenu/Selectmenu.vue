<template>
    <div class="select">
      <p class="menu">MENU</p>
      <p class="instruction">
        Select currencies and fill input to show data
      </p>
      <p class="base">SELECT BASE CURRENCY</p>
      <v-select :options="options" placeholder="base currency"></v-select>
      <img src="@/assets/swap-vertical.png" alt="swap currency icon" class="swapIcon">
      <p class="currency">SELECT WANTED CURRENCY</p>
      <v-select :options="options" placeholder="wanted currency"></v-select>
      <p class="amount">TYPE AMOUNT</p>
      <input class="amountInput" placeholder="amount of currency"/>
    </div>
</template>

<script>


export default {
  name: 'Selectmenu',
};
</script>

<style src="./Selectmenu.scss" lang="scss"></style>
