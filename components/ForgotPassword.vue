<template>
  <v-card 
    width="95%"
    max-width="400px">
    <v-toolbar 
      dark 
      color="primary">
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
        v-if="authError"
        v-model="alertError"
        type="error"
        dismissible
      >
        There was an error when trying to resend the password. Are you sure you used the right email? 😅
      </v-alert>      
      <v-form @submit.prevent>
        <v-text-field
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
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
      <slot/>
      <v-spacer/>
      <v-btn 
        :loading="isSubmitting"
        :disabled="isSubmitting || !isValid"
        color="primary" 
        @click="forgotPassword">Reset Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  layout: 'authenticate',
  data: () => ({
    alertSuccess: false,
    alertError: false,
    isSubmitting: false,
    email: '',
  }),
  computed: {
    ...mapGetters('auth', ['authError']),
    isValid() {
      return !!this.email && this.errors.count() === 0;
    },
  },
  methods: {
    forgotPassword() {
      if (this.isValid) {
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
