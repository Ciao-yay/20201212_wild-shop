/* 
  路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'

// 声明使用vuerouter
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  routes: [
  {
    path:'/',
    redirect:'/msite',
  },{
    path: '/msite',
    component: Msite,
    meta:{
      showFooter:true
    }
  }, {
    path: '/order',
    component: Order,
    meta:{
      showFooter:true
    }
  }, {
    path: '/profile',
    component: Profile,
    meta:{
      showFooter:true
    }
  },{
    path: '/login',
    component: Login
  }, {
    path: '/search',
    component: Search,
    meta:{
      showFooter:true
    }
  }]
})