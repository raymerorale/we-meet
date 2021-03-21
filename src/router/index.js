import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Middleware from './middleware'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: () => import('../views/Meetup/Index.vue')
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: () => import('../views/Meetup/Create.vue'),
    beforeEnter: Middleware
  },
  {
    path: '/meetup/:id',
    props: true,
    name: 'Meetup',
    component: () => import('../views/Meetup/Show.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/User/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/User/Profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
