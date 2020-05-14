<template>
    <div class="select">
      <p class="base">SELECT BASE CURRENCY</p>
      <v-select id="base" :options="currencyList[quote]"
        :clearable="false" v-model="baseCurrency" placeholder="Select Token">
      </v-select>
    </div>
</template>

<script>
export default {
  name: 'Select',
};
</script>

<style src="./Select.scss" lang="scss" scoped></style>
