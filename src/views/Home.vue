<template>
  <div class="home">
    <v-app-bar
        app
    >
      <v-img
          alt="Developer Student Club"
          class="shrink"
          contain
          src="@/assets/dsc.svg"
          height="50"
      />

      <v-spacer></v-spacer>
      <v-btn text>
        Home
      </v-btn>
      <v-btn text>
        About
      </v-btn>
      <v-btn text>
        Chapter
      </v-btn>
      <v-btn text>
        Events
      </v-btn>
      <v-btn
          outlined
          color="primary"
          to="/login"
      >
        Sign In
      </v-btn>
    </v-app-bar>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
