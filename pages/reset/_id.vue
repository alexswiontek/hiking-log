<template>
  <v-layout
    :justify-center="$vuetify.breakpoint.smAndUp"
    class="white ma-0"
    fill-height 
    column
    align-center>
    <article 
      v-if="$vuetify.breakpoint.xs" 
      class="text-xs-center">
      <img src="~/assets/mountain.png" >
      <h1 class="display-1">Hiking Log</h1>                  
    </article>      
    <h2 class="my-3 headline">Reset your password.</h2>
    <reset />
  </v-layout>
</template>

<script>
import Reset from '~/components/Reset';

export default {
  name: 'IndexContainer',
  layout: 'authenticate',
  components: {
    Reset,
  },
};
</script>
