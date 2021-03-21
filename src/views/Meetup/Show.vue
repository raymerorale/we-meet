<template>
<v-container class='show-container'>
  <div class='text-center mt-5' v-if='loading'>
    <v-progress-circular
      indeterminate
      color="red"
      v-if='loading'
    ></v-progress-circular>
  </div>
  <v-card v-else>
    <v-list-item>
      <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
      <v-list-item-content>
        <v-list-item-title class="headline">{{ meetup.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ meetup.location }}</v-list-item-subtitle>
      </v-list-item-content>
      <template v-if='userIsCreator'>
          <app-edit-meetup-dialog
            :meetup='meetup' 
          ></app-edit-meetup-dialog>
        </template>
    </v-list-item>

    <v-img
      :src="meetup.imageUrl"
      height="450"
    ></v-img>
    <v-container class='pt-0 pb-0'>
      <v-row class='text-right'>
        <v-col>
          <v-list-item-subtitle class='subtitle-1 text-right'>
          {{ meetup.date | moment("dddd, MMMM Do YYYY")  }}<br>
          {{ meetup.time }}
        </v-list-item-subtitle>
        </v-col>
        <v-col cols='auto' class='pl-0 ml-0'>
          <app-edit-date-dialog :meetup='meetup' v-if='userIsCreator'></app-edit-date-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text class='secondary--text pt-0'>
      <v-container>{{ meetup.description }}</v-container>
    </v-card-text>

    <v-card-actions>
      <!-- <v-btn
        text
        color="red accent-4"
      >
        Register
      </v-btn> -->
      <app-register-dialog :meetupId='meetup.id'></app-register-dialog>
      <v-btn
        text
        color="secondary"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>
<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuth () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuth) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.authorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
<style>
@media (min-width: 960px){
  .show-container{
  width: 70% !important;
  }
}

</style>