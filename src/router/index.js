import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter)
Vue.use(VueSweetalert2);

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
