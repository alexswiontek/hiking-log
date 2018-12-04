<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <edit-card
        :name="name"
        :image="image"
        :difficulty="difficulty"
        :time="time"
        :id="id"
        :note="note"
      />
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
  data: () => ({
    name: 'Camelback Mountain',
    image:
      'https://hikingguy.com/wp-content/uploads/camelback-mountain-hike-trail-3-740x416.jpg',
    difficulty: 8,
    time: '2 hours',
    id: '3',
    note: 'It is easier going up than down!',
  }),
};
</script>

<style scoped>
</style>
