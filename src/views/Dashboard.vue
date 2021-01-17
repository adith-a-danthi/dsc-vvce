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
        <v-col cols="4" md="2">
          <v-sheet
              class="mb-2"
              rounded="lg"
          >
            <v-col class="align-center text-center">

              <v-avatar color="grey">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>

              <h3 id="name" class="text-capitalize mt-2">{{ currentUser.name }}</h3>
              <p id="email" class="text-sm-subtitle-2">{{ currentUser.email }}</p>

              <v-row class="my-1 justify-center">
                <v-btn
                    color="black"
                    icon
                    elevation="0"
                    target="_blank"
                >
                  <v-icon>mdi-github</v-icon>
                </v-btn>
                <v-btn
                    color="primary"
                    icon
                    elevation="0"
                    target="_blank"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
                <v-btn
                    color="grey darken-2"
                    icon
                    elevation="0"
                    target="_blank"
                >
                  <v-icon>mdi-web</v-icon>
                </v-btn>
              </v-row>

            </v-col>
          </v-sheet>
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item link>
                <v-list-item-title>
                  Profile
                </v-list-item-title>
              </v-list-item>
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
          <skills
              :skills="currentUser.skills"
              @updateSkills="getCurrentUserDetails"
          ></skills>
          <projects
              :user-projects="currentUser.projects"
              @updateSkills="getCurrentUserDetails"
          ></projects>
          <work-experience
              :experience="currentUser.experience"
              @updateSkills="getCurrentUserDetails"
          ></work-experience>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import firebase from "../utils/firebase";
import skills from "../components/Skills"
import Projects from "../components/Projects";
import WorkExperience from "../components/WorkExperience";

export default {
  name: "Dashboard",
  components: {
    WorkExperience,
    Projects,
    skills
  },
  mounted() {
    this.getCurrentUserDetails();
  },
  data() {
    return {
      currentUser: {
        skills: [],
        projects: [],
        experience: [],
        github: '',
        linkedin: '',
        website: '',
        bio: '',
      },
      displayComponent: 'Profile',
      links: [
        'Home',
        'About',
        'Chapters',
        'Events',
      ]
    }
  },
  methods: {
    logout: function () {
      firebase.auth.signOut()
          .then(() => {
            this.$router.push({name: 'Login'});
          })
          .catch(err => {
            console.log(err);
          })
    },
    getCurrentUserDetails: function () {
      // let temp = {};
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).get()
          .then(user => {
            this.currentUser = user.data();
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>