<template>
    <div class="select">
      <h3>menu</h3>
      <h4>Select currencies and fill input to show data</h4>
      <h4>select base currency</h4>
      <v-select :options="$store.state.currency" label="name" :value="$store.state.baseCurrency"
      @input="setBaseCurrency" placeholder="base currency">
        <template #search="{attributes, events}">
          <input class="vs__search" v-bind="attributes" v-on="events"
          @keypress="currencyRestrictions"/>
        </template>
      </v-select>
      <figure>
        <img src="@/assets/swap-vertical.png" alt="swap currency icon" v-on:click="this.swapValues">
      </figure>
      <h4>select target currency</h4>
      <v-select :options="$store.state.currency" label="name" :value="$store.state.targetCurrency"
      @input="setTargetCurrency" placeholder="target currency">
        <template #search="{attributes, events}">
          <input class="vs__search" v-bind="attributes" v-on="events"
          @keypress="currencyRestrictions"/>
        </template>
      </v-select>
      <h4>type amount</h4>
      <input class="amountInput" @keypress="amountRestrictions" :value="$store.state.amountValue"
      @input="setAmountValue" placeholder="amount of currency"/>
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
    amountRestrictions($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }

      if ((keyCode === 46) && (this.$store.state.amountValue.toString().split('.').length === 2)) {
        $event.preventDefault();
      }

      if (this.$store.state.amountValue != null && this.$store.state.amountValue.toString().indexOf('.')
       > -1 && (this.$store.state.amountValue.split('.')[1].length > 1)) {
        $event.preventDefault();
      }

      if (this.$store.state.amountValue != null && this.$store.state.amountValue.toString().indexOf('.')
       > -1 && (this.$store.state.amountValue.split('.')[1].length > 1)) {
        $event.preventDefault();
      }
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

    setAmountValue(e) {
      this.$store.commit('setAmountValue', e.target.value);
    },

    setBaseCurrency(val) {
      this.$store.commit('setBaseCurrency', val);
      this.$store.state.loaded = false;
    },

    setTargetCurrency(val) {
      this.$store.commit('setTargetCurrency', val);
      this.$store.state.loaded = false;
    },
  },
};
</script>

<style lang="scss">
@import './SelectMenu.scss';
@import './vSelect.scss';
</style>
