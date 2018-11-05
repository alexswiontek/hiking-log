<template>
  <v-card
    width="95%"
    max-width="400px"
  >
    <v-toolbar 
      dark 
      color="primary">
      <v-toolbar-title>Reset Password</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-card-text>
      <v-alert 
        v-model="alert" 
        dismissible 
        type="error">{{ resetError }}</v-alert>
      <v-form>
        <v-text-field
          v-validate="'required|min:8'"
          ref="password"
          v-model="password"
          :error-messages="errors.collect('password')"
          :disabled="resetLoading"
          prepend-icon="lock" 
          data-vv-name="password"
          data-vv-delay="100"
          name="password" 
          label="Password" 
          type="password"
          required
          @keyup.enter="resetUser"
        />
        <v-text-field
          v-validate="'required|confirmed:password'"
          v-model="confirmPassword"
          :error-messages="errors.collect('confirm password')"
          :disabled="resetLoading"
          prepend-icon="lock" 
          data-vv-name="confirm password"
          data-vv-delay="100"
          name="confirm password" 
          label="Confirm Password" 
          type="password"
          required
          @keyup.enter="resetUser"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn 
        :loading="resetLoading"
        :disabled="resetLoading || !isValid"      
        color="primary"
        @click="resetUser">Sign Up</v-btn>
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
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['resetError', 'resetLoading', 'resetSuccess']),
    isValid() {
      return (
        !!this.password && !!this.confirmPassword && this.errors.count() === 0
      );
    },
  },
  watch: {
    resetError(error) {
      if (error) this.alert = true;
    },
    resetSuccess(success) {
      if (success) this.$router.push('/home');
    },
  },
  methods: {
    ...mapActions('auth', ['reset']),
    resetUser() {
      if (this.isValid) {
        this.reset({
          password: this.password,
          confirmPassword: this.confirmPassword,
          token: this.$route.params.id,
        });
      }
    },
  },
};
</script>
