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
      <input class="amountInput" placeholder="amount of currency" v-model="amount"
       @keypress="restrictions"/>
       <button>Calculate</button>
    </div>
</template>

<script>


export default {
  name: 'Selectmenu',
  data() {
    return {
      amount: null,
    };
  },
  methods: {
    restrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
      // allow only two decimal places
      if (this.amount != null && this.amount.indexOf('.') > -1 && (this.amount.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
    },
  },
};
</script>

<style src="./Selectmenu.scss" lang="scss"></style>
