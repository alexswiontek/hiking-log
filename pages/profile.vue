<template>
  <v-layout justify-center >
    <v-flex 
      xs12 
      sm8 
      md6>
      <profile
        :email="email"
      />
    </v-flex>    
  </v-layout>
</template>

<script>
import Profile from '~/components/Profile';

export default {
  asyncData() {
    return { email: 'j@j.co' };
  },
  name: 'ProfileParent',
  components: {
    Profile,
  },
};
</script>
