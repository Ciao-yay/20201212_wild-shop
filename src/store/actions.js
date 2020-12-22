/* 
  通过mutation间接更新state的多个方法的对象
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
import {
  reqLocation,
  shopCategory,
  shops,
  getUserinfo,
  logout,
  receiveSeller,
  receiveGoods,
  receiveRatings
} from '../api/index'
export default {
  // 获取地理位置
  async getLocation({ commit, state }) {
    const { longitude, latitude } = state
    const geohash = `${latitude},${longitude}`
    const result = await reqLocation(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(GET_LOCATION, { address })
    }
  },
  // 获取食物分类列表
  async getCategory({ commit }) {
    const result = await shopCategory()
    if (result.code === 0) {
      const category = result.data
      commit(GET_CATEGORY, { category })
    }
  },
  // 获取食物分类列表
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    const result = await shops(latitude, longitude)
    if (result.code === 0) {
      const shopsTemp = result.data
      commit(GET_SHOPS, { shopsTemp })
    }
  },
  // 存入用户信息
  setUserInfo({ commit }, userInfo) {
    commit(SET_USER_INFO, { userInfo })
  },
  // 从会话中获取用户信息
  async getUserInfo({ commit }) {
    const result = await getUserinfo()
    const userInfo = result.data
    commit(SET_USER_INFO, { userInfo })
  },
  // 退出登录
  async loginOut({ commit }) {
    const result = await logout()
    console.log(result)
    if (result.code === 0) {
      commit(LOGIN_OUT)
      return
    }
    alert('退出失败')
  },
  // 获取商家信息列表
  async getSeller({ commit }) {
    const result = await receiveSeller()
    if (result.code === 0) {
      const seller = result.data
      commit(GET_SELLER, { seller })
    }
  },
  // 获取商品列表
  async getGoods({ commit },callback) {
    const result = await receiveGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(GET_GOODS, { goods })
      callback()
    }
  },
  // 获取评分
  async getRatings({ commit }) {
    const result = await receiveRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(GET_RATINGS, { ratings })
    }
  }
}