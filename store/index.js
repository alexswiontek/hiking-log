import Vuex from 'vuex';
import auth from './modules/auth';
import hike from './modules/hike';

const debug = process.env.NODE_ENV !== 'production';

const createStore = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      auth,
      hike,
    },
    strict: debug,
  });
};

export default createStore;
