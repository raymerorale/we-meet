<template>
  	<v-app>
  		<div>
		    <v-carousel
		    cycle
		    class='carouselHeight'
		    hide-delimiters
		    :show-arrows="false"
		  	>
			    <v-carousel-item
			      v-for="(image, i) in carouselImgs"
			      :key="i"
			  	  tile
			      :src="image.src"
			      
			    >
	    		</v-carousel-item>
	  		</v-carousel>
	  	</div>
  		<div class='title-group container offset-lg-1'>
			<p class='d-none d-sm-block display-3'>The real world is calling...</p>
			<p class='d-block d-sm-none display-2'>The real world is calling...</p>
			<p class='title'>Join a local group to meet people, try something new, or do more of what you love.</p>
      		<v-btn to='/signup' dark large class='red darken-1'>Join WeMeet</v-btn>
  		</div>
  		 <div class='mt-3 container'>
  			
  			<div class='mt-5'>
  				<div class='ml-5'>
		  			<p class='headline ma-0'>Meetups near you</p>
		  			<p class='subtitle-1'>Find groups that get together to do the things they love.</p>
		  		</div>
		  		<div class='text-center mt-5'>
		  			<v-progress-circular
				      indeterminate
				      color="red"
				      v-if='loading'
				    ></v-progress-circular>
			    </div>
	  			<v-slide-group
			      v-model="model"
			      class="mt-5"
			      center-active
			      show-arrows
			    >
	  				 <v-slide-item
				        v-for='(meetup, i) in meetups' :key='i'
				        v-slot:default="{ active, toggle }"
				      >
		  				<v-card :to="'/meetup/' + meetup.id" width='300'
		  					class='mr-4 ml-4'>
		  					<v-img :src='meetup.imageUrl' height='200' width='300'></v-img>
		  					<v-card-title class='pt-3'>{{ meetup.title }}</v-card-title>
		  					<v-card-subtitle class=''>{{ meetup.location }}</v-card-subtitle>
		  				</v-card>
		  			</v-slide-item>
	  			</v-slide-group>
	  		</div>
	  		<div class='mt-5 pt-5'>
  				<div class='ml-5 pl-5'>
		  			<p class='headline ma-0'>Meetups near you</p>
		  			<p class='subtitle-1'>Find groups that get together to do the things they love.</p>
		  		</div>
		  		<div class='text-center mt-5'>
		  			<v-progress-circular
				      indeterminate
				      color="red"
				      v-if='loading'
				    ></v-progress-circular>
			    </div>
	  			<v-slide-group
			      v-model="model"
			      class="mt-5"
			      center-active
			      show-arrows
			    >
				    
	  				 <v-slide-item
				        v-for='(meetup, i) in meetups' :key='i'
				        v-slot:default="{ active, toggle }"
				      >
		  				<v-card :to="'/meetup/' + meetup.id" width='300'
		  					class='mr-4 ml-4'>
		  					<v-img :src='meetup.imageUrl' height='200' width='300'></v-img>
		  					<v-card-title class='pt-3'>{{ meetup.title }}</v-card-title>
		  					<v-card-subtitle class=''>{{ meetup.location }}</v-card-subtitle>
		  				</v-card>
		  			</v-slide-item>
	  			</v-slide-group>
	  		</div> 

  		</div>
	</v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
	  return {
	  	model: null,
	  	carouselImgs: [
	  	{
	  		src: 'https://wp-media.labs.com/wp-content/uploads/2019/02/01140218/Modern-Meeting-Room-Design-Header-Image1.jpg',
	  		id: '001'
	  	},
	  	{
	  		src: 'https://hikers.shop/wp-content/uploads/2019/01/hi-1.jpg',
	  		id: '002'
	  	},
	  	{
	  		src: 'https://www.thebalancecareers.com/thmb/JV7xhLMROcaLwh744GjaTFpmKk0=/3979x2238/smart/filters:no_upscale()/business-meeting-982874716-5bce2d8fc9e77c0051938d79.jpg',
	  		id: '003'
	  	},
	  	{
	  		src: 'https://secure.meetupstatic.com/s/img/38502077024785452658/explore_page_photos/find-12.jpg',
	  		id: '004'
	  	},
	  	{
	  		src: 'https://www.youversion.com/wp-content/uploads/2018/12/careers_hero.jpg',
	  		id: '005'
	  	}
	  	]
	  }
  },
  computed: {
  	meetups () {
  		return this.$store.getters.featuredMeetups
  	},
  	loading () {
		return this.$store.getters.loading
	}
  }
}
</script>
<style>

.title-group{
	top: 30vh;
	text-align: center;
	color: white;
	text-shadow: 2px 2px 4px #000000;
	position: absolute;
	left: -2%;
}
@media (max-width: 600px) {
	.title-group{
		top: 20vh;
		left: 0;
	}
}
</style>
