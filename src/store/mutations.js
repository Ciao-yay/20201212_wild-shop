/* 
  由actions触发直接更改状态
*/

import {
  GET_LOCATION,
  GET_CATEGORY,
  GET_SHOPS,
  SET_USER_INFO,
  LOGIN_OUT,
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS
} from './mutations-types'

export default{
  // 获取地址
  [GET_LOCATION](state,{address}){
    state.address = address
  },
  [GET_CATEGORY](state,{category}){
    state.category = category
  },
  [GET_SHOPS](state,{shopsTemp}){
    state.shops = shopsTemp
  },
  [SET_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo||{}
  },
  [LOGIN_OUT](state){
    state.userInfo={}
  },
  [GET_SELLER](state,{seller}){
    state.seller = seller
  },
  [GET_GOODS](state,{goods}){
    state.goods = goods
  },
  [GET_RATINGS](state,{ratings}){
    state.ratings = ratings
  }
}