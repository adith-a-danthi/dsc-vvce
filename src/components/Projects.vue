<template>
  <v-container class="mx-0 px-0">
    <v-card
        min-height="15vh"
        rounded="lg"
        elevation="0"
    >
      <v-card-title class="justify-space-between">
        Projects
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
              cols="6" md="3"
              class="text-center"
              v-for="(project,idx) in userProjects"
              v-bind:key="`project-${idx}`"
          >
            <v-card
                elevation="0"
                outlined
            >
              <v-card-title class="justify-space-between">
                {{ project.title }}
                <template>
                  <v-btn
                      icon
                      small
                      elevation="0"
                      @click="setProject(project, idx)"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-card-title>
              <v-card-text>
                <p class="text-left text-body-1">
                  {{ project.description }}
                </p>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                    v-if="project.link.length > 0"
                    color="grey darken-2"
                    icon
                    elevation="0"
                    target="_blank"
                    :href="project.link"
                >
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-dialog
              id="editProjectDialog"
              v-model="editProjectModal"
              persistent
              width="30vw"
          >
            <v-card>
              <v-card-title>
                Edit Project
              </v-card-title>
              <v-card-text>
                <v-text-field
                    v-model="editProject.title"
                    label="Title"
                    :rules="rules"
                    outlined
                    required
                ></v-text-field>
                <v-textarea
                    v-model="editProject.description"
                    outlined
                    label="Description"
                    required
                    :rules="rules"
                ></v-textarea>
                <v-text-field
                    v-model="editProject.link"
                    label="Project Link"
                    outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn
                    text
                    elevation="0"
                    color="red accent-2"
                    class="text-capitalize"
                    style="color: white"
                    @click="deleteProject"
                >
                  Delete
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="#536DFE"
                    class="text-capitalize"
                    @click="editProjectModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    elevation="0"
                    color="#536DFE"
                    class="text-capitalize"
                    style="color: white"
                    @click="updateProject"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <template>
          <v-dialog
              v-model="addProjectModal"
              width="30vw"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  text
                  color="#536DFE"
                  class="text-capitalize"
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
              >
                + Add New
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Add Project
              </v-card-title>
              <v-card-text>
                <v-text-field
                    v-model="newProject.title"
                    label="Title"
                    :rules="rules"
                    outlined
                    required
                ></v-text-field>
                <v-textarea
                    v-model="newProject.description"
                    outlined
                    label="Description"
                    required
                    :rules="rules"
                ></v-textarea>
                <v-text-field
                    v-model="newProject.link"
                    label="Project Link"
                    outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="#536DFE"
                    class="text-capitalize"
                    @click="addProjectModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="#536DFE"
                    elevation="0"
                    class="text-capitalize"
                    style="color: white"
                    @click="addProject"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "Projects",
  props: {
    userProjects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      addProjectModal: false,
      editProjectModal: false,
      newProject: {
        title: '',
        description: '',
        link: ''
      },
      editProject: {
        title: '',
        description: '',
        link: ''
      },
      updateIndex: null,
      rules: [v => v.length > 0 || 'This field is required']
    }
  },
  methods: {
    addProject: function () {
      if (this.newProject.title.length > 0 && this.newProject.description.length > 0) {
        this.addProjectModal = false;
        this.userProjects.push(this.newProject);
        firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
          projects: this.userProjects
        })
            .then(() => {
              this.newProject = {
                title: '',
                description: '',
                link: ''
              }
              this.$emit('updateUser');
            })
            .catch(err => {
              console.log(err);
              alert('Error Adding Project');
            })
      } else {
        alert('Title and Description Cannot be Empty');
      }
    },
    updateProject: function () {
      if (this.editProject.title.length > 0 && this.editProject.description.length > 0) {
        this.userProjects[this.updateIndex] = this.editProject;
        this.editProjectModal = false;
        firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
          projects: this.userProjects
        })
            .then(() => {
              this.editProject = {
                title: '',
                description: '',
                link: ''
              }
              this.$emit('updateUser');
            })
            .catch(err => {
              console.log(err);
              alert('Error Updating Project');
            })
      } else {
        alert('Title and Description Cannot be Empty');
      }

    },
    deleteProject: function () {
      this.userProjects.splice(this.updateIndex, 1);
      this.editProjectModal = false;
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
        projects: this.userProjects
      })
          .then(() => {
            this.$emit('updateUser');
          })
          .catch(err => {
            console.log(err);
            alert('Error Deleting Project');
          })
    },
    setProject: function (project, index) {
      this.editProjectModal = true;
      this.editProject.title = project.title;
      this.editProject.description = project.description;
      this.editProject.link = project.link;
      this.updateIndex = index;
    }
  }
}
</script>

<style scoped>

</style>