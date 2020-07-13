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

// eslint-disable-next-line no-unused-vars
let actualDate;
let pastDate;

const historicalRate = 'https://marketdata.tradermade.com/api/v1/timeseries?api_key=xTIe4VLZK52rEVtREY3P&currency=';
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
  // CHANGE END DATE TO {actualDate}
  methods: {
    getData() {
      axios.get(`${historicalRate}${this.setBaseCurrency}${this.setTargetCurrency}&start_date=${pastDate}&end_date=2020-07-12&format=records`)
        .then((response) => {
          // for (let i = 0; i < response.length; i += 1) {
          this.historyRate = response.data.quotes[1].close;
          this.historyDate = response.data.quotes[1].date;
          console.log(this.historyDate);
          // }
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
