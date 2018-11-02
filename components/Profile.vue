<template>
  <v-card class="elevation-12">
    <v-toolbar 
      color="primary lighten-1" 
      dark>
      <v-toolbar-title>Profile</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert 
        v-model="success" 
        dismissible 
        type="success">You have successfully updated your profile.</v-alert>
      <v-form v-model="valid">
        <v-text-field
          v-model="emailUpdate"
          :rules="emailRules" 
          :disabled="isSubmitting"
          prepend-icon="mail" 
          name="email" 
          label="Email" 
          type="email"
          required
          @keyup.enter="save"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        :disabled="isSubmitting"
        flat
        color="primary" 
        @click="cancel">Cancel</v-btn>
      <v-btn
        :loading="isSubmitting"
        :disabled="isSubmitting || !valid"
        color="primary" 
        @click="save">Save</v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    confirmPassword: '',
    emailUpdate: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    isSubmitting: false,
    success: false,
    valid: false,
  }),
  mounted() {
    if (this.email) this.emailUpdate = this.email;
  },
  methods: {
    cancel() {
      this.$router.push('/');
    },
    save() {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.success = true;
      }, 2000);
    },
  },
};
</script>
