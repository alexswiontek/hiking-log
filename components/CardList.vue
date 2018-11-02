<template>
  <v-layout 
    row 
    wrap>
    <no-ssr placeholder="Loading...">
      <v-flex
        v-for="card in cards"
        :key="card.title"
        xs12
        sm6
        md4
      >
        <Card
          :name="card.name"
          :image="card.image"
          :difficulty="card.difficulty"
          :note="card.note"
          :id="card.id"
        />
      </v-flex>
    </no-ssr>    
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

<style scoped>
</style>
