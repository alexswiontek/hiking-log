<template>
  <v-layout
    :justify-center="$vuetify.breakpoint.smAndUp"
    class="white ma-0"
    fill-height 
    column
    align-center>
    <article 
      v-if="$vuetify.breakpoint.xs" 
      class="text-xs-center">
      <img src="~/assets/mountain.png" >
      <h1 class="display-1">Hiking Log</h1>                  
    </article>      
    <h2 class="my-3 headline">{{ headerText }}</h2>        
    <a 
      class="mt-2 mb-4"
      @click="toggle">{{ linkText }}</a>
    <register
      v-if="newUser"
    />
    <login
      v-else-if="!forgotPassword"
    >
      <a @click="forgotPassword = true">Forgot Password?</a>      
    </login>
    <forgot-password v-else>
      <a @click="forgotPassword = false">Remember your password?</a>      
    </forgot-password>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import Register from '~/components/Register';
import Login from '~/components/Login';
import ForgotPassword from '~/components/ForgotPassword';

export default {
  name: 'IndexContainer',
  layout: 'authenticate',
  components: {
    Register,
    Login,
    ForgotPassword,
  },
  data: () => ({
    newUser: true,
    forgotPassword: false,
  }),
  computed: {
    headerText() {
      return this.newUser ? 'Sign up today.' : 'Welcome Back.';
    },
    linkText() {
      return this.newUser
        ? 'Already have an account?'
        : 'Oops, nevermind. I need to sign up!';
    },
  },
  mounted() {
    this.setLoadingToFalse();
  },
  methods: {
    ...mapActions('auth', ['setLoadingToFalse']),
    toggle() {
      this.newUser = !this.newUser;
      this.forgotPassword = false;
    },
  },
};
</script>

<style scoped>
</style>
