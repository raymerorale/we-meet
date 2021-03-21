import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from "firebase/app"
import Alert from './components/Alert.vue'
import EditMeetupDialog from './components/EditMeetupDialog.vue'
import EditDateDialog from './components/EditDateDialog.vue'
import RegisterDialog from './components/RegisterDialog.vue'

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
        apiKey: "AIzaSyBAqYVzMGhuWZzuLgiYeRUE7kp_tFogFMs",
        authDomain: "we-meet-abed0.firebaseapp.com",
        databaseURL: "https://we-meet-abed0.firebaseio.com",
        projectId: "we-meet-abed0",
        storageBucket: "we-meet-abed0.appspot.com",
        messagingSenderId: "963425320662",
        appId: "1:963425320662:web:c4924517f3c1cabc621377",
        measurementId: "G-9METFJ60KX"
      };
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
window.db = db;
// const {Storage} = require('@google-cloud/storage');

// const storage = new Storage({
//   projectId: "we-meet-abed0",
//   keyFilename: "we-meet-abed0-firebase-adminsdk-zu3nc-cc03a0f3f5.json"
// });

Vue.use(require('vue-moment'));
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetup-dialog', EditMeetupDialog)
Vue.component('app-edit-date-dialog', EditDateDialog)
Vue.component('app-register-dialog', RegisterDialog)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
  	firebase.auth().onAuthStateChanged((user) => {
  		if(user) {
  			this.$store.dispatch('autoLogin', user)
  		}
  	})
  	this.$store.dispatch('loadedMeetups')
  }
}).$mount('#app')
