<template>
  <v-card 
    width="95%"
    max-width="400px">
    <v-toolbar 
      class="primary" 
      dark>
      <v-toolbar-title>Log In</v-toolbar-title>
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
          @keyup.enter="loginUser"
        />
        <v-text-field
          v-validate="'required|min:8'"
          v-model="password"
          :error-messages="errors.collect('password')"
          :disabled="isSubmitting"
          prepend-icon="lock" 
          name="password" 
          label="Password" 
          type="password"
          required
          @keyup.enter="loginUser"
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
        @click="loginUser">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  layout: 'authenticate',
  data: () => ({
    alert: false,
    isSubmitting: false,
    error: false,
    errorMessage: '',
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['authError']),
    isValid() {
      return !!this.email && !!this.password && this.errors.count() === 0;
    },
  },
  watch: {
    authError(error) {
      if (error) this.alert = true;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    async loginUser() {
      if (this.isValid) {
        try {
          // Set submitting to true, try to dispatch login
          this.isSubmitting = true;

          await this.login({
            email: this.email,
            password: this.password,
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

<style scoped>
</style>
