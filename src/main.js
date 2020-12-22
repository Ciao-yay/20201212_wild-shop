
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import { Button } from 'mint-ui'
import './mock/mockServer'// 引入能加载就好了
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
