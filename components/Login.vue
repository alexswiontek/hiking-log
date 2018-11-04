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
          :disabled="authLoading"
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
          :disabled="authLoading"
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
        :loading="authLoading"
        :disabled="authLoading || !isValid"
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
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['authError', 'authLoading', 'authSuccess']),
    isValid() {
      return !!this.email && !!this.password && this.errors.count() === 0;
    },
  },
  watch: {
    authError(error) {
      if (error) this.alert = true;
    },
    authSuccess(success) {
      if (success) this.$router.push('/home');
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    loginUser() {
      if (this.isValid) {
        this.login({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
