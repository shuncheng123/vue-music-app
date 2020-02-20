import Vue from 'vue'
import Router from 'vue-router'

import RecommendView from '../components/recommend/recommendView.vue'
import RankingView from '../components/ranking/rankingView.vue'
import SingerView from '../components/singer/singerView.vue'

import RecommendDetails from '../components/recommend/recommendDetails.vue'
import SingerDetails from '../components/singer/singerDetails.vue'
import PlayView from '../components/play/playView.vue'

import Grabble from '../components/grabble/grabble.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',// ???
  base: process.env.BASE_URL,// ???
  routes: [
    {
      path: '/',
      redirect: '/recommendView',
    },
    {
      path: '/recommendView',
      name: 'recommendView',
      component: RecommendView,

      children:[
        {
          path: '/recommendView/:id',
          name: 'recommendDetails',
          component: RecommendDetails
        }
      ]
    },
    {
      path: '/rankingView',
      name: 'rankingView',
      component: RankingView
    },
    {
      path: '/singerView',
      name: 'singerView',
      component: SingerView,
      children:[
        {
          path: ':id',
          name: 'singerDetails',
          component: SingerDetails,
        }
      ]
    },{
      path: '/recommendView/:id',
      name: 'playView',
      component: PlayView
    },{
      path: '/grabble',
      name: 'grabble',
      component: Grabble
    }
  ]
})
