<template>
  <v-card
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
          >{{ addHikeError }}</v-alert>
        </v-flex>
        <v-flex>
          <v-text-field
            v-validate="'required'"
            v-model="name"
            :disabled="addHikeLoading"
            :error-messages="errors.collect('name')"
            name="name"
            label="Name of Hike"
            @keyup.enter="save"
          />
        </v-flex>
        <v-flex justify-center>
          <label class="v-label theme--light">Difficulty (1-10): </label>
          <span
            v-if="difficulty"
            class="label primary--text"
          >{{ difficulty }}</span>
          <v-rating
            v-model="difficulty"
            :disabled="addHikeLoading"
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
          <span
            v-if="time"
            class="label primary--text"
          >{{ time }}</span>
          <v-rating
            v-model="time"
            :disabled="addHikeLoading"
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
            :disabled="addHikeLoading"
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
            :loading="addHikeLoading"
            :disabled="addHikeLoading || !isValid"
            flat
            color="primary"
            @click="save"
          >Save</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddCard',
  data: () => ({
    alert: false,
    difficulty: null,
    expand: false,
    image: require('~/assets/stock.jpeg'),
    name: '',
    note: '',
    time: null,
  }),
  computed: {
    ...mapGetters('hike', ['addHikeLoading', 'addHikeSuccess', 'addHikeError']),
    isValid() {
      return !!this.name && !!this.difficulty && this.errors.count() === 0;
    },
  },
  watch: {
    addHikeSuccess(value) {
      if (value) {
        this.$router.push('/home');
      }
    },
    addHikeError(error) {
      if (error) {
        this.alert = true;
      }
    },
  },
  methods: {
    ...mapActions('hike', ['addHike']),
    save() {
      if (this.isValid) {
        this.addHike({
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

.label {
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
}
</style>


