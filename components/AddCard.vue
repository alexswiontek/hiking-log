<template>
  <v-card 
    class="card" 
    height="100%">
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
            v-model="nameEdit"
            :disabled="creating"
            label="Name of Hike"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="difficultyEdit"
            :disabled="creating"
            label="Difficulty"
          />
        </v-flex>
        <v-flex>
          <v-textarea
            v-model="noteEdit"
            :disabled="creating"
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
            :loading="creating"
            :disabled="creating"
            flat
            color="primary" 
            @click="save">Save</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AddCard',
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
    creating: false,
    difficultyEdit: '',
    expand: false,
    idEdit: '',
    imageEdit: '',
    nameEdit: '',
    noteEdit: '',
  }),
  methods: {
    save() {
      this.creating = true;
      // TODO: add save functionality here

      // Simulate functionality
      setTimeout(() => {
        this.creating = false;
        this.$router.push('/');
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


