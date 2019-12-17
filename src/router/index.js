import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/color',
    component: () => import('../views/Color.vue')
  },
  {
    path: '/type',
    component: () => import('../views/Type.vue')
  },
  {
    path: '/detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/img',
    component: () => import('../views/Img.vue')
  },
  {
    path: '/price',
    component: () => import('../views/Price.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
