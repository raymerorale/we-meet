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
		<p class='display-1 mb-5'>Sign up to WeMeet</p>
		<v-text-field
			name='name'
			label='Name'
			:rules='rules'
			id='name'
			v-model='name'
			required
		></v-text-field>
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
		<v-text-field
			type='password'
			name='confPassword'
			label='Confirm Password'
			:rules='[comparePasswords]'
			id='confPassword'
			v-model='confPassword'
			required
		></v-text-field>
		<v-btn 
			class='mt-4'
			:disabled='!valid || loading'
			:loading='loading'
			@click='validate' 
			type='submit'
			color='red white--text'>
			Sign Up

		</v-btn>
	</v-form>
  </v-container>
</template>
<script>
export default {
	data() {
		return {
			valid: false,
			name: '',
			email: '',
			password: '',
			confPassword: '',
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
      		this.$store.dispatch('userSignUp', {
      			email: this.email,
      			password: this.password
      		})
      	},
      	onDismissed () {
      		this.$store.dispatch('clearError')
      	}
	},
	computed: {
		comparePasswords () {
			return () => (this.password === this.confPassword) || 'Password must match'
		},
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