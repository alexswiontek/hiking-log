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
          <v-text-field
            v-validate="'required'"
            v-model="nameEdit"
            :error-messages="errors.collect('name')"
            :disabled="updating"
            name="name"
            label="Name"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-validate="'required|numeric'"
            v-model="difficultyEdit"
            :disabled="updating"
            :error-messages="errors.collect('difficulty')"
            label="Difficulty"
            name="difficulty"
            type="number"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="timeEdit"
            :disabled="updating"
            label="Time to Complete (hrs)"
          />
        </v-flex>
        <v-flex>
          <v-textarea
            v-model="noteEdit"
            :disabled="updating"
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
            :loading="updating"
            :disabled="updating"
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
export default {
  name: 'EditCard',
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: require('~/assets/stock.jpeg'),
    },
    difficulty: {
      type: [String, Number],
      default: null,
    },
    note: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    nameEdit: '',
    idEdit: '',
    imageEdit: '',
    difficultyEdit: '',
    noteEdit: '',
    timeEdit: '',
    expand: false,
    updating: false,
  }),
  mounted() {
    this.nameEdit = this.name;
    this.difficultyEdit = this.difficulty;
    this.noteEdit = this.note;
  },
  methods: {
    save() {
      this.updating = true;
      // TODO: add save functionality here

      // Simulate functionality
      setTimeout(() => {
        this.updating = false;
        this.$router.push('/home');
      }, 1000);
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


