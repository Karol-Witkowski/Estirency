<template>
    <div class="select">
      <h3>menu</h3>
      <h4>Select currencies and fill input to show data</h4>
      <h4>select base currency</h4>
      <v-select
        @input="setBaseCurrency"
        label="name"
        :options="$store.state.currency
          .filter(currencies => currencies !== $store.state.targetCurrency)"
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
          src="@/assets/swap-vertical.png"
          v-on:click="swapValues"
        >
      </figure>
      <h4>select target currency</h4>
     <v-select
      @input="setTargetCurrency"
      label="name"
      :options="$store.state.currency
        .filter(currencies => currencies !== $store.state.baseCurrency)"
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
    </div>
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

    setAmountValue(e) {
      this.$store.commit('setAmountValue', e.target.value);
    },

    currencyRestrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if (keyCode > 47 && keyCode < 58) {
        $event.preventDefault();
      }
    },

    swapValues() {
      [this.$store.state.baseCurrency, this.$store.state.targetCurrency] = [
        this.$store.state.targetCurrency, this.$store.state.baseCurrency];
      this.$store.state.loaded = false;
    },

    amountRestrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }

      if (keyCode === 46 && (this.$store.state.amountValue.toString().split('.').length === 2)) {
        $event.preventDefault();
      }

      if (this.$store.state.amountValue != null && this.$store.state.amountValue.toString().indexOf('.')
       > -1 && (this.$store.state.amountValue.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
@import './SelectMenu.scss';
@import './vSelect/vSelect.scss';
</style>
