<template>
    <div class="select">
      <p class="menu">menu</p>
      <p class="instruction">
        Select currencies and fill input to show data
      </p>
      <p class="base">select base currency</p>
      <v-select
      :options="$store.state.currency"
      label="name"
      :value="$store.state.baseCurrency"
      @input="setBaseCurrency"
      placeholder="base currency">
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            v-bind="attributes"
            v-on="events"
            @keypress="currencyRestrictions"
          />
        </template>
      </v-select>
      <img src="@/assets/swap-vertical.png" alt="swap currency icon" class="swapIcon">
      <p class="currency">select wanted currency</p>
      <v-select
      :options="$store.state.currency"
      label="name"
      :value="$store.state.wantedCurrency"
      @input="setWantedCurrency"
      placeholder="wanted currency">
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            v-bind="attributes"
            v-on="events"
            @keypress="currencyRestrictions"
          />
        </template>
      </v-select>
      <p class="amount">type amount</p>
      <input class="amountInput"
      @keypress="amountRestrictions"
      :value="$store.state.amountValue"
      @input="setAmountValue"
      placeholder="amount of currency" />
    </div>
</template>

<script>

export default {
  name: 'Selectmenu',
  data() {
    return {
      selected: this.$store.state.currency[8],
    };
  },
  computed: {
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
      if (this.$store.state.amountValue != null && this.$store.state.amountValue.indexOf('.')
       > -1 && (this.$store.state.amountValue.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
    },
    setBaseCurrency(val) {
      this.$store.commit('setBaseCurrency', val);
    },
    setWantedCurrency(val) {
      this.$store.commit('setWantedCurrency', val);
    },
    setAmountValue(e) {
      this.$store.commit('setAmountValue', e.target.value);
    },
  },
};
</script>

<style src="./Selectmenu.scss" lang="scss"></style>
