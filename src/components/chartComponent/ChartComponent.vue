<template>
    <div class="chart">
      <h3>
        {{ this.setBaseCurrency }}/{{ this.setTargetCurrency }}
        timeseries from last year
      </h3>
      <span v-if="this.$store.state.loaded">
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
      history: [],
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
    setBaseCurrency() {
      return this.$store.state.baseCurrency.cc;
    },

    setTargetCurrency() {
      return this.$store.state.targetCurrency.cc;
    },
  },

  methods: {
    getData() {
      const historicalRate = 'https://fcsapi.com/api-v2/forex/history?symbol=';
      if (this.$store.state.loaded === false) {
        axios.get(`${historicalRate}${this.setBaseCurrency}/${this.setTargetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=6SEwraW2s3dD6zluAtbqAKr2KoQmJBaUNsosz1D4IlkX3<DELETE></DELETE>`)
          .then((response) => {
            this.history = response.data.response;
            this.dataPush();
            this.$store.state.loaded = true;
          })
          .catch((error) => error);
      }
    },

    dataPush() {
      for (let i = 0; i < this.history.length; i += 20) {
        this.chartData.labels.push(this.history[i].tm.slice(0, 10));
        this.chartData.datasets[0].data.push(parseFloat(this.history[i].c));
      }
    },
  },

  mounted() {
    this.$store.state.loaded = false;
    this.getData();
  },

  updated() {
    this.chartData.labels = [];
    this.chartData.datasets[0].data = [];
    this.getData();
  },
};
</script>

<style src="./ChartComponent.scss" lang="scss"/>
