<template>
	<v-container>
		<v-form enctype="multipart/form-data" @submit.prevent='onSubmit' v-model='valid' ref='form' lazy-validation class='mt-5 container col-lg-10'>
			<p class='display-1 mb-5'>Create a New Meetup</p>
			<v-row>
				<v-col>
					<v-text-field
						name='title'
						label='Title*'
						counter='20'
						:rules='rules'
						id='title'
						v-model='title'
						required
					></v-text-field>
					<v-text-field
						name='location'
						label='Location*'
						id='location'
						:rules='rules'
						v-model='location'
						required
					></v-text-field>
					
					<v-textarea
						name='description'
						label='Description*'
						id='description'
						:rules='rules'
						v-model='description'
						required
					></v-textarea>
					
					<input 
						type='file' 
						style='display: none;' 
						ref='fileInput'
						accept="image/*"
						@change='onFileSelected'
						>
				</v-col>
				<v-col>
					<v-card width='400' class='float-right' v-if='!imageUrl' height='280'></v-card>
					<v-card>
						<v-img width='400'  class='float-right' :src='imageUrl'></v-img>
					</v-card>	
					
					<v-btn color='red' class='mt-3 float-right' dark @click='onPickFile'>Upload Image</v-btn>
				</v-col>
			</v-row>
			<p class='headline mt-5'>Set date and time</p>
			<v-row>
				<v-col>
					<v-date-picker class='' v-model="date" color="red"></v-date-picker>
				</v-col>
				<v-col>
					<v-time-picker class='' v-model='time' color="red"></v-time-picker>
				</v-col>
				
				
			</v-row>
			

			
			<v-btn 
				class='mt-4'
				:disabled='!valid' 
				@click='validate' 
				type='submit'
				color='red white--text'>
				Create Meetup
			</v-btn>
		</v-form>
	</v-container>
</template>
<script>
export default {
	data(){
		return {
			image: null,
			title: '',
			location: '',
			imageUrl: '',
			description: '',
			date: new Date().toISOString().substr(0, 10),
			time: '',
			valid: false,
			rules: [
				v => !!v || 'This field is required'
			]
		}
	},
	methods:{
		validate () {
        	this.$refs.form.validate()
      	},
      	onPickFile () {
      		this.$refs.fileInput.click()
      	},
      	onFileSelected (event) {
      		const files = event.target.files
      		let filename = files[0].name
      		if (filename.lastIndexOf('.') <= 0) {
      			return alert('Please select a valid file!')
      		}
      		const fileReader = new FileReader()
      		fileReader.addEventListener('load', () => {
      			this.imageUrl = fileReader.result
      		})
      		fileReader.readAsDataURL(files[0])
      		this.image = files[0]
      	},
      	tConvert (time) {
			// Check correct time format and split into components
			time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time.length > 1) { // If time format correct
				time = time.slice (1);  // Remove full string match value
				time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
				time[0] = +time[0] % 12 || 12; // Adjust hours
			}
			return time.join (''); // return adjusted time or original string
		},
      	onSubmit () {
      		if(!this.image){
      			return
      		}
      		let newTime = this.tConvert(this.time)
      		const meetupData = {
      			title: this.title,
      			location: this.location,
      			image: this.image,
      			description: this.description,
      			date: this.date,
      			time: newTime
      		}
      		this.$store.dispatch('createMeetup', meetupData)
      		this.$router.push('/meetups')
      	}
	}
}
</script>