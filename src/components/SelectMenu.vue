<template>
  <section>
    <header>
      <h3>menu</h3>
    </header>
    <h4>Select currencies and fill input to show data</h4>
    <h4>select base currency</h4>
    <v-select
      @input="setBaseCurrency"
      label="name"
      :options="this.$store.state.currency
        .filter((currencies) => currencies !== this.$store.state.targetCurrency)"
      :value="$store.state.baseCurrency"
    >
      <template #search="{attributes, events}">
        <input
          class="vs__search"
          @keypress="currencyRestrictions"
          v-bind="attributes"
          v-on="events"
        />
      </template>
    </v-select>
    <figure>
      <img
        alt="arrays icon"
        data-cy='swapIcon'
        src="@/assets/swap-vertical.png"
        v-on:click="swapValues"
      >
    </figure>
    <h4>select target currency</h4>
    <v-select
      @input="setTargetCurrency"
      label="name"
      :options="this.$store.state.currency
        .filter((currencies) => currencies !== this.$store.state.baseCurrency)"
      :value="$store.state.targetCurrency"
    >
      <template #search="{attributes, events}">
        <input
          class="vs__search"
          @keypress="currencyRestrictions"
          v-bind="attributes"
          v-on="events"
        />
      </template>
    </v-select>
    <h4>type amount</h4>
    <input
      class="amountInput"
      @input="setAmountValue"
      @keypress="amountRestrictions"
      placeholder="amount of currency"
      :value="$store.state.amountValue"
    />
  </section>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

export default {
  name: 'SelectMenu',
  components: {
    vSelect,
  },

  data() {
    return {
      baseCurrency: String,
      targetCurrency: String,
      cur1: 'PLN',
      cur2: 'EUR',
    };
  },

  methods: {
    setBaseCurrency(val) {
      if (val !== null) {
        this.$store.commit('setBaseCurrency', val);
        this.$store.state.loaded = false;
      }
    },

    setTargetCurrency(val) {
      if (val !== null) {
        this.$store.commit('setTargetCurrency', val);
        this.$store.state.loaded = false;
      }
    },

    setAmountValue(val) {
      this.$store.commit('setAmountValue', val.target.value);
    },

    currencyRestrictions(e) {
      const keyCode = e.key.charCodeAt(0);
      if (keyCode > 47 && keyCode < 58) {
        e.preventDefault();
      }
    },

    swapValues() {
      [this.$store.state.baseCurrency, this.$store.state.targetCurrency] = [
        this.$store.state.targetCurrency, this.$store.state.baseCurrency];
      this.$store.state.loaded = false;
    },

    amountRestrictions(e) {
      const keyCode = e.key.charCodeAt(0);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        e.preventDefault();
      }

      if (keyCode === 46 && (this.$store.state.amountValue.toString().split('.').length === 2)) {
        e.preventDefault();
      }

      if (this.$store.state.amountValue != null && this.$store.state.amountValue.toString().indexOf('.')
       > -1 && (this.$store.state.amountValue.split('.')[1].length > 1)) {
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/stylesheets/SelectMenu.scss';
@import '@/stylesheets/vSelect.scss';
</style>
