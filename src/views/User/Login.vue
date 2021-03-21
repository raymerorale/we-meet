<template>
  <v-container>
  	<app-alert 
		@dismissed='onDismissed' 
		v-if='error'
		:text='error.message'
		>
	</app-alert>
	<v-form 
		@submit.prevent='onSubmit' 
		v-model='valid' ref='form' 
		lazy-validation 
		class='mt-5 container col-lg-4'
	>
		<p class='display-1 mb-5'>Login to WeMeet</p>
		<v-text-field
			name='email'
			label='Email'
			:rules='emailRules'
			id='email'
			v-model='email'
			required
		></v-text-field>
		<v-text-field
			type='password'
			name='password'
			label='Password'
			:rules='rules'
			id='password'
			v-model='password'
			required
		></v-text-field>
		<v-btn 
			class='mt-4'
			:disabled='!valid || loading'
			:loading='loading' 
			@click='validate' 
			type='submit'
			color='red white--text'>
			Log in
		</v-btn>
	</v-form>
  </v-container>
</template>
<script>
export default {
	data() {
		return {
			valid: false,
			email: '',
			password: '',
			rules: [
				v => !!v || 'This field is required'
			],
			emailRules: [
		        v => !!v || 'This field is required',
		        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		    ],
		}
	},
	methods: {
		validate () {
        	this.$refs.form.validate()
      	},
      	onSubmit () {
      		this.$store.dispatch('userLogin', {
      			email: this.email,
      			password: this.password
      		})
      	},
      	onDismissed () {
      		this.$store.dispatch('clearError')
      	}
	},
	computed: {
		user () {
			return this.$store.getters.user
		},
		error () {
			return this.$store.getters.error
		},
		loading () {
			return this.$store.getters.loading
		}
	},
	watch: {
		user (value) {
			if(value !== null && value !== undefined) {
				this.$router.push('/meetups')
			}
		}
	}
}
</script>