/* 
  包含n个接口的模块
  返回值为promise对象
*/
import ajax from './ajax'
// [1、根据经纬度获取位置详情]
export const reqLocation = geohash => ajax(`/position/${geohash}`)
// [2、获取食品分类列表]
export const shopCategory = () => ajax(`/index_category`)
// [3、根据经纬度获取商铺列表]
export const shops = (longitude,latitude) => ajax(`/shops`,{longitude,latitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const shopsByKeyword = (keyword,longitude,latitude) => ajax(`/search_shops?keyword=${keyword}&geohash=${longitude},${latitude}`,{keyword,longitude,latitude})
// [5、获取一次性验证码]
export const getCaptcha = () => ajax(`/captcha`)
// [6、用户名密码登陆]
export const loginByPwd = (name,pwd,captcha) => ajax(`/login_pwd`,{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const sendWrite = (phone) => ajax(`/sendcode`,{phone})
// [8、手机号验证码登陆]
export const loginByCaptcha = (phone,captcha) => ajax(`/login_sms`,{phone,captcha},'POST')
// [9、根据会话获取用户信息]
export const getUserinfo = () => ajax(`/userinfo`)
// [10、用户登出]
export const logout = () => ajax(`/logout`)