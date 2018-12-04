const TYPES = {
  GENERIC_REQUEST: 'GENERIC_REQUEST',
  GENERIC_ERROR: 'GENERIC_ERROR',
  ADD_HIKE_SUCCESS: 'ADD_HIKE_SUCCESS',
  GET_HIKES_SUCCESS: 'GET_HIKES_SUCCESS',
};

const hikeTypes = {
  addHike: 'addHike',
  hikes: 'hikes',
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
    hikes: {
      error: '',
      loading: false,
      success: '',
      data: [],
    },
  }),
  getters: {
    addHikeLoading: state => state.addHike.loading,
    addHikeSuccess: state => state.addHike.success,
    addHikeError: state => state.addHike.error,
    hikesLoading: state => state.hikes.loading,
    hikesSuccess: state => state.hikes.success,
    hikesError: state => state.hikes.error,
    hikes: state => state.hikes.data,
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
    GET_HIKES_SUCCESS(state, hikes) {
      state.hikes.error = '';
      state.hikes.loading = false;
      state.hikes.success =
        'You have successfully retrieved the available hikes.';
      state.hikes.data = hikes;
    },
  },
  actions: {
    async addHike({ commit }, { name, difficulty, time, note }) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.addHike);
      try {
        await this.$axios.$post('/add-hike', {
          name,
          difficulty,
          time,
          note,
        });
        commit(TYPES.ADD_HIKE_SUCCESS);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: hikeTypes.addHike,
        });
      }
    },
    async getHikes({ commit }) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.hikes);
      try {
        const hikes = await this.$axios.$get('/hikes');
        commit(TYPES.GET_HIKES_SUCCESS, hikes);
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
