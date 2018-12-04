<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <profile />
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from '~/components/Profile';

export default {
  name: 'ProfileParent',
  components: {
    Profile,
  },
};
</script>
