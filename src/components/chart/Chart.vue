<template>
    <div class="chart">
      <p class="chartDescription">historical exchange rates from <span class="year">1990</span></p>
    </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
// eslint-disable-next-line no-unused-vars
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default {
  name: 'Rate',
};
</script>

<style src="./Chart.scss" lang="scss"></style>
