import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Ranking from '../components/ranking.vue'
import Singer from '../components/singer.vue'
import SongList from '../components/songList.vue'



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
          name: 'songList',
          component: SongList
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
      component: Singer
    },
    {
      path: '/songList',
      name: 'songList',
      component: SongList
    },
  ]
})
