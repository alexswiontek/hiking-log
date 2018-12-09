<template>
  <v-card
    class="card"
    height="100%"
  >
    <v-img
      :src="image"
      class="white--text"
      height="200px"
    >
      <v-container
        fill-height
        fluid
      >
        <v-layout fill-height>
          <v-flex
            xs12
            flexbox
            class="text-xs-center"
          >
            <p class="text-parent">
              <span
                class="headline custom-text"
                @click="editCard"
              >
                {{ name }}
              </span>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <v-card-title>
      <v-layout column>
        <v-flex>
          <span class="grey--text mr-2">Difficulty (1-10):</span>
          <span class="font-weight-bold primary--text">{{ difficulty }}</span>
          <div>
            <span
              v-for="n in difficulty"
              :key="n"
            >
              <v-icon class="primary--text">landscape</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex v-if="time">
          <span class="grey--text mr-2">Time to Complete (hrs):</span>
          <span class="font-weight-bold primary--text">{{ time }}</span>
          <div>
            <span
              v-for="n in time"
              :key="n"
            >
              <v-icon class="primary--text">timelapse</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex v-if="note">
          <span class="grey--text mr-2">Notes:</span>
          <div v-if="longNote">
            <span>{{ toggleNote }}</span>
            <v-icon
              color="primary"
              @click="toggleExpand"
            >
              {{ icon }}
            </v-icon>
          </div>
          <span v-else>{{ note }}</span>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-actions>
      <v-layout class="text-xs-center">
        <v-flex>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-btn
              slot="activator"
              :disabled="deleteHikeLoading"
              flat
              color="error"
            >Delete</v-btn>

            <v-card>
              <v-card-title
                class="headline error white--text"
                primary-title
              >
                Are you sure you want to delete this hike?
              </v-card-title>

              <v-card-text class="text-xs-center">
                <h2>{{ name }}</h2>
                <img
                  :src="image"
                  height="200px"
                >
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="deleteHikeLoading"
                  :loading="deleteHikeLoading"
                  color="error"
                  @click="deleteHikePage"
                >
                  Delete
                </v-btn>
                <v-btn
                  color="secondary"
                  flat
                  class="ml-2"
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex>
          <v-btn
            flat
            color="primary"
            @click="editCard"
          >Edit</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const MAX_NOTE_LENGTH = 100;

export default {
  name: 'Card',
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
      default: 1,
    },
    note: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    alert: false,
    dialog: false,
    expand: false,
  }),
  computed: {
    ...mapGetters('hike', [
      'deleteHikeLoading',
      'deleteHikeSuccess',
      'deleteHikeError',
    ]),
    icon() {
      return this.expand ? 'expand_less' : 'expand_more';
    },
    longNote() {
      return this.note.length > MAX_NOTE_LENGTH;
    },
    shortenedNote() {
      return this.note.slice(0, MAX_NOTE_LENGTH) + '...';
    },
    toggleNote() {
      return this.expand ? this.note : this.shortenedNote;
    },
  },
  watch: {
    deleteHikeSuccess(success) {
      if (success) {
        this.dialog = false;
      }
    },
    deleteHikeError(error) {
      if (error) {
        this.dialog = false;
      }
    },
  },
  methods: {
    ...mapActions('hike', ['deleteHike', 'getHikes']),
    editCard() {
      this.$router.push(`/edit/${this.id}`);
    },
    deleteHikePage() {
      this.deleteHike(this.id);
    },
    toggleExpand() {
      this.expand = !this.expand;
    },
  },
};
</script>

<style scoped>
.custom-text {
  text-transform: uppercase;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px;
  font-style: italic;
  line-height: 1.7 !important;
  cursor: pointer;
}

.custom-text::before {
  transform: skew(-20deg);
}

.text-parent:hover {
  transform: scale(1.2);
  transition: all 0.2s;
}

.card {
  box-shadow: 4px 4px 9px var(--v-accent-darken2);
}
</style>


