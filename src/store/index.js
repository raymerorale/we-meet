import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
Vue.use(Vuex)
// const {Storage} = require('@google-cloud/storage');

// const storage = new Storage({
//   projectId: "we-meet-abed0",
//   keyFilename: "we-meet-abed0-firebase-adminsdk-zu3nc-cc03a0f3f5.json"
// });
export default new Vuex.Store({
  state: {
  	loadedMeetups: [],
  	user: null,
  	loading: false,
  	error: null
  },
  mutations: {
  	setLoadedMeetups (state, payload) {
  		state.loadedMeetups = payload
  	},
  	createMeetup (state, payload) {
  		state.loadedMeetups.push(payload)
  	},
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title && payload.description) {
        meetup.title = payload.title
        meetup.description = payload.description 
      }
      if (payload.date && payload.time) {
        meetup.date = payload.date
        meetup.time = payload.time
      }
    },
  	setUser (state, payload) {
  		state.user = payload
  	},
  	setLoading (state, payload) {
  		state.loading = payload
  	},
  	setError (state, payload) {
  		state.error = payload
  	},
  	clearError (state, payload) {
  		state.error = null
  	}
  },
  actions: {
  	loadedMeetups ({commit}) {
  		commit('setLoading', true)
  		db.collection('meetups').get()
		.then((snapshot) => {
			const meetups = []
			snapshot.forEach((doc) => {
  				meetups.push({
  					id: doc.id,
  					title: doc.data().title,
  					location: doc.data().location,
  					description: doc.data().description,
  					imageUrl: doc.data().imageUrl,
  					date: doc.data().date,
  					time: doc.data().time,
            authorId: doc.data().authorId
  				})
			});
			commit('setLoadedMeetups', meetups)
			commit('setLoading', false)
		})
		.catch((err) => {
			console.log('Error getting documents', err);
			commit('setLoading', true)
		});
  	},
  	createMeetup ({commit, getters}, payload) {
  		const meetup = {
  			title: payload.title,
  			location: payload.location,
  			description: payload.description,
  			date: payload.date,
  			time: payload.time,
        authorId: getters.user.id
  		}
      let imageUrl
      let key
  		db.collection('meetups').add(meetup).then((data) => {
  			key = data.id
        return key
  		})
      .then(key => {
        const filename = payload.image.name
        const extension = filename.slice(filename.lastIndexOf('.'))
        let storageRef = firebase.storage().ref();
        let photoRef = storageRef.child('meetups/' + key + '.' + extension);
        return photoRef.put(payload.image);
        // return firebase.storage().ref('meetups/' + key + '.' + extension).put(payload.image)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(fileData => {
        return fileData.ref.getDownloadURL()
         .then(imageUrl  => {
            return db.collection('meetups').doc(key).update({imageUrl: imageUrl});
         })
         .catch((error) => {
          console.log(error)
         })
      })
      .then(() => {
        commit('createMeetup', {
         ...meetup, 
         imageUrl: imageUrl,
         id:key
        })
      })
      .catch((error) => {
  			console.log(error)
  		})
  		
  	},
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title && payload.description) {
        updateObj.title = payload.title
        updateObj.description = payload.description 
      }
      if (payload.date && payload.time) {
        updateObj.date = payload.date
        updateObj.time = payload.time
      }

      db.collection('meetups').doc(payload.id).update(updateObj)
      .then(() => {
        commit('updateMeetup', payload)
        commit('setLoading', false)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
      
    },
  	userSignUp ({commit}, payload) {
  		commit('setLoading', true)
  		commit('clearError')
  		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
		user => {
			commit('setLoading', false)
			const newUser = {
				id: user.uid,
				registeredMeetups: []
			}
			commit('setUser', newUser)
		}).catch(
			error => {
				commit('setLoading', false)
				commit('setError', error)
				console.log(error)
			}
		)
  	},
  	userLogin ({commit}, payload) {
  		commit('setLoading', true)
  		commit('clearError')
  		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
  		user => {
  			commit('setLoading', false)
  			const newUser = {
				id: user.uid,
				registeredMeetups: []
			}
			commit('setUser', newUser)
  		}).catch(
			error => {
				commit('setLoading', false)
				commit('setError', error)
				console.log(error)
			}
		)
  	},
    autoLogin({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
  	clearError ({commit}) {
  		commit('clearError')
  	}
  },
  modules: {
  },
  getters: {
  	loadedMeetups (state) {
  		return state.loadedMeetups.sort((meetupA, meetupB) => {
  			return meetupA.date > meetupB.date
  		})
  	},
  	featuredMeetups (state, getters) {
  		return getters.loadedMeetups.slice(0, 10)
  	},
  	loadedMeetup (state) {
  		return (meetupId) => {
  			return state.loadedMeetups.find((meetup) => {
  				return meetup.id === meetupId
  			})
  		}
  	},
  	user (state) {
  		return state.user
  	},
  	error (state) {
  		return state.error
  	},
  	loading (state) {
  		return state.loading
  	}
  }
})
