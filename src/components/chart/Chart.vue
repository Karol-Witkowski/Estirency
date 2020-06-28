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
          categories: [this.years],
        },
      },
      series: [{
        name: 'series',
        data: [this.years],
      }],
    };
  },
  computed: {
    setBaseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },
  },
  methods: {
    getData() {
      let actualDate;
      let pastDate;

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();

      if (month < 10 && day < 10) {
        actualDate = `${year}-0${month}-0${day}`;
        pastDate = `${year - 1}-0${month}-0${day}`;
      } else if (month > 9 && day < 10) {
        actualDate = `${year}-${month}-0${day}`;
        pastDate = `${year - 1}-${month}-0${day}`;
      } else if (month < 10 && day > 9) {
        actualDate = `${year}-0${month}-${day}`;
        pastDate = `${year - 1}-0${month}-${day}`;
      } else {
        actualDate = `${year}-${month}-${day}`;
        pastDate = `${year - 1}-${month}-${day}`;
      }
      axios
        .get(
          `https://api.exchangeratesapi.io/history?start_at=${pastDate}&end_at=${actualDate}&base=${this.setBaseCurrency}`,
        )
        .then((response) => {
          this.years = response.rates;
          this.rate = response.rates;
          this.isLoaded = true;
        })
        .catch((error) => error);
    },
  },
  updated() {
    this.getData();
  },
  mounted() {
    this.getData();
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
