<template>
  <v-card
    v-if="getHikeSuccess"
    class="card"
    height="100%"
  >
    <v-img
      :src="image"
      class="white--text"
      height="200px"
    />
    <v-btn
      fab
      bottom
      right
      small
      color="primary"
      class="below-image"
    >
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card-title>
      <v-layout column>
        <v-flex>
          <v-alert
            v-model="alert"
            dismissible
            type="error"
          >{{ getHikeError }}</v-alert>
          <v-text-field
            v-validate="'required'"
            v-model="name"
            :error-messages="errors.collect('name')"
            :disabled="loading"
            name="name"
            label="Name"
          />
        </v-flex>
        <v-flex>
          <label class="v-label theme--light">Difficulty (1-10): </label>
          <span class="label primary--text">{{ difficulty }}</span>
          <v-rating
            v-validate="'required'"
            v-model="difficulty"
            :error-messages="errors.collect('difficulty')"
            :disabled="loading"
            name="difficulty"
            hover
            length="10"
            empty-icon="landscape"
            full-icon="landscape"
            color="primary"
            background-color="grey lighten-1"
          />
        </v-flex>
        <v-flex>
          <label class="v-label theme--light">Time to Complete (hrs): </label>
          <span class="label primary--text">{{ time }}</span>
          <v-rating
            v-model="time"
            :disabled="loading"
            hover
            length="5"
            empty-icon="timelapse"
            full-icon="timelapse"
            color="primary"
            background-color="grey lighten-1"
          />
        </v-flex>
        <v-flex>
          <v-textarea
            v-model="note"
            :disabled="loading"
            label="Notes"
            no-resize
          />
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-actions>
      <v-layout class="text-xs-center">
        <v-flex>
          <v-btn
            :loading="loading"
            :disabled="loading || !isValid"
            flat
            color="primary"
            @click="save"
          >Save</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>

  <v-progress-circular
    v-else-if="getHikeLoading"
    indeterminate
    color="primary"
  />

  <p v-else>Sorry, there is no hike here to display. <nuxt-link to="/home">Go back to the home page?</nuxt-link>
  </p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditCard',
  data: () => ({
    alert: false,
    difficulty: null,
    expand: false,
    image:
      'https://res.cloudinary.com/alexswan/image/upload/v1544906603/stock.jpg',
    name: '',
    note: '',
    time: null,
  }),
  computed: {
    ...mapGetters('hike', [
      'getHikeData',
      'getHikeLoading',
      'getHikeSuccess',
      'getHikeError',
      'updateHikeSuccess',
      'updateHikeError',
      'updateHikeLoading',
    ]),
    loading() {
      return this.getHikeLoading || this.updateHikeLoading;
    },
    isValid() {
      return (
        !!this.name &&
        !!this.difficulty &&
        this.time &&
        this.errors.count() === 0
      );
    },
  },
  watch: {
    getHikeSuccess() {
      const { name, difficulty, time, note } = this.getHikeData;

      this.name = name;
      this.difficulty = difficulty;
      this.time = time;
      this.note = note;
    },
    updateHikeSuccess() {
      setTimeout(() => {
        this.$router.push('/home');
      }, 500);
    },
    getHikeError(error) {
      if (error) {
        this.alert = true;
      }
    },
    updateHikeError(error) {
      if (error) {
        this.alert = true;
      }
    },
  },
  created() {
    this.getHike(this.$route.params.id);
  },
  methods: {
    ...mapActions('hike', ['getHike', 'updateHike']),
    save() {
      if (this.isValid) {
        this.updateHike({
          id: this.$route.params.id,
          name: this.name,
          difficulty: this.difficulty,
          time: this.time,
          note: this.note,
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 4px 4px 9px var(--v-accent-darken2);
}

.below-image {
  position: absolute;
  top: 175px;
  right: 0;
}
</style>


