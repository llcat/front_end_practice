import Vue from 'vue'
import Router from 'vue-router'
import DataCenter from './views/DataCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'data-center',
      component: DataCenter
    },
  ]
})
