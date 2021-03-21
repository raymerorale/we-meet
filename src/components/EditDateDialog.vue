<template>
  <div>
    <v-dialog
      v-model='dialog'
      width="600"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          v-on="on"
          depressed
          color='white'
        >

          <v-icon>mdi-calendar-edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit Meetup Date
        </v-card-title>
        <div class='text-center'>
	        <v-card-text>
	        	<v-date-picker
	        		v-model='editableDate' 
	        		actions
	        	>
	        	</v-date-picker>
	        	<v-time-picker
	        		v-model='editableTime'
	        		actions
	        		class='mt-5'
	        	></v-time-picker>
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
			Save
			</v-btn>
		</v-card-actions> 
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
	export default {
		props: ['meetup'],
		data () {
			return {
				dialog: false,
				editableDate: null,
				editableTime: null
			}
		},
		methods: {
			tConvert (time) {
				time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
				if (time.length > 1) {
					time = time.slice (1); 
					time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
					time[0] = +time[0] % 12 || 12;
				}
				return time.join ('');
			},
			onSubmit () {
				if (this.editableDate === null || this.editableTime === null) {
					return
				}
				let newDate = this.editableDate
				let newTime = this.tConvert(this.editableTime)
				this.$store.dispatch('updateMeetupData', {
					id: this.meetup.id,
					date: newDate,
					time: newTime
				})
			}
		},
		created () {
			this.editableDate = this.meetup.date
		}
	}
</script>