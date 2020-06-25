<template>
    <div class="chart">
      <p class="chartDescription">
        historical exchange rates from <span class="year">
          1999
        </span>
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

const chartDataApi = 'https://api.exchangeratesapi.io/history?start_at=1990-01-01&end_at=2018-09-01&base=';

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
  mounted() {
    axios.get(`${chartDataApi}${this.setBaseCurrency}`)
      .then((response) => {
        this.data = response;
        console.log(this.data);
      });
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
