import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home/home'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/login', name: 'login', component: login},
    {path: '/', name: 'index', component: home, meta: {requireAuth: true}},
    {path: '/home', name: 'home', component: home, meta: {requireAuth: true}},

  ]
})
