<template>
    <div class="chart">
      <p class="chartDescription">
        {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
        timeseries from last year
      </p>
      <VueApexCharts
      id="dataChart"
      width="97.5%"
      height="440px"
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

const historicalRate = 'https://fcsapi.com/api-v2/forex/history?symbol= BLOCKED';
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
  name: 'Chart',
  components: {
    VueApexCharts,
  },

  data() {
    return {
      actualDate: '',
      pastDate: '',
      history: [],
      historyDate: String,
      historyRate: String,
      options: {
        chart: {
          id: 'dataChart',
          type: 'area',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            maxHeight: 120,
            datetimeFormatter: {
              year: '.yy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: '',
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#31748d'],
            shadeIntensity: 1,
            type: 'horizontal',
            stops: [0, 50, 100, 100],
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'string',
          width: 2,
          dashArray: 0,
        },
        markers: {
          size: 0,
          colors: '#1ebffa',
          strokeColors: '#fff',
          strokeWidth: 0,
          strokeOpacity: 0,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: 'circle',
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: 3.7,
            sizeOffset: 1,
          },
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
    setHistoryRate() {
      return this.historyRate;
    },
  },

  methods: {
    getData() {
      // The API key should be in a .env file, and never in the open repo.
      // I left that free version key here to provide full experience on launch.
      axios.get(`${historicalRate}${this.setBaseCurrency}/${this.setTargetCurrency}&period=1d&from=${pastDate}T12:00&to=${actualDate}T12:00&access_key=6SEwraW2s3dD6zluAtbqAKr2KoQmJBaUNsosz1D4IlkX3`)
        .then((response) => {
          this.history = response.data.response;
          this.dataLoop();
        })
        .catch((error) => error);
    },

    dataLoop() {
      for (let i = 0; i < this.history.length; i += 1) {
        this.options.xaxis.categories.push(this.history[i].tm);
        this.series[0].data.push(this.history[i].c);
      }
    },
  },
  beforeMount() {
    this.getData();
  },

  mounted() {
    VueApexCharts.render();
    this.dataLoop();
  },

  beforeUpdate() {
    VueApexCharts.render();
    this.dataLoop();
  },
};
</script>

<style src="./Chart.scss" lang="scss"></style>
