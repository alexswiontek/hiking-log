const TYPES = {
  GENERIC_REQUEST: 'GENERIC_REQUEST',
  GENERIC_ERROR: 'GENERIC_ERROR',
  ADD_HIKE_SUCCESS: 'ADD_HIKE_SUCCESS',
  GET_HIKES_SUCCESS: 'GET_HIKES_SUCCESS',
  GET_HIKE_SUCCESS: 'GET_HIKE_SUCCESS',
  UPDATE_HIKE_SUCCESS: 'UPDATE_HIKE_SUCCESS',
  DELETE_HIKE_SUCCESS: 'DELETE_HIKE_SUCCESS',
};

const hikeTypes = {
  addHike: 'addHike',
  hikes: 'hikes',
  getHike: 'getHike',
  updateHike: 'updateHike',
  deleteHike: 'deleteHike',
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
    getHike: {
      error: '',
      loading: false,
      success: '',
      data: {},
    },
    updateHike: {
      error: '',
      loading: false,
      success: '',
      data: {},
    },
    deleteHike: {
      error: '',
      loading: false,
      success: '',
      data: {},
    },
  }),
  getters: {
    addHikeLoading: state => state.addHike.loading,
    addHikeSuccess: state => state.addHike.success,
    addHikeError: state => state.addHike.error,
    hikesLoading: state => state.hikes.loading,
    hikesSuccess: state => state.hikes.success,
    hikesError: state => state.hikes.error,
    getHikeLoading: state => state.getHike.loading,
    getHikeSuccess: state => state.getHike.success,
    getHikeError: state => state.getHike.error,
    getHikeData: state => state.getHike.data,
    updateHikeLoading: state => state.updateHike.loading,
    updateHikeSuccess: state => state.updateHike.success,
    updateHikeError: state => state.updateHike.error,
    deleteHikeLoading: state => state.deleteHike.loading,
    deleteHikeSuccess: state => state.deleteHike.success,
    deleteHikeError: state => state.deleteHike.error,
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
    GET_HIKE_SUCCESS(state, hike) {
      state.getHike.error = '';
      state.getHike.loading = false;
      state.getHike.success = 'You have successfully retrieved the hike.';
      state.getHike.data = hike;
    },
    UPDATE_HIKE_SUCCESS(state, hike) {
      state.updateHike.error = '';
      state.updateHike.loading = false;
      state.updateHike.success = 'You have successfully updated the hike.';
      state.updateHike.data = hike;
    },
    DELETE_HIKE_SUCCESS(state, hike) {
      state.deleteHike.error = '';
      state.deleteHike.loading = false;
      state.deleteHike.success = 'You have successfully deleted the hike.';
      state.deleteHike.data = hike;
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
    async getHike({ commit }, id) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.getHike);
      try {
        const hike = await this.$axios.$get(`/hike/${id}`);
        commit(TYPES.GET_HIKE_SUCCESS, hike);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: hikeTypes.getHike,
        });
      }
    },
    async updateHike({ commit }, { id, name, difficulty, time, note = '' }) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.updateHike);
      try {
        const updatedHike = await this.$axios.$put(`/hike/${id}`, {
          name,
          difficulty,
          time,
          note,
        });
        commit(TYPES.UPDATE_HIKE_SUCCESS, updatedHike);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: hikeTypes.updateHike,
        });
      }
    },
    async deleteHike({ commit }, id) {
      commit(TYPES.GENERIC_REQUEST, hikeTypes.deleteHike);
      try {
        const deletedHike = await this.$axios.$delete(`/hike/${id}`);
        commit(TYPES.DELETE_HIKE_SUCCESS, deletedHike);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: hikeTypes.deleteHike,
        });
      }
    },
  },
};

export default auth;
