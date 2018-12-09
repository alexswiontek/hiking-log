<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <edit-card />
    </v-flex>
  </v-layout>
</template>

<script>
import EditCard from '~/components/EditCard';

export default {
  name: 'EditSlug',
  components: {
    EditCard,
  },
};
</script>
