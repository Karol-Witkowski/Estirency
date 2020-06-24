<template>
    <div class="chart">
      <p class="chartDescription">historical exchange rates from <span class="year">1990</span></p>
      <VueApexCharts class="dataChart" width="600" type="line" :options="options" :series="series"/>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'Rate',
  components: {
    VueApexCharts,
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }],
    };
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
