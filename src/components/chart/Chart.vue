<template>
    <div class="chart">
      <p class="chartDescription">
        historical exchange rates {{ this.historyData }}
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

let actualDate;
let pastDate;

const historicalRate = 'https://marketdata.tradermade.com/api/v1/timeseries?api_key=QU1NfjOWWJ5WHhSaHLKG&currency=';
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

if (month < 10 && day < 10) {
  actualDate = `${year}-0${month}-0${day}`;
  pastDate = `${year - 5}-0${month}-0${day}`;
} else if (month > 9 && day < 10) {
  actualDate = `${year}-${month}-0${day}`;
  pastDate = `${year - 5}-${month}-0${day}`;
} else if (month < 10 && day > 9) {
  actualDate = `${year}-0${month}-${day}`;
  pastDate = `${year - 5}-0${month}-${day}`;
} else {
  actualDate = `${year}-${month}-${day}`;
  pastDate = `${year - 5}-${month}-${day}`;
}

export default {
  name: 'Rate',
  components: {
    VueApexCharts,
  },
  data() {
    return {
      base: this.$store.state.baseCurrency.cc,
      historyData: '',
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
  computed: {
    setBaseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },
    setWantedCurrency() {
      return this.$store.state.targetCurrency.cc;
    },
  },
  methods: {
    getData() {
      axios.get(`${historicalRate}${this.setBaseCurrency}${this.setTargetCurrency}&start_date=${pastDate}&end_date=${actualDate}&format=records`)
        .then((response) => {
          this.historyData = response[0].close;
          console.log(this.historyData);
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
