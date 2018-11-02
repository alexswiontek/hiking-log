<template>
  <v-card class="elevation-12">
    <v-toolbar 
      dark 
      color="primary">
      <img src="~/assets/mountain.png" >
      <v-toolbar-title>Hiking Log</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title>Forgot Password</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert
        v-model="alertSuccess"
        type="success"
        dismissible
      >
        Nice job! An email has been sent your way with your new password.
      </v-alert>      
      <v-alert
        v-model="alertError"
        type="error"
        dismissible
      >
        There was an error when trying to resend the password. Are you sure you used the right email? 😅
      </v-alert>      
      <v-form 
        v-model="valid" 
        @submit.prevent>
        <v-text-field
          v-model="email"
          :rules="emailRules" 
          :disabled="isSubmitting"
          prepend-icon="mail" 
          name="email" 
          label="Email" 
          type="email"
          required
          @keyup.enter="forgotPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <nuxt-link to="/login">Already have an account?</nuxt-link>
      <v-spacer/>
      <v-btn 
        :loading="isSubmitting"
        :disabled="isSubmitting || !valid"
        color="primary" 
        @click="forgotPassword">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  layout: 'authenticate',
  data: () => ({
    alertSuccess: false,
    alertError: false,
    valid: false,
    isSubmitting: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    forgotPassword() {
      if (this.valid) {
        // TODO: build authentication layer

        // Simulate async call
        this.isSubmitting = true;

        setTimeout(() => {
          this.isSubmitting = false;
          this.alertSuccess = true;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
</style>
