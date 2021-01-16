<template>
  <v-container
      color="white"
      fluid
  >
    <v-app-bar
        app
    >
      <v-container class="py-0 fill-height">

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

        <v-menu
            bottom
            rounded="lg"
            offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
                icon
                x-large
                v-on="on"
            >
              <v-avatar
                  class="mx-5"
                  color="grey darken-1"
                  size="32"
              ></v-avatar>
            </v-btn>
          </template>
          <v-card class="pa-3">
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <h3 class="mx-5">Full Name</h3>
                <p class="caption mt-1">
                  email-id
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    class="text-capitalize"
                    @click="logout"
                    depressed
                    rounded
                    text
                >
                  Logout
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col cols="3" md="2">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
              >
                <v-list-item-content>
                  <v-list-item-title>
                    List Item {{ n }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item
                  link
                  color="grey lighten-4"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Refresh
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
              min-height="70vh"
              rounded="lg"
          >
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    links: [
      'Home',
      'About',
      'Chapters',
      'Events',
    ]
  }),
  methods: {
    logout: function () {
      alert('Logout')
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style scoped>

</style>