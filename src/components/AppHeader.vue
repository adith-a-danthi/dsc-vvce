<template>
  <v-app-bar
      app
  >
    <v-container class="py-0 fill-height">

      <v-img
          alt="Developer Student Club"
          class="shrink"
          contain
          @click="$router.push('home')"
          src="@/assets/dsc.svg"
          height="50"
      />

      <v-spacer></v-spacer>

      <v-btn
          class="text-capitalize"
          v-for="link in links"
          :key="link"
          text
          :to="`/${link}`"
      >
        {{ link }}
      </v-btn>

      <v-menu
          v-if="$store.getters.isLoggedIn"
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
                color="#536DFE"
                size="32"
            >
              <v-img
                  v-if="profilePic"
                  :src="profilePic"
                  size="9rem"
              ></v-img>
              <v-icon size="24" color="white" v-else>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-3">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <!--                <h3 class="mx-5">{{ currentUser.name }}</h3>-->
              <!--                <p class="caption mt-1">-->
              <!--                  {{ currentUser.email }}-->
              <!--                </p>-->
              <v-btn
                  class="text-capitalize"
                  to="/dashboard"
                  depressed
                  rounded
                  text
              >
                Dashboard
              </v-btn>
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
      <v-btn
          v-else
          class="text-capitalize"
          color="primary"
          to="/login"
          text
      >
        Sign In
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "Header",
  mounted() {
    this.getProfilePic();
  },
  data: () => ({
    links: [
      'home',
      'about',
      'chapters',
      'events',
      'members'
    ],
    profilePic: false
  }),
  methods: {
    logout: function () {
      firebase.auth.signOut()
          .then(() => {
            this.$store.commit('SET_LOGGED_IN', false);
            this.$router.push({name: 'Login'});
          })
          .catch(err => {
            console.log(err);
          })
    },
    getProfilePic: function () {
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).get()
          .then(user => {
            let currentUser = user.data();
            this.profilePic = currentUser.profilePic;
          })
          .catch(err => {
            console.log(err);
          })
    }
  }
}
</script>

<style scoped>

</style>