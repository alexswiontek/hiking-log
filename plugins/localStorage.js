import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    key: 'hikinglog',
    paths: ['auth'],
  })(store);
};
