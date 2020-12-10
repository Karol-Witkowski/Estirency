<template>
    <div class="chart">
      <h3 v-if="chartDescription">
        {{ baseCurrency }}/{{ targetCurrency }}
        timeseries from last year
      </h3>
      <h3 v-if="currencyError">There is no data for same currency</h3>
      <span v-if="$store.state.loaded">
        <datachart class="dataChart" :chartdata="chartData" :options="options"/>
      </span>
    </div>
</template>

<script>
import axios from 'axios';
import datachart from '@/components/chartComponent/chart/Chart.vue';

let actualDate;
let pastDate;
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
  name: 'ChartComponent',
  components: {
    datachart,
  },

  data() {
    return {
      chartDescription: true,
      currencyError: false,
      historyData: [],
      chartData: {
        labels: [],
        datasets: [{
          borderColor: '#c7b6b6',
          pointBackgroundColor: '#a68b8b',
          pointHoverBorderWidth: 3,
          data: [],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    };
  },

  computed: {
    baseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },

    targetCurrency() {
      return this.$store.state.targetCurrency.cc;
    },
  },

  methods: {
    getData() {
      const historicalRate = 'https://fcsapi.com/api-v2/forex/history?symbol=';

      if (this.targetCurrency === this.baseCurrency) {
        this.chartDescription = false;
        this.currencyError = true;
        this.$store.state.loaded = true;
      } else if (this.$store.state.loaded === false) {
        this.chartDescription = true;
        this.currencyError = false;

        axios.get(`${historicalRate}${this.baseCurrency}/${this.targetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=WOR4I12d7qPWzV0A3yw1KRHeApKaB8ZjCtpsy9ZTzCnOeNUu9k`)
          .then((response) => {
            this.historyData = response.data.response.filter((e, i) => i % 20 === 0);
            this.dataPush();
            this.$store.state.loaded = true;
          })
          .catch((error) => error);
      }
    },

    dataPush() {
      this.chartData.labels = this.historyData.map((date) => date.tm.slice(0, 10));
      this.chartData.datasets[0].data = this.historyData.map((rate) => Number(rate.c));
    },
  },

  mounted() {
    this.$store.state.loaded = false;
    this.getData();
  },

  updated() {
    this.chartData.labels.length = 0;
    this.chartData.datasets[0].data.length = 0;
    this.getData();
  },
};
</script>

<style src="./ChartComponent.scss" lang="scss"/>
