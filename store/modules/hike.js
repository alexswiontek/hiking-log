const TYPES = {
  GENERIC_REQUEST: 'GENERIC_REQUEST',
  GENERIC_ERROR: 'GENERIC_ERROR',
  ADD_HIKE_SUCCESS: 'ADD_HIKE_SUCCESS',
};

const hikeTypes = {
  addHike: 'addHike',
};

const auth = {
  namespaced: true,
  state: () => ({
    addHike: {
      error: '',
      loading: false,
      success: '',
      data: null,
    },
  }),
  getters: {
    addHikeLoading: state => state.addHike.loading,
    addHikeSuccess: state => state.addHike.success,
    addHikeError: state => state.addHike.error,
  },
  mutations: {
    GENERIC_REQUEST(state, type) {
      state[type].error = '';
      state[type].loading = true;
      state[type].success = '';
    },
    GENERIC_ERROR(state, { message, type }) {
      state[type].error = message;
      state[type].loading = false;
      state[type].success = '';
    },
    ADD_HIKE_SUCCESS(state) {
      state.addHike.error = '';
      state.addHike.loading = false;
      state.addHike.success = 'You have added the hike successfully!';
    },
  },
  actions: {
    async addHike({ commit }, hikingData) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.addHike);
      try {
        await this.$axios.$post('/add-hike', hikingData);
        commit(TYPES.ADD_HIKE_SUCCESS);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: hikeTypes.addHike,
        });
      }
    },
  },
};

export default auth;
