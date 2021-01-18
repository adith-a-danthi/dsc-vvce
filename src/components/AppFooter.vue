<template>
  <v-footer>
    <v-col class="mx-2 px-10 py-2">
      <v-divider class="my-2"></v-divider>
      <v-row class="justify-space-between mt-2 ">
        <span class="text-caption mb-0 mt-2">© 2021 DSC-VVCE, Edu. All rights reserved.</span>
        <span>
          <v-btn
              color="#536DFE"
              icon
              href="https://bit.ly/37mnxDo"
          >
          <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn
              color="#536DFE"
              icon
              href="https://github.com/Developer-Student-Club-VVCE"
          >
          <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn
              color="#536DFE"
              icon
              href="https://www.linkedin.com/"
          >
          <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </span>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
  data: () => ({
    links: [
      'home',
      'about',
      'chapters',
      'events',
      'members'
    ]
  }),
}
</script>

<style scoped>

</style>