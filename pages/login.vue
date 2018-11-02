<template>
  <v-card class="elevation-12">
    <v-toolbar 
      dark 
      color="primary">
      <img src="~/assets/mountain.png" >
      <v-toolbar-title>Hiking Log</v-toolbar-title>
      <v-spacer/>
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
          @keyup.enter="login"
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
          @keyup.enter="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
      <v-spacer/>
      <v-btn
        :loading="isSubmitting"
        :disabled="isSubmitting || !valid"
        color="primary" 
        @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    async login() {
      if (this.valid) {
        try {
          // Set submitting to true, try to dispatch login
          this.isSubmitting = true;

          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });

          this.$router.push('/');
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
