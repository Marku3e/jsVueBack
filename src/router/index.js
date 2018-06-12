import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home/home'
import login from '@/components/login/login'
import authority_control from '@/components/manager/authority_control'
import account_control from '@/components/manager/account_control'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/login', name: 'login', component: login},
    {path: '/', name: 'index', component: home, meta: {requireAuth: true}},
    {path: '/index', name: 'home', component: home, meta: {requireAuth: true}},
    {path: '/authority_control', name: 'authority_control', component: authority_control, meta: {requireAuth: true}},
    {path: '/account_control', name: 'account_control', component: account_control, meta: {requireAuth: true}},
  ]
})
