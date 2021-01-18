<template>
  <v-container>
    <v-row class="mb-5">
      <v-col cols="4" md="3">
        <v-avatar
            color="#536DFE"
            size="5rem"
        >
          <!--            <v-img-->
          <!--                class="mx-auto"-->
          <!--                alt="chapter.alt"-->
          <!--                src="@/assets/mobile.svg"-->
          <!--            ></v-img>-->
          <v-icon size="4rem" color="white">
            mdi-account-circle
          </v-icon>
        </v-avatar>

        <h3 class="text-capitalize mt-2 text-md-h6 text-lg-h5">{{ memberDetails.name }}</h3>
        <p class="text-body-1 font-weight-regular mb-0">{{ memberDetails.tagline }}</p>

        <v-row class="my-1 justify-center">
          <v-btn
              v-if="memberDetails.github !== ''"
              color="black"
              icon
              elevation="0"
              target="_blank"
              :href="memberDetails.github"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn
              v-if="memberDetails.linkedin !== ''"
              color="primary"
              icon
              elevation="0"
              target="_blank"
              :href="memberDetails.linkedin"
          >
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-btn
              v-if="memberDetails.website !== ''"
              color="grey darken-2"
              icon
              elevation="0"
              target="_blank"
              :href="memberDetails.website"
          >
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </v-row>

        <v-divider class="mb-2"></v-divider>

        <p
            class="text-subtitle-2 text-left pb-0 mb-0"
            style="color: grey"
        >
          Bio:
        </p>
        <p class="text-lg-subtitle-2 text-left">
          {{ memberDetails.bio }}
        </p>
        <v-divider class="mb-2"></v-divider>
        <p class="text-subtitle-2 text-left pb-0 mb-0">
          Skills
        </p>
        <v-row class="mt-2">
          <v-chip
              small
              class="ma-1 text-uppercase"
              v-for="(skill) in memberDetails.skills"
              v-bind:key="skill"
          >
            {{ skill }}
          </v-chip>
        </v-row>
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>
      <v-col>
        <v-container class="text-left">
          <p class="text-h6 font-weight-regular text-left pb-0 mb-0">
            Projects
          </p>
          <br>
          <v-row>
            <v-col
                cols="12" md="6"
                class="text-center"
                v-for="(project,idx) in memberDetails.projects"
                v-bind:key="`project-${idx}`"
            >
              <v-card
                  elevation="0"
                  outlined
                  height="150px"
              >
                <v-card-title class="justify-space-between">
                  <span class="text-left text-subtitle-1">
                    {{ project.title }}
                  </span>
                  <v-btn
                      v-if="project.link.length > 0"
                      color="grey darken-2"
                      icon
                      small
                      elevation="0"
                      target="_blank"
                      :href="project.link"
                  >
                    <v-icon small>mdi-link</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <p class="text-left text-subtitle-2">
                    {{ project.description }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="mb-2"></v-divider>
        <v-container class="text-left">
          <p class="text-h6 font-weight-regular text-left pb-0 mb-0">
            Work Experience
          </p>
          <br>
          <ul>
            <li
                v-for="(exp,idx) in memberDetails.experience"
                v-bind:key="idx"
            >
              <p class="text-subtitle-1 text-md-body-1 mb-0" >{{ exp.role }}</p>
              <p class="text-subtitle-2 text-md-subtitle-1 mb-0">
                {{ exp.company }} | <span style="color: grey">{{ exp.startMonth }} {{ exp.startYear }} - {{
                  exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`
                }}</span>
              </p>
              <p class="text-subtitle-2 text-md-subtitle-1">
                {{ exp.description }}
              </p>
            </li>
          </ul>

          <v-divider></v-divider>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MemberDisplay",
  props: {
    memberDetails: {
      type: Object,
      default: () => ({
        name: 'Hello',
        email: 'hello@mail.com',
        skills: [],
        projects: [],
        experience: [],
        github: '',
        linkedin: '',
        website: '',
        bio: '',
        tagline: '',
      })
    }
  }
}
</script>

<style scoped>
  h3,p,li {
    color: #2e2e2e;
  }
</style>