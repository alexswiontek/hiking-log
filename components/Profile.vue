<template>
  <v-card class="elevation-12">
    <v-toolbar 
      color="primary lighten-1" 
      dark>
      <v-toolbar-title>Profile</v-toolbar-title>
    </v-toolbar>
    <v-card-title 
      v-if="authUser && authUser.email" 
      primary-title>
      <h3 class="title">Email:  {{ authUser.email }}</h3>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
};
</script>
