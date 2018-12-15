<template>
  <section class="image-container">
    <v-img
      :src="imageUrl"
      height="200px"
    />
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="image-loading"
    />
    <v-btn
      fab
      bottom
      right
      small
      color="primary"
      class="below-image"
      @click="onPickFile"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <input
      ref="image"
      accept="image/*"
      type="file"
      name="image"
      @change="onFilePicked"
    >
  </section>
</template>

<script>
/*
  This component was influenced by GitHub user nasirouwagana
  https://github.com/vuetifyjs/vuetify/issues/238

  As well as Wes Bos' Advanced React course
  https://github.com/wesbos/Advanced-React/
*/
export default {
  name: 'ImageUpload',
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    onPickFile() {
      this.$refs.image.click();
    },
    async onFilePicked(event) {
      this.loading = true;

      try {
        // Retrieve files from input field
        const files = event.target.files;

        // Create a FormData interface and add the values
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'hikinglog'); // set on cloudinary

        // Post image to API and await result
        const IMAGE_API =
          'https://api.cloudinary.com/v1_1/alexswan/image/upload';
        const result = await this.$axios.post(IMAGE_API, data);

        // Set loading to false
        this.loading = false;

        // Set image data to result
        if (result.data && result.data.secure_url) {
          this.$emit('update:imageUrl', result.data.secure_url);
        }
      } catch (e) {
        // TODO: create global alert vuex action and alert error here
        console.log(e);

        // Set loading to false
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
}

.below-image {
  position: absolute;
  top: 175px;
  right: 0;
}

.image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
}

input[type='file'] {
  position: absolute;
  left: -99999px;
}
</style>
