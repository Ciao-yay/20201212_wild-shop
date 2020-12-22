/* 
  包含n个接口的模块
  返回值为promise对象
*/

import ajax from './ajax'

// const BASIC_URL = 'http://localhost:4000'
const BASIC_URL = '/api'

// [1、根据经纬度获取位置详情]
export const reqLocation = geohash => ajax(`${BASIC_URL}/position/${geohash}`)
// [2、获取食品分类列表]
export const shopCategory = () => ajax(`${BASIC_URL}/index_category`)
// [3、根据经纬度获取商铺列表]
export const shops = (latitude,longitude) => ajax(`${BASIC_URL}/shops`,{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const shopsByKeyword = ({keyword,longitude,latitude}) => ajax(`${BASIC_URL}/search_shops`,{keyword,latitude,longitude})
// [5、获取一次性验证码]不需要
// export const getCaptcha = () => ajax (`${BASIC_URL}/captcha`)
// [6、用户名密码登陆]
export const loginByPwd = ({name,pwd,captcha}) => ajax(`${BASIC_URL}/login_pwd`,{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const sendMessage = phone => ajax(`${BASIC_URL}/sendcode`,{phone})
// [8、手机号验证码登陆]
export const loginByCode = (phone,code) => ajax(`${BASIC_URL}/login_sms`,{phone,code},'POST')
// [9、根据会话获取用户信息]
export const getUserinfo = () => ajax(`${BASIC_URL}/userinfo`)
// [10、用户登出]
export const logout = () => ajax(`${BASIC_URL}/logout`)

// mockjs模拟数据
// 1. 商家信息
export const receiveSeller = () => ajax('/seller')
// 2. 商品信息
export const receiveGoods = () => ajax('/goods')
// 3. 评分
export const receiveRatings = () => ajax('/ratings')