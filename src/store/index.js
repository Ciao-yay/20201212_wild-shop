/* 
   入口文件
*/
// 引入模块
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 声明使用
Vue.use(Vuex)

// 暴露对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})