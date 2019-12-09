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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
