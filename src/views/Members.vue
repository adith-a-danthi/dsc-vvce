<template>
  <v-container class="text-center">
    <app-header></app-header>
    <p class="text-h4 text-md-h4 text-lg-h3 my-4 py-4">Meet the Team!</p>
    <v-row class="justify-center my-4 py-4">
      <v-col
          v-for="(member, idx) in memberList"
          v-bind:key="idx"
          cols="6" md="3"
          @click="setMemberModal(member)"
      >
        <v-sheet
            class="text-center pa-5"
            color="white"
            rounded="lg"
        >
          <v-avatar
              color="#536DFE"
              size="10rem"
          >
            <!--            <v-img-->
            <!--                class="mx-auto"-->
            <!--                alt="chapter.alt"-->
            <!--                src="@/assets/mobile.svg"-->
            <!--            ></v-img>-->
            <v-icon size="9rem" color="white">
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <p class="text-body-1 text-md-h6 text-lg-h5 mt-2 pt-5">{{ member.name }}</p>
          <p class="text-body-1 text-lg-h6 font-weight-regular text-capitalize">{{ member.role }}</p>
        </v-sheet>
      </v-col>
      <v-dialog
          v-model="showMemberModal"
          width="65vw"
      >
        <v-card>
          <v-card-title class="justify-end">
            <v-btn
                small
                icon
                @click="showMemberModal = false"
            >
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <member-display :member-details="selectedMember"></member-display>
          </v-card-text>
        </v-card>

      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "../components/AppHeader";
import firebase from "../utils/firebase";
import MemberDisplay from "../components/MemberDisplay";

export default {
  name: "Members",
  components: {
    MemberDisplay,
    AppHeader
  },
  mounted() {
    this.getAllMembers();
  },
  data() {
    return {
      memberList: [],
      showMemberModal: false,
      selectedMember: {
        name: '',
        email: '',
        skills: [],
        projects: [],
        experience: [],
        github: '',
        linkedin: '',
        website: '',
        bio: '',
        tagline: '',
        role: ''
      }
    }
  },
  methods: {
    getAllMembers() {
      let members = []
      firebase.usersCollection.get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              members.push(doc.data());
              console.log(members, doc.data());
            })
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Something went wrong!')
          });
      this.memberList = members;
    },
    setMemberModal(member) {
      this.selectedMember = member;
      this.showMemberModal = true;
    }
  }
}
</script>

<style scoped>

</style>