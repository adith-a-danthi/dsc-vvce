<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-card
        class="align-center mx-auto pa-10"
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
        <h2 class="mt-5 mb-10 font-weight-medium text-center" style="color: #2e2e2e">Login</h2>
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
        <v-row class="mt-3">
          <v-col class="mt-0 pt-0">
            <v-btn
                class="text-capitalize"
                text
            >
              Forgot Password?
            </v-btn>
          </v-col>
          <v-col class="text-right mt-0 pt-0">
            <v-btn
                class="text-capitalize"
                color="primary"
                text
                to="register"
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
            class="mx-auto pa-5 text-capitalize"
            color="primary"
            elevation="0"
            @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "Login",

  data() {
    const defaultForm = Object.freeze({
      email: '',
      password: ''
    });
    return {
      form: Object.assign({}, defaultForm),
      showPass: false,
      rules: {
        email: [v => v.length > 0 || 'This field is required'],
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },

  methods: {
    login: function () {
      firebase.auth.signInWithEmailAndPassword(this.form.email, this.form.password)
          .then((user) => {
            console.log(user);
            this.$router.push({name: 'Dashboard'});
            this.$store.commit('SET_LOGGED_IN', true);
          })
          .catch(err => {
            console.log(err);
            alert('Oops! ' + err.message);
          })
    }
  }
}
</script>

<style scoped>

</style>