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
          @keyup.enter="registerUser"
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
          @keyup.enter="registerUser"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn 
        :loading="isSubmitting"
        :disabled="isSubmitting || !valid"      
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
    valid: false,
    isSubmitting: false,
    error: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [v => !!v || 'Password is required'],
  }),
  computed: {
    ...mapGetters('auth', ['authError']),
  },
  watch: {
    authError(error) {
      if (error) this.alert = true;
    },
  },
  methods: {
    ...mapActions('auth', ['register']),
    async registerUser() {
      if (this.valid) {
        try {
          // Set submitting to true, try to dispatch login
          this.isSubmitting = true;

          await this.register({
            email: this.email,
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
