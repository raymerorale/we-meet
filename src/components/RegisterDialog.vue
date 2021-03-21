<template>
  <div>
    <v-dialog
      v-model='dialog'
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          depressed
          color='red--text darken-1 white'
        >

        {{ userIsRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title 
          v-if='userIsRegistered'
        >
          Unregister from Meetup
        </v-card-title>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          v-else
        >
          Register to Meetup
        </v-card-title>
        <div class='text-center'>
          <v-card-text>
            You can always change your decision later on
          </v-card-text>
        </div>
        <v-divider></v-divider>

      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
          Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="onSubmit"
          >
          Confirm
          </v-btn>
    </v-card-actions> 
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: ['meetupId'],
    computed:{
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
            return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onSubmit () {

      }
    }
  }
</script>