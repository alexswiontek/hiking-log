<template>
  <v-app class="background">
    <v-content>
      <v-container
        class="ma-0 pa-0"
        grid-list-sm
        fluid
        fill-height
      >
        <v-layout>
          <v-flex
            v-if="$vuetify.breakpoint.smAndUp"
            class="light--text"
            sm6
          >
            <v-layout
              fill-height
              column
              align-center
              justify-center
            >
              <section class="text-xs-left">
                <article class="text-xs-center">
                  <img src="~/assets/mountain.png">
                  <h1 class="display-1">Hiking Log</h1>
                </article>
                <h2 class="my-3 headline">
                  <v-icon color="primary darken-2">near_me</v-icon>
                  Find places to hike
                </h2>
                <h2 class="my-3 headline">
                  <v-icon color="primary darken-2">person_pin</v-icon>
                  Save hikes to your profile
                </h2>
                <h2 class="my-3 headline">
                  <v-icon color="primary darken-2">terrain</v-icon>
                  Take notes and rate their difficulty
                </h2>
              </section>
            </v-layout>
          </v-flex>
          <v-flex
            class="pa-0"
            xs12
            sm6
          >
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Authenticate',
  data: () => ({
    drawer: null,
  }),
};
</script>

<style scoped>
.background {
  background: var(--v-secondary-lighten4);
  padding: 0 !important;
}
</style>
