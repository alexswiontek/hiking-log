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
          :disabled="authLoading"
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
          :disabled="authLoading"
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
          :disabled="authLoading"
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
        :loading="authLoading"
        :disabled="authLoading || !isValid"      
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
    confirmPassword: '',
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['authError', 'authLoading', 'authSuccess']),
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
    authLoading(loading) {
      if (loading) this.alert = false;
    },
    authError(error) {
      if (error) this.alert = true;
    },
    authSuccess(success) {
      if (success) this.$router.push('/home');
    },
  },
  methods: {
    ...mapActions('auth', ['register']),
    registerUser() {
      if (this.isValid) {
        this.register({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
      }
    },
  },
};
</script>
