import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about/:id',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/guest-list',
    name: 'Guest List',
    component: () => import('../views/GuestList')
  },
  {
    path: '/ota',
    name: 'OTA',
    component: () => import('../views/OTA')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
