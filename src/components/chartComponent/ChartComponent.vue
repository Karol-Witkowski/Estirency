<template>
    <div class="chart">
      <p>
        <span>{{ this.$store.state.baseCurrency.cc }}/</span>
        <span>{{ this.$store.state.targetCurrency.cc }} timeseries from last year</span>
      </p>
      <span v-if="this.$store.state.loaded">
        <datachart id="dataChart" :chartdata="chartData" :options="options"/>
      </span>
    </div>
</template>

<script>
import axios from 'axios';
import datachart from '@/components/chartComponent/chart/Chart.vue';

let actualDate;
let pastDate;

const historicalRate = 'https://fcsapi.com/api-v2/forex/history?symbol=';
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
      actualDate: '',
      pastDate: '',
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

    dataLoop() {
      // Dummy placeholder for github-pages
      // Restore previous version from repository
      this.chartData.labels.push('Dummy1', 'Dummy2', 'Dummy3', 'Dummy4', 'Dummy5', 'Dummy6', 'Dummy7', 'Dummy8', 'Dummy9', 'Dummy10', 'Dummy11', 'Dummy12', 'Dummy13');
      this.chartData.datasets[0].data.push(12, 15, 10, 9, 10, 9, 12, 11, 10, 8, 9, 7, 9);
      this.$store.state.loaded = true;
    },

    getData() {
      // Remove <DELETETHSIS> from the URL to activate working call
      if (this.$store.state.loaded === false) {
        axios.get(`${historicalRate}${this.setBaseCurrency}/${this.setTargetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=6SEwraW2s3dD6zluAtbqAKr2KoQmJBaUNsosz1D4IlkX3<DELETETHIS>`)
          .then((response) => {
            this.history = response.data.response;
            this.dataLoop();
            this.$store.state.loaded = true;
          })
          .catch((error) => error);
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
