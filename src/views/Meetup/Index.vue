<template>
	<v-container>
		<v-card class='mt-5' tile v-for='meetup in meetups' :key='meetup.id'>
			<v-row>
				<v-col lg='4' sm='6' xs='12' class='pt-0 pb-0'>
					<v-img
					    height="220"
					    :src="meetup.imageUrl"
		  			></v-img>
	  			</v-col>
	  			<v-col class=''>
		  			<v-card-title class='headline'>
		      			{{ meetup.title }}
		    		</v-card-title>
		    		<v-card-subtitle>
		    			{{ meetup.date | moment("dddd, MMMM Do YYYY") }} | 
		    			{{ meetup.time }}
		    		</v-card-subtitle>
		    		<v-card-text class='pr-5'>{{ meetup.description.substring(0, 240) }}...
		    		</v-card-text>
		    		<v-btn depressed color='white' :to="'/meetup/' + meetup.id">
		    			<v-icon left>mdi-arrow-right</v-icon>
		    			View Meetup
		    		</v-btn>
		    	</v-col>
	    	</v-row>
		</v-card>
			
	</v-container>
</template>
<script>
export default {
	name: 'Meetups',
  	components: {
  	},
	computed: {
		meetups () {
			return this.$store.getters.loadedMeetups
		}
  	}
 }
</script>
<style>
</style>
