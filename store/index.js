import Vuex from 'vuex';
import auth from './modules/auth';

const debug = process.env.NODE_ENV !== 'production';

const createStore = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      auth,
    },
    strict: debug,
  });
};

export default createStore;
