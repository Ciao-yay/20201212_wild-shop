/* 
  封装ajax请求
  函数返回值  res.data
*/
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
  new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })

}