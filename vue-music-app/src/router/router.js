import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Ranking from '../components/ranking.vue'
import Singer from '../components/singer.vue'
import SongDetails from '../components/songDetails.vue'
import SingerDetails from '../components/singerDetails.vue'
import Loading from '../common/loading.vue'





Vue.use(Router)

export default new Router({
  mode: 'history',// ???
  base: process.env.BASE_URL,// ???
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/home/:id',
          name: 'songDetails',
          component: SongDetails
        }
      ]
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[
        {
          path: ':id',
          name: 'singerDetails',
          component: SingerDetails,
        }
      ]
    },
    
  ]
})
