import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  theme: {
    primary: '#009688',
    secondary: '#00695C',
    accent: '#80CBC4',
    error: '#F4511E',
    warning: '#FFF176',
    info: '#2196f3',
    success: '#69F0AE',
    mid: '#97ccc2',
    light: '#eafbf8',
  },
  options: {
    customProperties: true,
  },
});
