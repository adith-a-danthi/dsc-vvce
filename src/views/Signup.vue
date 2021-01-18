<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-col cols="6" md="3" class="mx-auto">
      <v-card
          class="align-center mx-auto pa-10"
          min-width="200px"
      >
        <v-card-title>
          <v-img
              alt="Developer Student Club"
              class="mx-auto"
              contain
              src="@/assets/dsc.svg"
          />
        </v-card-title>
        <v-card-text>
          <h2 class="mt-5 mb-10 font-weight-medium text-center" style="color: #2e2e2e">Sign Up</h2>
          <v-text-field
              v-model="form.name"
              type="name"
              label="Full Name"
              :rules="rules.email"
              required
              outlined
          ></v-text-field>

          <v-text-field
              v-model="form.email"
              type="email"
              label="Email ID"
              :rules="rules.email"
              required
              outlined
          ></v-text-field>

          <v-text-field
              v-model="form.password"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              hint="At least 8 characters"
              :rules="[rules.required, rules.min]"
              counter
              required
              outlined
          ></v-text-field>
          <v-text-field
              v-model="form.confirmPassword"
              :type="showConfirmPass ? 'text' : 'password'"
              label="Confirm Password"
              :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPass = !showConfirmPass"
              hint="At least 8 characters"
              :rules="[rules.required, rules.min, rules.match]"
              counter
              required
              outlined
          ></v-text-field>

          <v-row class="mt-3">
            <v-btn
                class="mx-auto text-capitalize"
                color="primary"
                elevation="0"
                @click="signup"
            >
              Sign Up
            </v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions>
        <span class="mx-auto">
          Already have an account?
          <v-btn
              class="mx-auto px-0 text-capitalize"
              color="primary"
              elevation="0"
              text
              to="login"
          >
          Login
          </v-btn></span>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "Signup",

  data() {
    const defaultForm = Object.freeze({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    return {
      form: Object.assign({}, defaultForm),
      showPass: false,
      showConfirmPass: false,
      rules: {
        email: [v => v.length > 0 || 'This field is required'],
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        match: v => v === this.form.password || "Passwords don't match"
      }
    }
  },

  methods: {
    signup: function () {
      if (this.form.password === this.form.confirmPassword && this.form.password.length > 0) {
        firebase.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then((response) => {
              response.user.updateProfile({
                displayName: this.form.name
              });
              firebase.usersCollection.doc(response.user.uid).set({
                name: this.form.name,
                email: this.form.email,
                userId: firebase.auth.currentUser.uid,
                admin: false,
                role: 'member',
                skills: [],
                projects: [],
                experience: [],
                github: '',
                linkedin: '',
                website: '',
                bio: '',
                tagline: '',
                profilePic: ''
              })
                  .then(() => {
                    this.$store.commit('SET_LOGGED_IN', true);
                    this.$router.push({name: 'Dashboard'});
                  })
                  .catch(err => {
                    console.log(err);

                    firebase.auth.currentUser.delete()
                        .catch(err => {
                          console.log(err);
                        });

                    alert('Oops! ' + err.message);
                  })
            })
            .catch(err => {
              console.log(err);
              alert('Oops! ' + err.message);
            })
      }
    }
  }
}
</script>

<style scoped>

</style>