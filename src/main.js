// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementUI)
//引入axios
import axios from 'axios'

Vue.prototype.$axios = axios
//引入common.js
import common from './assets/js/common'

Vue.prototype.$common = common
//引入MD5
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
//引入common.css
import './assets/css/common.css'
//引入iconfont.css
import './assets/icon/iconfont.css'


Vue.config.productionTip = false

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (to.meta.requireAuth && !sessionStorage.getItem('accessToken')) {
      next({path: '/login'})
    } else {
      next()
    }
  }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
