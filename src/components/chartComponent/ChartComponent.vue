<template>
    <section>
      <header>
        <h3>
          {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
          timeseries from last year
        </h3>
      </header>
      <span v-if="$store.state.loaded">
        <datachart
          :chartdata="chartData"
          class="dataChart"
          :options="options"
        />
      </span>
    </section>
</template>

<script>
import axios from 'axios';
import datachart from '@/components/chartComponent/chart/Chart.vue';

require('dotenv').config();

export default {
  name: 'ChartComponent',
  components: {
    datachart,
  },

  data() {
    return {
      actualDate: '',
      pastDate: '',
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

  methods: {
    getDatePeriod() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate() - 1;

      if (month < 10 && day < 10) {
        this.actualDate = `${year}-0${month}-0${day}`;
        this.pastDate = `${year - 1}-0${month}-0${day}`;
      } else if (month > 9 && day < 10) {
        this.actualDate = `${year}-${month}-0${day}`;
        this.pastDate = `${year - 1}-${month}-0${day}`;
      } else if (month < 10 && day > 9) {
        this.actualDate = `${year}-0${month}-${day}`;
        this.pastDate = `${year - 1}-0${month}-${day}`;
      } else {
        this.actualDate = `${year}-${month}-${day}`;
        this.pastDate = `${year - 1}-${month}-${day}`;
      }
    },

    setData() {
      this.chartData.datasets[0].data = this.historyData
        .map((rate) => Number(rate.c));
      this.chartData.labels = this.historyData
        .map((date) => date.tm
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('.'));
    },

    getData() {
      const historicalRate = 'https://fcsapi.com/api-v2/forex/history?symbol=';

      if (this.$store.state.loaded === false) {
        axios.get(`${historicalRate}${this.$store.state.baseCurrency.cc}/${this.$store.state.targetCurrency.cc}&period=1d&from=${this.pastDate}T12:00&to=${this.actualDate}T12:00&access_key=${process.env.VUE_APP_CURRENCY_API_KEY}`)

          .then((response) => {
            this.historyData = response.data.response
              .filter((e, i) => i % 20 === 0);
            this.setData();
            this.$store.state.loaded = true;
          })
          .catch((error) => error);
      }
    },
  },

  mounted() {
    this.$store.state.loaded = false;
    this.getDatePeriod();
    this.getData();
  },

  updated() {
    this.getData();
  },
};
</script>

<style src="./ChartComponent.scss" lang="scss" scoped />
