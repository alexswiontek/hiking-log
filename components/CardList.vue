<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="card in cards"
      :key="card.title"
      xs12
      sm6
      md4
      class="mb-4"
    >
      <Card
        :name="card.name"
        :image="card.image"
        :difficulty="card.difficulty"
        :note="card.note"
        :time="card.time"
        :id="card._id"
        class="mx-1"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Card from '~/components/Card';

export default {
  name: 'CardList',
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
