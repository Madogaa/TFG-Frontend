import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/profile/:id',
    name: 'alperfil',
    props: true,
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profileSearch/:search',
    name: 'searchProfile',
    props: true,
    component: () => import('../views/ProfileSearch.vue')
  },
  {
    path: '/profile/:id/:search',
    name: 'profileListView',
    props: true,
    component: () => import('../views/ProfileListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
