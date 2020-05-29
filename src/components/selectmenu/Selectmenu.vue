<template>
    <div class="select">
      <p class="menu">menu</p>
      <p class="instruction">
        Select currencies and fill input to show data
      </p>
      <p class="base">select base currency</p>
      <v-select :options="$store.state.currency" label="name"
      :value="$store.state.baseCurrency" @input="setBaseCurrency" placeholder="base currency">
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
      <p class="currency">select wanted currency</p>
      <v-select :options="$store.state.currency" label="name"
      :value="wantedCurrency" @input="getData" placeholder="wanted currency">
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
      <p class="amount">type amount</p>
      <input class="amountInput" @keypress="amountRestrictions"
       :value="amountValue" @input="getData" placeholder="amount of currency" />
      <button class="getData" @click="getData">Calculate</button>
    </div>
</template>

<script>

export default {
  name: 'Selectmenu',
  data() {
    return {
    };
  },
  methods: {
    currencyRestrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if (keyCode > 47 && keyCode < 58) {
        $event.preventDefault();
      }
    },
    amountRestrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
      // allow only two decimal places
      if (this.amount != null && this.amount.indexOf('.') > -1 && (this.amount.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
    },
    setBaseCurrency(val) {
      this.$store.commit('setBaseCurrency', val);
    },
  },
};
</script>

<style src="./Selectmenu.scss" lang="scss"></style>
