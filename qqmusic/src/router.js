import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './components/tab/recommend';
import Singer from './components/tab/singer';
import Rank from './components/tab/rank';
import Search from './components/tab/search';
import SingerDetail from './components/singer-detail';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { // 首屏显示 recommend
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path: ':id', //根据不同的ID显示不同数据
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
  ]
})
