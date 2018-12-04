<template>
  <v-app>
    <toolbar />
    <v-content class="background">
      <v-container
        class="container"
        grid-list-md
      >
        <nuxt />
      </v-container>
    </v-content>
    <footer />
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar';
import Footer from '~/components/Footer';

export default {
  name: 'Default',
  middleware: 'auth',
  components: {
    Toolbar,
    Footer,
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.background {
  background: var(--v-light-base);
}
</style>
