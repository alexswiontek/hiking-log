<template>
  <card-list 
    v-if="loading || cards.length > 0"
    :loading="loading"
    :cards="cards"/>
  <v-layout
    v-else
    class="pa-4 centered" 
    column>
    <v-flex>
      <p class="headline">Hmm, seems like there are no hikes here yet.</p>
    </v-flex>
    <v-flex>
      <p class="subheading">Care to add one? <nuxt-link to="/add-hike">Add a new hike</nuxt-link></p>
    </v-flex>
  </v-layout>
</template>

<script>
import CardList from '~/components/CardList';

export default {
  components: {
    CardList,
  },
  data: () => ({
    loading: false,
    cards: [],
    // cards: [
    //   {
    //     name: "Fat Man's Pass",
    //     image:
    //       'https://photobyjohnbo.files.wordpress.com/2013/03/7-fatmanpass21.jpg',
    //     difficulty: 6,
    //     time: '2 hours',
    //     id: '1',
    //     note: 'Wear sweatpants to protect your knees',
    //   },
    //   {
    //     name: 'Picacho Peak',
    //     image:
    //       'https://myfavoritewesterns.files.wordpress.com/2015/04/picacho-peak-arizona.jpg',
    //     difficulty: 9,
    //     time: '4 hours',
    //     id: '2',
    //     note:
    //       'This is a long difficult hike. Bring lots of water and prepare for a challenge.',
    //   },
    //   {
    //     name: 'Camelback Mountain',
    //     image:
    //       'https://hikingguy.com/wp-content/uploads/camelback-mountain-hike-trail-3-740x416.jpg',
    //     difficulty: 8,
    //     time: '2 hours',
    //     id: '3',
    //     note: 'It is easier going up than down!',
    //   },
    //   {
    //     name: 'Thunderbird',
    //     image:
    //       'http://4.bp.blogspot.com/-mjES7XGdqKU/Ut3HgkAFEVI/AAAAAAAAGpQ/L3kx9jfP-7g/s1600/ArrowheadPointFlag5.JPG',
    //     difficulty: 4,
    //     time: '1.25 hours',
    //     id: '4',
    //     note: 'Shorts are fine, a fairly easy hike!',
    //   },
    //   {
    //     name: "Can't Remember",
    //     id: '5',
    //     note:
    //       'Since I cannot remember this hike I am going to list it out...this was a fairly long hike. In fact, it probably never even happened seeing as I cannot hike longer than 4 hours!',
    //   },
    // ],
  }),
};
</script>

<style scoped>
.centered {
  max-width: 550px;
  margin: 0 auto !important;
}
</style>
