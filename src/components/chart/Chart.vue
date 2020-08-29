<template>
    <div class="chart">
      <p>
        {{ this.$store.state.baseCurrency.cc }}/{{ this.$store.state.targetCurrency.cc }}
        timeseries from last year
      </p>
    </div>
</template>

<script>
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
  },

  data() {
    return {
      actualDate: '',
      pastDate: '',
      history: [],
      historyDate: String,
      historyRate: String,
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
      // The API key should be in a .env file.
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

  beforeUpdate() {
    this.dataLoop();
  },

  mounted() {
    this.dataChart.render();
  },
};
</script>

<style src="./Chart.scss" lang="scss"/>
