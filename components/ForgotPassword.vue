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
        {{ forgotSuccess }}
      </v-alert>      
      <v-alert
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
          :disabled="forgotLoading"
          prepend-icon="mail" 
          name="email" 
          label="Email" 
          type="email"
          required
          @keyup.enter="forgot"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <slot/>
      <v-spacer/>
      <v-btn 
        :loading="forgotLoading"
        :disabled="forgotLoading || !isValid"
        color="primary" 
        @click="forgot">Reset Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  layout: 'authenticate',
  data: () => ({
    alertSuccess: false,
    alertError: false,
    email: '',
  }),
  computed: {
    ...mapGetters('auth', ['forgotError', 'forgotSuccess', 'forgotLoading']),
    isValid() {
      return !!this.email && this.errors.count() === 0;
    },
  },
  watch: {
    forgotLoading(loading) {
      if (loading) {
        this.alertError = false;
        this.alertSuccess = false;
      }
    },
    forgotError(error) {
      if (error) this.alertError = true;
    },
    forgotSuccess(success) {
      if (success) this.alertSuccess = true;
    },
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    forgot() {
      if (this.isValid) {
        this.forgotPassword(this.email);
      }
    },
  },
};
</script>

<style scoped>
</style>
