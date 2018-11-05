const TYPES = {
  GENERIC_REQUEST: 'GENERIC_REQUEST',
  GENERIC_ERROR: 'GENERIC_ERROR',
  SET_USER_SUCCESS: 'SET_USER_SUCCESS',
  FORGOT_USER_SUCCESS: 'FORGOT_USER_SUCCESS',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
};

const authTypes = {
  user: 'user',
  forgot: 'forgot',
  reset: 'reset',
  update: 'update',
};

const determineMessage = statusCode => {
  switch (statusCode) {
    case 401:
    case 404:
      return 'There was an issue with either your email or password. Do you have a typo? 😅';
    case 500:
    default:
      return 'There was an error reaching the server, please try again later!';
  }
};

const auth = {
  namespaced: true,
  state: () => ({
    user: {
      error: '',
      loading: false,
      success: '',
      data: null,
    },
    forgot: {
      error: '',
      loading: false,
      success: '',
    },
    reset: {
      error: '',
      loading: false,
      success: '',
    },
    update: {
      error: '',
      loading: false,
      success: '',
    },
  }),
  getters: {
    authLoading: state => state.user.loading,
    authUser: state => state.user.data,
    authError: state => state.user.error,
    authSuccess: state => state.user.success,
    forgotLoading: state => state.forgot.loading,
    forgotError: state => state.forgot.error,
    forgotSuccess: state => state.forgot.success,
    resetLoading: state => state.reset.loading,
    resetError: state => state.reset.error,
    resetSuccess: state => state.reset.success,
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
    SET_USER_SUCCESS(state, user) {
      state.user.data = user;
      state.user.error = '';
      state.user.loading = false;
      state.user.success = 'You have successfully loaded the user.';
    },
    FORGOT_USER_SUCCESS(state) {
      state.forgot.error = '';
      state.forgot.loading = false;
      state.forgot.success =
        'You have successfully sent a user success password';
    },
    RESET_PASSWORD_SUCCESS(state) {
      state.reset.error = '';
      state.reset.loading = false;
      state.reset.success = 'You have successfully reset your password.';
    },
  },
  actions: {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    // nuxtServerInit({ commit }, { req }) {
    //   if (req.session && req.session.authUser) {
    //     commit(TYPES.SET_USER_SUCCESS, req.session.authUser);
    //   }
    // },
    async register({ commit }, { email, password, confirmPassword }) {
      commit(TYPES.GENERIC_REQUEST, authTypes.user);
      try {
        const data = await this.$axios.$post('/register', {
          email,
          password,
          confirmPassword,
        });
        commit(TYPES.SET_USER_SUCCESS, data);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: authTypes.user,
        });
      }
    },
    async login({ commit }, { email, password }) {
      commit(TYPES.GENERIC_REQUEST, authTypes.user);
      try {
        const data = await this.$axios.$post('/login', {
          email,
          password,
        });
        commit(TYPES.SET_USER_SUCCESS, data);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: determineMessage(error.response.status),
          type: authTypes.user,
        });
      }
    },
    async logout({ commit }) {
      commit(TYPES.GENERIC_REQUEST, authTypes.user);
      try {
        await this.$axios.$post('/logout');
        commit(TYPES.SET_USER_SUCCESS, null);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: authTypes.user,
        });
      }
    },
    async forgotPassword({ commit }, email) {
      commit(TYPES.GENERIC_REQUEST, authTypes.forgot);
      try {
        const data = await this.$axios.$post('/forgot-password', { email });
        commit(TYPES.FORGOT_USER_SUCCESS, data);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: authTypes.forgot,
        });
      }
    },
    async reset({ commit }, { password, confirmPassword, token }) {
      commit(TYPES.GENERIC_REQUEST, authTypes.reset);
      try {
        await this.$axios.$post('/reset', {
          password,
          confirmPassword,
          token,
        });
        commit(TYPES.RESET_PASSWORD_SUCCESS);
      } catch (error) {
        commit(TYPES.GENERIC_ERROR, {
          message: error.response.data.message,
          type: authTypes.reset,
        });
      }
    },
  },
};

export default auth;
