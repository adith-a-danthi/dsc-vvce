<template>
  <div class="about">
    <app-header></app-header>
    <v-row class="align-center justify-center my-4 py-4" >
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3 text-lg-h2 accentText">Developer Student Clubs</p>
          <p class="text-body-1 text-md-h5">Helping students bridge the gap between <span class="accentText">theory</span> and <span class="accentText">practice</span></p>
          <p class="text-md-h6 font-weight-regular">Developer Student Clubs are university based community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome. By joining a DSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.</p>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-img
            alt="Cover Image"
            src="@/assets/dsc_hero.jpg"
            contain
            height="48vh"
        ></v-img>
      </v-col>
    </v-row>
    <v-divider/>
    <v-sheet class="pa-5" color="grey lighten-2">
      <v-row  class="justify-center  ma-5 pa-5">
        <v-col cols="3" md="3" class="mx-2">
          <v-avatar
              color="primary"
              class="mb-2"
          >
            <v-icon color="white">mdi-account-multiple</v-icon>
          </v-avatar>
          <p class="text-h6 font-weight-regular">Connect</p>
          <p class="text-body-1 font-weight-regular">Meet other students on campus interested in developer technologies. All are welcome, including those with diverse backgrounds and different majors.</p>
        </v-col>
        <v-col cols="3" md="3" class="mx-2">
          <v-avatar
              color="primary"
              class="mb-2"
          >
            <v-icon color="white">mdi-school</v-icon>
          </v-avatar>
          <p class="text-h6 font-weight-regular">Learn</p>
          <p class="text-body-1 font-weight-regular">Learn about a wide range of technical topics where new skills are gained through hands-on workshops, in-person training and project building activities.</p>
        </v-col>
        <v-col cols="3" md="3" class="mx-2">
          <v-avatar
              color="primary"
              class="mb-2"
          >
            <v-icon color="white">mdi-briefcase</v-icon>
          </v-avatar>
          <p class="text-h6 font-weight-regular">Grow</p>
          <p class="text-body-1 font-weight-regular">Apply your new learnings and connections to build great solutions for local problems. Advance your skills, career and network. Give back to your community by helping others learn as well.</p>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>
import AppHeader from "../components/AppHeader";
export default {
  name: "About",
  components: {
    AppHeader
  }
}
</script>
<style scoped>
  .accentText {
    color: #1a73e8;
  }
</style>