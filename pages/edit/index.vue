<template>
  <div>
    <nuxt-child />
    <p>Hmm, seems like there wasn't a hike selected to edit. <nuxt-link to="/">View all the hikes?</nuxt-link></p>
  </div>
</template>

<script>
export default {
  name: 'EditParent',
};
</script>
