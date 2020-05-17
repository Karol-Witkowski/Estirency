<template>
    <div class="select">
      <p class="menu">MENU</p>
      <p class="instruction">
        Select currencies and fill input to show data
      </p>
      <p class="base">SELECT BASE CURRENCY</p>
      <v-select :options="options" placeholder="base currency">
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            :required="!selected"
            v-bind="attributes"
            v-on="events"
            @keypress="currencyRestrictions"
          />
        </template>
      </v-select>
      <img src="@/assets/swap-vertical.png" alt="swap currency icon" class="swapIcon">
      <p class="currency">SELECT WANTED CURRENCY</p>
      <v-select :options="options" placeholder="wanted currency">
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            :required="!selected"
            v-bind="attributes"
            v-on="events"
            @keypress="currencyRestrictions"
          />
        </template>
      </v-select>
      <p class="amount">TYPE AMOUNT</p>
      <input class="amountInput" placeholder="amount of currency" v-model="amount"
        @keypress="amountRestrictions" />
      <button>Calculate</button>
    </div>
</template>

<script>

const keyCode = (this.$event.keyCode ? this.$event.keyCode : this.$event.which);

export default {
  name: 'Selectmenu',
  data() {
    return {
      amount: null,
    };
  },
  methods: {
    currencyRestrictions($event) {
      if (keyCode > 47 && keyCode < 58) {
        $event.preventDefault();
      }
    },

    amountRestrictions($event) {
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
