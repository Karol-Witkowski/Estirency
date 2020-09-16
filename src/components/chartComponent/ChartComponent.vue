<template>
    <div class="chart">
      <p>
        {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
        timeseries from last year
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
      for (let i = 0; i < this.history.length; i += 20) {
        const label = this.history[i].tm.slice(0, 10);
        const value = this.history[i].c;
        this.chartData.labels.push(label);
        this.chartData.datasets[0].data.push(value);
      }
    },

    getData() {
      // The API key should be in a .env file.
      // I left that free version key here to provide full experience on launch.
      // Remove <DELETETHSIS> from the URL to activate working call
      axios.get(`${historicalRate}${this.setBaseCurrency}/${this.setTargetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=WOR4I12d7qPWzV0A3yw1KRHeApKaB8ZjCtpsy9ZTzCnOeNUu9k<DELETETHIS>`)
        .then((response) => {
          this.history = response.data.response;
          this.dataLoop();
          this.$store.state.loaded = true;
        })
        .catch((error) => error);
    },
  },

  mounted() {
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
