<template>
    <div class="chart">
      <p class="chartDescription">
        {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
        timeseries from last year
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
  name: 'Rate',
  components: {
    VueApexCharts,
  },

  data() {
    return {
      actualDate: '',
      pastDate: '',
      history: '',
      historyDate: Number,
      historyRate: Number,
      options: {
        chart: {
          fontFamily: 'Poppins, Helvetica, sans-serif',
          height: '100%',
          width: '100%',
          type: 'area',
          animations: {
            initialAnimation: {
              enabled: false,
            },
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: true,
            },
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'datetime',
        },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#7affb8'],
            shadeIntensity: 1,
            type: 'horizontal',
            stops: [0, 80, 100, 100],
          },
        },
        markers: {
          size: 4,
          colors: ['#1ebffa'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 5,
          },
        },
      },
      series: [{
        name: 'Rate',
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
    setHistoryRate() {
      return this.historyRate;
    },
  },

  created() {
    axios.get(`${historicalRate}${this.setBaseCurrency}/${this.setTargetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=6SEwraW2s3dD6zluAtbqAKr2KoQmJBaUNsosz1D4IlkX3`).then((response) => {
      this.history = response.data.response;

      for (let i = 0; i < this.history.length; i += 1) {
        // eslint-disable-next-line prefer-const
        let c = [];
        c.push(Date.parse(this.history[i].tm),
          this.history[i].c);
        this.series.data.push(c);
      }
    }).catch((error) => error);
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
