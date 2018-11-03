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
      <v-form v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules" 
          :disabled="isSubmitting"
          prepend-icon="mail" 
          name="email" 
          label="Email" 
          type="email"
          required
          @keyup.enter="loginUser"
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules" 
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
        :disabled="isSubmitting || !valid"
        color="primary" 
        @click="loginUser">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  layout: 'authenticate',
  data: () => ({
    valid: false,
    isSubmitting: false,
    error: false,
    errorMessage: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [v => !!v || 'Password is required'],
  }),
  methods: {
    ...mapActions('auth', ['login']),
    async loginUser() {
      if (this.valid) {
        try {
          // Set submitting to true, try to dispatch login
          this.isSubmitting = true;

          await this.login({
            email: this.email,
            password: this.password,
          });

          this.$router.push('/home');
        } catch (e) {
          this.errorMessage = e.message;
        }

        // Regardless of outcome, set submitting to false
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
