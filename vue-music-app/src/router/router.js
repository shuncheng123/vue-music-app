import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Ranking from '../components/ranking.vue'
import Singer from '../components/singer.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',// ???
  base: process.env.BASE_URL,// ???
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
  ]
})
