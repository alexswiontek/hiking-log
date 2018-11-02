<template>
  <v-footer
    fixed
    app
    dark
  >
    <span>&copy; Hiking Log {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
