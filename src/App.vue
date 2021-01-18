<template>
  <v-app>
    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

import AppFooter from "./components/AppFooter";
export default {
  name: 'App',

  components: {
    AppFooter

  },

  data: () => ({
    //
  }),
};
</script>
<style>
 * {
   font-family: 'Google Sans', sans-serif;
 }
</style>
