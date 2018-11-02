<template>
  <v-layout justify-center>
    <v-flex 
      xs12 
      sm8 
      md6>
      <no-ssr>
        <add-card />
      </no-ssr>
    </v-flex>
  </v-layout>
</template>

<script>
import AddCard from '~/components/AddCard';

export default {
  name: 'AddHike',
  components: {
    AddCard,
  },
};
</script>

<style scoped>
</style>
