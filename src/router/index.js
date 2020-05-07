import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },


]

const router = new VueRouter({
  routes
})

export default router
