<template>
  <v-card
    width="95%"
    max-width="400px"
  >
    <v-toolbar 
      dark 
      color="primary">
      <v-toolbar-title>Create an Account</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-card-text>
      <v-alert 
        v-model="alert" 
        dismissible 
        type="error">{{ authError }}</v-alert>
      <v-form>
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
          @keyup.enter="registerUser"
        />
        <v-text-field
          v-validate="'required|min:8'"
          ref="password"
          v-model="password"
          :error-messages="errors.collect('password')"
          :disabled="isSubmitting"
          prepend-icon="lock" 
          data-vv-name="password"
          data-vv-delay="100"
          name="password" 
          label="Password" 
          type="password"
          required
          @keyup.enter="registerUser"
        />
        <v-text-field
          v-validate="'required|confirmed:password'"
          v-model="confirmPassword"
          :error-messages="errors.collect('confirm password')"
          :disabled="isSubmitting"
          prepend-icon="lock" 
          data-vv-name="confirm password"
          data-vv-delay="100"
          name="confirm password" 
          label="Confirm Password" 
          type="password"
          required
          @keyup.enter="registerUser"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn 
        :loading="isSubmitting"
        :disabled="isSubmitting || !isValid"      
        color="primary"
        @click="registerUser">Sign Up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  layout: 'authenticate',
  data: () => ({
    alert: false,
    isSubmitting: false,
    error: false,
    confirmPassword: '',
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['authError']),
    isValid() {
      return (
        !!this.email &&
        !!this.password &&
        !!this.confirmPassword &&
        this.errors.count() === 0
      );
    },
  },
  watch: {
    authError(error) {
      if (error) this.alert = true;
    },
  },
  methods: {
    ...mapActions('auth', ['register']),
    async registerUser() {
      if (this.isValid) {
        try {
          // Set submitting to true, try to dispatch login
          this.isSubmitting = true;

          await this.register({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });

          this.$router.push('/home');
        } catch (e) {
          this.isSubmitting = false;
        }
      }
    },
  },
};
</script>
