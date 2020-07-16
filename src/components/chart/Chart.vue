<template>
    <div class="chart">
      <p class="chartDescription">
        historical exchange rates {{ this.historyDate }} {{ this.historyRate }}
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

const historicalRate = 'https://marketdata.tradermade.com/api/v1/timeseries?api_key=ErILqOMX-rT9NVdqUS1f&currency=';
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate() - 1;

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

export default {
  name: 'Rate',
  components: {
    VueApexCharts,
  },

  data() {
    return {
      base: this.$store.state.baseCurrency.cc,
      history: '',
      historyDate: '',
      historyRate: '',
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
    setTargetCurrency() {
      return this.$store.state.targetCurrency.cc;
    },
  },

  methods: {
    getData() {
      axios.get(`${historicalRate}${this.setBaseCurrency}${this.setTargetCurrency}&start_date=${pastDate}&end_date=${actualDate}&format=records`)
        .then((response) => {
          this.history = response.data.quotes;
          this.dataLoop();
        })
        .catch((error) => error);
    },

    dataLoop() {
      for (let i = 0; i < this.history.length; i += 1) {
        this.historyRate = this.history[i].close;
        this.historyDate = this.history[i].date;
      }
    },
  },

  updated() {
    this.getData();
    this.dataLoop();
  },

  mounted() {
    this.getData();
    this.dataLoop();
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
