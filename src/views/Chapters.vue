<template>
  <v-container>
    <app-header></app-header>
    <v-row class="align-center justify-center my-4 py-4">
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3">Android App Development</p>
          <p class="text-md-h6 font-weight-regular">Android software development is the process by which applications
            are created for devices running the Android operating system. Google states that "Android apps can be
            written using Kotlin, Java, and C++ languages" using the Android software development kit, while using other
            languages is also possible.</p>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-img
            alt="android"
            src="@/assets/mobile.svg"
            contain
            height="36vh"
        ></v-img>
      </v-col>
    </v-row>
    <br>
    <v-row class="align-center justify-center my-4 py-4">
      <v-col cols="6">
        <v-img
            alt="web"
            src="@/assets/coder.svg"
            contain
            height="36vh"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3">Web Development</p>
          <p class="text-md-h6 font-weight-regular">Web development is the work involved in developing a Web site for
            the Internet or an intranet. Web development can range from developing a simple single static page of plain
            text to complex Web-based Internet applications, electronic businesses, and social network services.</p>
        </v-container>
      </v-col>
    </v-row>
    <br>
    <v-row class="align-center justify-center my-4 py-4">
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3">Machine Learning & Artificial Intelligence</p>
          <p class="text-md-h6 font-weight-regular">Machine learning (ML) is the study of computer algorithms that
            improve automatically through experience. It is seen as a subset of artificial intelligence. Machine
            learning algorithms build a model based on sample data, known as "training data", in order to make
            predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are
            used in a wide variety of applications, such as email filtering and computer vision, where it is difficult
            or unfeasible to develop conventional algorithms to perform the needed tasks.</p>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-img
            alt="android"
            src="@/assets/ml_ai.svg"
            contain
            height="36vh"
        ></v-img>
      </v-col>
    </v-row>
    <br>
    <v-row class="align-center justify-center my-4 py-4">
      <v-col cols="6">
        <v-img
            alt="web"
            src="@/assets/cloud.svg"
            contain
            height="36vh"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3">Cloud Computing</p>
          <p class="text-md-h6 font-weight-regular">The Cloud enables anyone with an internet connection to access IT
            resources on-demand, such as those consumed by cloud-based applications. The basic resources available are
            compute, storage, and networking, all of which are needed for a business critical application to deliver a
            full experience. Be it any domain, inclusion of cloud has become a habit and a much preferred skill. Be it
            AWS,GCP & azure , cloud is a must for any developer.</p>
        </v-container>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <v-container class="text-center">
      <p class="text-h5 text-md-h4">Our Certified Members</p>
      <v-row class="justify-center">
        <v-col cols="12" md="3">
          <v-sheet
              class="pa-5"
              color="white"
              rounded="lg"
              height="375px"
          >
            <v-avatar size="10rem" rounded>
              <v-img
                src="@/assets/badges/android_java.png"
              ></v-img>
            </v-avatar>
            <p class="text-md-h6 font-weight-regular pt-4">Associate Android Developer</p>
            <v-row class="justify-center">
              <v-col cols="6">
                <ul class="text-body-1 text-left">
                  <li>Pushkar Anand</li>
                  <li>Ruthvik B R</li>
                  <li>Adith A Danthi</li>
                  <li>Neha Balaji</li>
                </ul>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-sheet
              class="pa-5"
              color="white"
              rounded="lg"
              height="375px"
          >
            <v-avatar size="10rem" rounded>
              <v-img
                  src="@/assets/badges/cloud_engineer.png"
              ></v-img>
            </v-avatar>
            <p class="text-md-h6 font-weight-regular pt-4">Associate Cloud Engineer</p>
            <v-row class="justify-center">
              <v-col cols="6">
                <ul class="text-body-1 text-left">
                  <li>Raehan Khan</li>
                  <li>Uthkarsh Sanjay</li>
                </ul>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-sheet
              class="pa-5"
              color="white"
              rounded="lg"
              height="375px"
          >
            <v-avatar size="10rem" rounded>
              <v-img
                  src="@/assets/badges/tf_certified_developer.png"
              ></v-img>
            </v-avatar>
            <p class="text-md-h6 font-weight-regular pt-4">Tensorflow Certified Developer</p>
            <v-row class="justify-center">
              <v-col cols="6">
                <ul class="text-body-1 text-left">
                  <li>Nikhil Ramesh</li>
                </ul>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AppHeader from "../components/AppHeader";

export default {
  name: "Chapters",
  components: {
    AppHeader
  }
}
</script>

<style scoped>

</style>