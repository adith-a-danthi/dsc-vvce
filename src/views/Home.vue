<template>
  <div class="home overflow-y-auto overflow-x-hidden" style="">
    <app-header></app-header>
    <v-row class="align-center justify-center mt-n10" style="height: 100vh">
      <v-col cols="6">
        <v-container class="mx-10 px-10">
          <p class="text-h4 text-md-h3 text-lg-h2">Welcome to the Developer Student Club of VVCE!</p>
          <p class="text-body-1 text-md-h5 text-lg-h4">Dream | Learn | Build</p>
          <p class="text-md-body-1 text-lg-h6">
            Bridge the gap between <span class="accentText">theory</span> and <span class="accentText">practice</span>
          </p>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-img
            alt="Developer Activity"
            src="@/assets/developer_activity.svg"
            contain
            height="36vh"
        ></v-img>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-container class="my-5 pa-5 text-center">
      <v-row class="pb-2 justify-center">
        <v-col cols="6" md="3" v-for="(chapter, idx) in chapters" v-bind:key="idx">
          <v-sheet
              class="text-center"
              color="white"
              rounded="lg"
          >
            <br>
            <v-img
                :alt="chapter.alt"
                :src="require(`@/assets/${chapter.imgSrc}.svg`)"
                contain
                height="12vh"
            ></v-img>
            <p class="text-body-1 text-md-h6 text-lg-h5 my-2 py-5">{{ chapter.title }}</p>
          </v-sheet>
        </v-col>
      </v-row>
      <v-btn
          class="text-capitalize mx-auto"
          color="#536DFE"
          outlined
      >
        Find Out More
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";

export default {
  name: 'Home',
  components: {AppHeader},
  data: () => ({
    chapters: [
      {
        title: 'Android App Development',
        alt: 'Android',
        imgSrc: 'mobile'
      },
      {
        title: 'Web Development',
        alt: 'Web',
        imgSrc: 'coder'
      },
      {
        title: 'ML / AI',
        alt: 'ml_ai',
        imgSrc: 'ml_ai'
      },
      {
        title: 'Cloud Computing',
        alt: 'Cloud',
        imgSrc: 'cloud'
      }
    ]
  }),
  methods: {}
}
</script>
<style scoped>
.accentText {
  color: #536DFE;
}
</style>