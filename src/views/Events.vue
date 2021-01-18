<template>
  <v-container>
    <app-header></app-header>
    <p class="text-h4 text-md-h4 text-lg-h3 my-4 py-4 text-center">Events</p>
    <v-row class="justify-center my-4 py-4">
      <v-col
          v-for="(event, idx) in eventList"
          v-bind:key="idx"
          cols="12" md="4"
      >
        <v-sheet
            class="text-center pa-5"
            color="white"
            rounded="lg"
            min-height="500px"
        >
          <v-avatar size="10rem">
            <v-img
                :src="event.imgURL"
            ></v-img>
          </v-avatar>

          <p class="text-body-1 text-lg-h6 font-weight-regular mb-0">{{ event.title }}</p>
          <p class="text-subtitle-2 ">{{ event.date }}</p>
          <p class="text-body-1 text-justify">{{ event.description }}</p>
          <v-divider class="mb-2"></v-divider>
          <p class="text-body-1 text-justify">Speakers</p>
          <v-row class="text-left">
            <v-col
                v-for="(speaker,idx) in event.speakers"
                v-bind:key="`speaker-${idx}`"
                cols="12" md="6"
            >
              <v-sheet
                  class="justify-center text-center pa-3"
                  outlined
                  elevation="0"
              >
                <v-avatar
                    color="grey"
                    size="5rem"
                >
                  <v-img
                      :src="speaker.image"
                  ></v-img>
                </v-avatar>
                <p class="text-body-1 mb-0 mt-2">{{ speaker.name }}</p>
                <p class="text-body-2 mb-0 mt-2">{{ speaker.company }}</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "../components/AppHeader";
import firebase from "../utils/firebase";

export default {
  name: "Events",
  components: {
    AppHeader
  },
  mounted() {
    this.getEventsList();
  },
  data: () => ({
    eventList: []
  }),
  methods: {
    getEventsList: function () {
      let events = [];
      firebase.eventsCollection.get()
          .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              events.push(doc.data());
            });
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Something went wrong.');
          });
      this.eventList = events;
    }
  }
}
</script>

<style scoped>

</style>