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
              >
                <v-icon size="24" color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="pa-3">
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <h3 class="mx-5">{{ currentUser.name }}</h3>
                <p class="caption mt-1">
                  {{ currentUser.email }}
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
                <v-icon large dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>

              <h3 id="name" class="text-capitalize mt-2">{{ currentUser.name }}</h3>
              <p id="email" class="text-sm-subtitle-2 mb-0">{{ currentUser.email }}</p>
              <p class="text-sm-subtitle-2 mb-1">{{ currentUser.tagline }}</p>
              <v-row class="my-1 justify-center">
                <v-btn
                    v-if="currentUser.github !== ''"
                    color="black"
                    icon
                    elevation="0"
                    target="_blank"
                    :href="currentUser.github"
                >
                  <v-icon>mdi-github</v-icon>
                </v-btn>
                <v-btn
                    v-if="currentUser.linkedin !== ''"
                    color="primary"
                    icon
                    elevation="0"
                    target="_blank"
                    :href="currentUser.linkedin"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
                <v-btn
                    v-if="currentUser.website !== ''"
                    color="grey darken-2"
                    icon
                    elevation="0"
                    target="_blank"
                    :href="currentUser.website"
                >
                  <v-icon>mdi-web</v-icon>
                </v-btn>
              </v-row>
              <v-divider class="mb-2"></v-divider>

              <p
                  class="text-subtitle-2 text-left pb-0 mb-0"
                  style="color: grey"
              >
                Bio:
              </p>
              <p class="text-lg-subtitle-2 text-left">
                {{ currentUser.bio }}
              </p>

              <v-divider class="mb-2"></v-divider>

              <v-dialog
                  v-model="editIntroModal"
                  width="30vw"
              >
                <template v-slot:activator="{on,attr}">
                  <v-btn
                      class="text-capitalize"
                      color="primary"
                      small
                      text
                      v-on="on"
                      v-bind="attr"
                      @click="setEditUser"
                  >
                    <v-icon left small>
                      mdi-pencil
                    </v-icon>
                    Edit
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    Edit Intro
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                        v-model="editUser.name"
                        label="Name"
                        :rules="rules"
                        outlined
                        required
                        dense
                    ></v-text-field>
                    <v-text-field
                        v-model="editUser.tagline"
                        label="Tagline"
                        outlined
                        dense
                    ></v-text-field>
                    <v-text-field
                        v-model="editUser.website"
                        label="Website"
                        outlined
                        dense
                    ></v-text-field>
                    <v-text-field
                        v-model="editUser.github"
                        label="GitHub URL"
                        outlined
                        dense
                    ></v-text-field>
                    <v-text-field
                        v-model="editUser.linkedin"
                        label="LinkedIn URL"
                        outlined
                        dense
                    ></v-text-field>
                    <v-textarea
                        v-model="editUser.bio"
                        label="Bio"
                        outlined
                        dense
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        class="text-capitalize"
                        elevation="0"
                        @click="editIntroModal = false"
                        text
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="green"
                        class="text-capitalize"
                        style="color: white"
                        elevation="0"
                        @click="updateUserDetails"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>


            </v-col>
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
        name: '',
        email: '',
        skills: [],
        projects: [],
        experience: [],
        github: '',
        linkedin: '',
        website: '',
        bio: '',
        tagline: '',
      },
      editUser: {
        name: '',
        github: '',
        linkedin: '',
        website: '',
        bio: '',
        tagline: '',
      },
      displayComponent: 'Profile',
      links: [
        'Home',
        'About',
        'Chapters',
        'Events',
      ],
      editIntroModal: false,
      rules: [v => v.length > 0 || 'This field is required']
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
    },
    setEditUser: function () {
      this.editUser = {
        name: this.currentUser.name,
        github: this.currentUser.github,
        linkedin: this.currentUser.linkedin,
        website: this.currentUser.website,
        bio: this.currentUser.bio,
        tagline: this.currentUser.tagline,
      }
    },
    updateUserDetails: function () {
      if (this.editUser.name.length > 0) {
        this.editIntroModal = false;
        firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
          name: this.editUser.name,
          github: this.editUser.github,
          linkedin: this.editUser.linkedin,
          website: this.editUser.website,
          bio: this.editUser.bio,
          tagline: this.editUser.tagline,
        })
            .then(() => {
              this.getCurrentUserDetails();
            })
            .catch(err => {
              console.log(err);
              alert('Error Updating Data');
            })
      }
    }
  }
}
</script>

<style scoped>

</style>