<template>
  <v-container class="mx-0 px-0">
    <v-card
        min-height="15vh"
        rounded="lg"
        elevation="0"
    >
      <v-card-title class="justify-space-between">
        Skills

        <template>
          <v-dialog
              v-model="edit"
              width="50vw"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Skills
              </v-card-title>
              <v-card-text>
                <v-row class="mx-5">
                  <v-text-field
                      single-line
                      class="mr-5"
                      v-model="addSkill"
                  ></v-text-field>
                  <v-btn
                      color="primary"
                      class="mt-1 mb-0 pb-0 text-capitalize"
                      @click="addNewSkill"
                  >
                    Add
                  </v-btn>
                </v-row>
                <v-container
                    v-if="newSkills.length > 0"
                    class="ma-2"
                >
                  <h3>New Skills</h3>
                  <br>
                  <v-row>
                    <v-chip
                        class="mx-1 text-capitalize"
                        v-for="(skill,idx) in newSkills"
                        v-bind:key="skill"
                        close
                        @click:close="removeSkill('new', idx)"
                    >
                      {{ skill }}
                    </v-chip>
                  </v-row>
                </v-container>
                <v-container
                    v-if="skills.length > 0"
                    class="ma-2"
                >
                  <h3>Skills</h3>
                  <br>
                  <v-row>
                    <v-chip
                        class="mx-1 text-uppercase"
                        v-for="(skill,idx) in skills"
                        v-bind:key="skill"
                        close
                        @click:close="removeSkill('old', idx)"
                    >
                      {{ skill }}
                    </v-chip>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                    color="green"
                    class="text-uppercase"
                    style="color: white"
                    @click="saveSkills"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </template>
      </v-card-title>
      <v-card-text>
        <v-row class="mx-1">
          <v-chip
              class="mx-1 text-uppercase"
              v-for="skill in skills"
              v-bind:key="skill"
          >
            {{ skill }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import firebase from "../utils/firebase";

export default {
  name: "Skills",
  props: {
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      edit: false,
      newSkills: [],
      addSkill: '',
    }
  },
  methods: {
    addNewSkill: function () {
      if (!this.newSkills.includes(this.addSkill.toLowerCase()) && !this.skills.includes(this.addSkill.toLowerCase()) && this.addSkill.length > 0)
        this.newSkills.push(this.addSkill.toLowerCase());
      this.addSkill = '';
    },
    removeSkill: function (type, index) {
      if (type === 'old') {
        this.skills.splice(index, 1);
      } else {
        this.newSkills.splice(index, 1);
      }
    },
    saveSkills: function () {
      this.skills.push(...this.newSkills);
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
        skills: this.skills
      })
          .then(() => {
            this.edit = false;
          })
          .catch(err => {
            console.log(err);
            alert('Error Updating Skills');
          });
      this.$emit('updateSkills');
    }
  }
}
</script>

<style scoped>

</style>