<template>
  <v-app class="background">
    <v-content>
      <v-container 
        fluid 
        fill-height>
        <v-layout 
          align-center 
          justify-center>
          <v-flex
            class="container"
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
}

.container {
  max-width: 600px;
}
</style>
