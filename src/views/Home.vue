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
      <v-btn
          class="text-capitalize"
          v-for="link in links"
          :key="link"
          text
      >
        {{ link }}
      </v-btn>
      <v-btn
          class="text-capitalize"
          color="primary"
          to="/login"
          text
      >
        Sign In
      </v-btn>
    </v-app-bar>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    links: [
      'Home',
      'About',
      'Chapters',
      'Events',
    ]
  })
}
</script>
