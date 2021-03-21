<template>
  <div class="text-center">
    <v-dialog
      v-model='dialog'
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="secondary"
          dark
          v-on="on"
          
        >Edit
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit Meetup Details
        </v-card-title>

        <v-card-text>
        	<v-container>
				<v-text-field
					name='title'
					label='Title*'
					counter='20'
					v-model='editedTitle'
					id='title'
					
					required
				></v-text-field>
				<v-textarea
					name='description'
					label='Description*'
					id='description'
					v-model='editedDescription'
					
					required
					auto-grow
					rows='1'
				></v-textarea>
        	</v-container>
         
        </v-card-text>

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
				editedTitle: this.meetup.title,
				editedDescription: this.meetup.description
			}
		},
		methods: {
			onSubmit () {
				if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
					return
				}
				this.dialog = false
				this.$store.dispatch('updateMeetupData', {
					id: this.meetup.id,
					title: this.editedTitle,
					description: this.editedDescription
				})
			}
		}
	}
</script>