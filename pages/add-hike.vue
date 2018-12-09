<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <add-card />
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
