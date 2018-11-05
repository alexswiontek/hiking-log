<template>
  <v-layout justify-center >
    <v-flex 
      xs12 
      sm8 
      md6>
      <no-ssr>
        <profile />
      </no-ssr>
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
