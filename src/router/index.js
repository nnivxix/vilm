import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path:'/detail',
    name:'Detail',
    component: () =>  import('../views/Detail.vue'),
    children:[
    {
      name:'Movie Detail',
      path: '/detail/mv:id',
      component: () => import('../views/DetailMv.vue')
    },
    {
      name:'Tv Detail',
      path:'/detail/tv:id',
      component: () =>  import('../views/DetailTv.vue')
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
