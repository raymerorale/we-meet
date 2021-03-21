<template>
  <v-app id='app'>
    <div>
      <!-- :class="[message.author === authUser.displayName ? 'outgoing_msg':'incoming_msg']" -->
      <v-app-bar :fixed='isLanding'
        dark :class="[isLanding === true && scrollPosition < 400 ? 'opacity elevation-0':'red']"
      >
        <v-app-bar-nav-icon 
        @click="drawer = true"
        class="d-sm-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to='/' tag='span' style='cursor: pointer'>WeMeet</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class='d-none d-sm-flex' depressed 
          v-for='item in menuItems' 
          :key="item.title"
          router :to='item.link'
          :class="[isLanding === true && scrollPosition < 500 ? 'opacity':'red']"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
      </v-app-bar>
    </div>
    <router-view></router-view>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          router :to='item.link'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      
        <div class="pa-2 logout" v-if='userIsAuth'>
          <v-btn @click='onLogout' block>Logout</v-btn>
        </div>
      
    </v-navigation-drawer>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created() {
    
  },
  computed: {
    menuItems () {
      let menuItems = [
        { title: 'Sign Up', icon: 'mdi-account-plus', link: '/signup' },
        { title: 'Login', icon: 'mdi-login', link: '/login' }
      ]
      if(this.userIsAuth) {
        menuItems = [
        { title: 'View Meetups', icon: 'mdi-account-multiple', link: '/meetups'  },
        { title: 'Organize', icon: 'mdi-calendar-multiple', link: '/meetup/new' },
        { title: 'Profile', icon: 'mdi-account', link: '/profile' }
        ]
      }
       return menuItems
    },
    userIsAuth () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  watch:{
    $route: function(newRoute){
      if(newRoute.path === '/'){
        this.isLanding = true;
      }else{
        this.isLanding = false
      }
      
    }

  },
  methods: {
    updateScroll() {
       this.scrollPosition = window.scrollY
    },
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  data() {
    return {
      scrollPosition: null,
      isLanding: true,
      drawer: false,
    }
  }
};
</script>
<style>
.opacity{
  background-color: rgba(100, 100, 100, 0.0) !important;
  z-index: 999;
  text-shadow: 2px 2px 0px #000000;
}
.change_color {
       background-color:red !important;
   }
.logout{
  margin-top: 63vh !important;
}
</style>
