import Vue from 'vue'
import VueRouter from 'vue-router'
import { ConfigRoute } from '../views/ConfigCreation/ConfigRoute'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/Config_creation',
  },
  ...ConfigRoute

];

const router = new VueRouter({
  routes
})

export default router
