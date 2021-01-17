<template>
  <v-container class="mx-0 px-0">
    <v-card
        min-height="15vh"
        rounded="lg"
        elevation="0"
    >
      <v-card-title class="justify-space-between">
        Work Experience
      </v-card-title>

      <v-card-text>
        <v-row
            class="mx-1"
            v-for="(exp, idx) in experience"
            v-bind:key="`exp-${idx}`"
        >
          <v-col cols="11">
            <li class="text-h6">
              {{ exp.role }}
              <p class="text-body-1 ml-8">
                {{ exp.company }} | <span class="text-body-1" style="color: grey">Month Year - {{
                  exp.current ? 'Present' : 'Month Year'
                }}</span>
              </p>
              <p class="text-body-1 ml-8">
                {{ exp.description }}
              </p>
            </li>
            <v-divider></v-divider>
          </v-col>
          <v-col>
            <template>
              <v-dialog
                  v-model="editWorkModal"
                  width="30vw"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      small
                      icon
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="setEmployment(exp, idx)"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    Edit Employment Details
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                        v-model="editEmployment.company"
                        label="Company"
                        :rules="rules"
                        outlined
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="editEmployment.role"
                        label="Role"
                        outlined
                        required
                        :rules="rules"
                    ></v-text-field>
                    <v-textarea
                        v-model="editEmployment.description"
                        outlined
                        label="Description"
                    ></v-textarea>
                    <v-checkbox
                        v-model="editEmployment.current"
                        label="Currently Working Here"
                    ></v-checkbox>
                    <v-row>
                      <v-col cols="6">
                        <p class="text-body-1">Starting From</p>
                        <v-row>
                          <v-col>
                            <v-select
                                v-model="editEmployment.startMonth"
                                label="Month"
                                :items="months"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-select
                                v-model="editEmployment.startYear"
                                label="Year"
                                :items="years"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" v-if="!editEmployment.current">
                        <p class="text-body-1">Ending in</p>
                        <v-row>
                          <v-col>
                            <v-select
                                v-model="editEmployment.endMonth"
                                label="Month"
                                :items="months"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-select
                                v-model="editEmployment.endYear"
                                label="Year"
                                :items="years"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        class="text-capitalize"
                        style="color: white"
                        @click="deleteEmployment"
                    >
                      Delete
                    </v-btn>
                    <v-btn
                        color="green"
                        class="text-capitalize"
                        style="color: white"
                        @click="updateEmployment"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>
            </template>
          </v-col>
        </v-row>
      </v-card-text>

      <!--   Add new Employment Details   -->
      <v-card-actions class="justify-center">
        <template>
          <v-dialog
              v-model="addWorkModal"
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
                Add New
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Add Your Employment Details
              </v-card-title>
              <v-card-text>
                <v-text-field
                    v-model="newEmployment.company"
                    label="Company"
                    :rules="rules"
                    outlined
                    required
                ></v-text-field>
                <v-text-field
                    v-model="newEmployment.role"
                    label="Role"
                    outlined
                    required
                    :rules="rules"
                ></v-text-field>
                <v-textarea
                    v-model="newEmployment.description"
                    outlined
                    label="Description"
                ></v-textarea>
                <v-checkbox
                    v-model="newEmployment.current"
                    label="Currently Working Here"
                ></v-checkbox>
                <v-row>
                  <v-col cols="6">
                    <p class="text-body-1">Starting From</p>
                    <v-row>
                      <v-col>
                        <v-select
                            v-model="newEmployment.startMonth"
                            label="Month"
                            :items="months"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                            v-model="newEmployment.startYear"
                            label="Year"
                            :items="years"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6" v-if="!newEmployment.current">
                    <p class="text-body-1">Ending in</p>
                    <v-row>
                      <v-col>
                        <v-select
                            v-model="newEmployment.endMonth"
                            label="Month"
                            :items="months"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                            v-model="newEmployment.endYear"
                            label="Year"
                            :items="years"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    class="text-capitalize"
                    @click="addWorkModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="green"
                    class="text-capitalize"
                    style="color: white"
                    @click="addEmployment"
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
import {years, months} from "../utils";
import firebase from "../utils/firebase";

export default {
  name: "WorkExperience",
  props: {
    experience: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      picker: '',
      addWorkModal: false,
      editWorkModal: false,
      newEmployment: {
        company: '',
        role: '',
        description: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        current: false
      },
      editEmployment: {
        company: '',
        role: '',
        description: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        current: false
      },
      updateIndex: null,
      rules: [v => v.length > 0 || 'This field is required'],
      years: years,
      months: months
    }
  },
  methods: {
    addEmployment: function () {
      if (this.newEmployment.company !== '' && this.newEmployment.company.role !== '') {
        this.addWorkModal = false;
        this.experience.push(this.newEmployment);
        firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
          experience: this.experience
        })
            .then(() => {
              this.$emit('updateUser');
            })
            .catch(err => {
              console.log(err);
              alert('Error Adding Work Experience');
            });
      }
    },
    updateEmployment: function () {
      this.experience[this.updateIndex] = this.editEmployment;
      this.editWorkModal = false;
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
        experience: this.experience
      })
          .then(() => {
            this.$emit('updateUser');
          })
          .catch(err => {
            console.log(err);
            alert('Error Updating Work Experience');
          })
    },
    deleteEmployment: function () {
      this.experience.splice(this.updateIndex, 1);
      this.editWorkModal = false;
      firebase.usersCollection.doc(firebase.auth.currentUser.uid).update({
        experience: this.experience
      })
          .then(() => {
            this.$emit('updateUser');
          })
          .catch(err => {
            console.log(err);
            alert('Error Deleting Work Experience');
          })
    },
    setEmployment: function (employment, index) {
      this.editEmployment = employment;
      this.updateIndex = index;
    }
  }
}
</script>

<style scoped>
li, p {
  color: #2e2e2e;
}
</style>