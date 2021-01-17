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
                  <v-dialog
                      v-model="editProjectModal"
                      width="30vw"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          icon
                          elevation="0"
                          v-bind="attrs"
                          v-on="on"
                          @click="setProject(project, idx)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

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
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red"
                            class="text-capitalize"
                            style="color: white"
                            @click="deleteProject"
                        >
                          Delete
                        </v-btn>
                        <v-btn
                            color="green"
                            class="text-capitalize"
                            style="color: white"
                            @click="updateProject"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
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
                  color="primary"
                  class="text-capitalize"
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
              >
                Add Project
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
                    color="green"
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
              this.$emit('updateUser');
            })
            .catch(err => {
              console.log(err);
              alert('Error Adding Project');
            })
      }
    },
    updateProject: function () {
      this.userProjects[this.updateIndex] = this.editProject;
      this.editProjectModal = false;
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
        projects: this.userProjects
      })
          .then(() => {
            this.$emit('updateUser');
          })
          .catch(err => {
            console.log(err);
            alert('Error Updating Project');
          })
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
      this.editProject = project;
      this.updateIndex = index;
    }
  }
}
</script>

<style scoped>

</style>