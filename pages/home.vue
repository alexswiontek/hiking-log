<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      type="error"
    >{{ deleteHikeError }}</v-alert>
    <v-alert
      v-model="success"
      dismissible
      type="success"
    >{{ deleteHikeSuccess }}</v-alert>
    <v-layout>
      <v-flex
        xs12
        offset-sm8
        sm4
      >
        <v-select
          v-model="sort"
          :items="items"
          label="Sort the hikes"
          item-text="text"
          item-value="sort"
        />
      </v-flex>
    </v-layout>
    <card-list
      v-if="hikesLoading || hikes.length > 0"
      :loading="hikesLoading"
      :cards="hikes"
    />
    <v-layout
      v-else
      class="pa-4 centered"
      column
    >
      <v-flex>
        <p class="headline">Hmm, seems like there are no hikes here yet.</p>
      </v-flex>
      <v-flex>
        <p class="subheading">Care to add one? <nuxt-link to="/add-hike">Add a new hike</nuxt-link>
        </p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardList from '~/components/CardList';

export default {
  components: {
    CardList,
  },
  data: () => ({
    alert: false,
    items: [
      { text: '🆕 New (default)', sort: { created: 'desc' } },
      { text: '📆 Old', sort: { created: 'asc' } },
      { text: '🏖️ Easy', sort: { difficulty: 'asc' } },
      { text: '☠️ Hard', sort: { difficulty: 'desc' } },
      { text: '🚶 Short', sort: { time: 'asc' } },
      { text: '⛺ Long', sort: { time: 'desc' } },
    ],
    success: false,
    sort: {},
  }),
  computed: {
    ...mapGetters('hike', [
      'hikes',
      'hikesLoading',
      'deleteHikeLoading',
      'deleteHikeSuccess',
      'deleteHikeError',
    ]),
  },
  watch: {
    deleteHikeSuccess(success) {
      if (success) {
        this.success = true;

        this.getHikes();
      }
    },
    deleteHikeError(error) {
      if (error) {
        this.alert = true;
      }
    },
    sort(value) {
      if (value) {
        this.getHikes(value);
      }
    },
  },
  created() {
    this.getHikes();
  },
  methods: {
    ...mapActions('hike', ['getHikes']),
  },
};
</script>

<style scoped>
.centered {
  max-width: 550px;
  margin: 0 auto !important;
}
</style>
