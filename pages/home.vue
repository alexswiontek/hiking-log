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
    success: false,
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
