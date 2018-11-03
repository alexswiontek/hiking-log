const TYPES = {
  SET_USER: 'SET_USER',
  SET_USER_SUCCESS: 'SET_USER_SUCCESS',
  SET_USER_ERROR: 'SET_USER_ERROR',
};

const auth = {
  namespaced: true,
  state: () => ({
    user: null,
    error: '',
  }),
  getters: {
    authUser: state => state.user,
    authError: state => state.error,
  },
  mutations: {
    SET_USER(state) {
      state.user = null;
      state.error = '';
    },
    SET_USER_SUCCESS(state, user) {
      state.user = user;
      state.error = '';
    },
    SET_USER_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit(TYPES.SET_USER_SUCCESS, req.session.authUser);
      }
    },
    async register({ commit }, { email, password }) {
      commit(TYPES.SET_USER);
      try {
        const data = await this.$axios.$post('/register', {
          email,
          password,
        });
        commit(TYPES.SET_USER_SUCCESS, data);
      } catch (error) {
        if (error.response) {
          commit(TYPES.SET_USER_ERROR, error.response.data.message);
        }
        throw error;
      }
    },
    async login({ commit }, { email, password }) {
      commit(TYPES.SET_USER);
      try {
        const data = await this.$axios.$post('/login', {
          email,
          password,
        });
        commit(TYPES.SET_USER_SUCCESS, data);
      } catch (error) {
        if (error.response) {
          commit(TYPES.SET_USER_ERROR, error.response.data.message);
        }
        throw error;
      }
    },
    async logout({ commit }) {
      await this.$axios.$post('/logout');
      commit(TYPES.SET_USER, null);
    },
  },
};

export default auth;
