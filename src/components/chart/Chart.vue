<template>
    <div class="chart">
      <p class="chartDescription">
        historical exchange rates
      </p>
      <VueApexCharts
      class="dataChart"
      width="625"
      type="line"
      :options="options"
      :series="series"
      />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import axios from 'axios';

export default {
  name: 'Rate',
  components: {
    VueApexCharts,
  },
  data() {
    return {
      options: {
        chart: {
          id: 'dataChart',
          type: 'line',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [{
        name: 'series',
        data: [],
      }],
    };
  },
  mounted(value) {
    let actualDate;
    let pastDate;

    axios
      .get(
        `https://api.nbp.pl/api/exchangerates/rates/a/${value}/${pastDate}/${actualDate}/`,
      )
      .then((response) => {
        this.results = response.data.rates;
        console.log(this.results);
        this.isLoaded = true;
      })
      .catch((error) => error);
  },
  computed: {
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
