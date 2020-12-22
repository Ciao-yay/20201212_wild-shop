import Mock from 'mockjs'
import data from './data.json'
// 使用 Mock

Mock.mock( '/seller', {code:0,data:data.info} )
Mock.mock( '/goods', {code:0,data:data.goods} )
Mock.mock( '/ratings', {code:0,data:data.ratings} )