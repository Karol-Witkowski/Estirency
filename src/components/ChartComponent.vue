<template>
    <section>
      <header>
        <h3>
          {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
          data from last year
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
import datachart from '@/components/Chart.vue';

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
      this.chartData.datasets[0].data = Object.keys(this.historyData)
        // eslint-disable-next-line max-len
        .map((k) => this.historyData[k][this.$store.state.targetCurrency.cc]).filter((e, i) => i % 20 === 0);
      this.chartData.labels = Object.keys(this.historyData).filter((e, i) => i % 20 === 0);
    },

    getData() {
      const historicalRate = 'https://api.exchangerate.host/timeseries?start_date=';

      if (this.$store.state.loaded === false) {
        axios.get(`${historicalRate}${this.pastDate}&end_date=${this.actualDate}&base=${this.$store.state.baseCurrency.cc}&symbols=${this.$store.state.targetCurrency.cc}`)
          .then((response) => {
            this.historyData = response.data.rates;
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

<style src="@/stylesheets/ChartComponent.scss" lang="scss" scoped />
