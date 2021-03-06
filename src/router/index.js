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
    path: '/search/:query',
    name: 'Search',
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    name:'Movie Detail',
    path:'/detail/mv/:id',
    component: () => import('../views/DetailMv.vue'),
    props:true
  },
    {
    name:'Tv Detail',
    path:'/detail/tv/:id',
    component: () => import('../views/DetailTv.vue'),
    props:true
  }

]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
  base: process.env.BASE_URL,
  routes
})

export default router
