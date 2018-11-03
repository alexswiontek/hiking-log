<template>
  <v-toolbar
    fixed
    app
    color="primary"
    dark
  >
    <img src="~/assets/mountain.png" >
    <v-toolbar-title class="link">
      <nuxt-link to="/home">Hiking Log</nuxt-link>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn 
        flat 
        @click="addHike">
        <v-icon>add</v-icon>
        Add
      </v-btn>
      <v-btn 
        flat 
        @click="viewHikes">View List</v-btn>
      <v-menu
        transition="slide-y-transition"
        bottom
        left
        offset-y>
        <v-btn 
          slot="activator" 
          flat>
          <v-icon
            icon>
            person
          </v-icon>
        </v-btn>
        <v-list 
          dark 
          class="primary">
          <v-list-tile @click="editProfile">
            <v-list-tile-content class="pr-2">
              <v-icon medium>mode_edit</v-icon>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>Edit Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logoutUser">
            <v-list-tile-content class="pr-2">
              <v-icon medium>lock_outline</v-icon>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Toolbar',
  methods: {
    ...mapActions('auth', ['logout']),
    addHike() {
      this.$router.push('/add-hike');
    },
    viewHikes() {
      this.$router.push('/home');
    },
    async logoutUser() {
      try {
        await this.logout();
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
    editProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
}

.link a {
  color: white;
  text-decoration: none;
}
</style>
