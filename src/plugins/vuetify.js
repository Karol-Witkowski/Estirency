import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/styles/main.sass';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#fab',
    success: '#fab',
    info: 'purple',
    error: 'purple',
  },
});

export default new Vuetify({
});
