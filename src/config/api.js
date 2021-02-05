/*
 * @Author: huyu
 * @Date: 2020-07-16 16:42:33
 * @Last Modified by: hy
 * @Last Modified time: 2020-07-16 21:56:39
 */

// 请求接口
const SERVER = "https://www.nuobel.com/nuobelService/"
// const SERVER = "http://192.168.1.104:12601/nuobelService/"
// 增加浏览量
const pageViewAdd = `${SERVER}pageView/add`
// 查询浏览量
const pageViewQuery = `${SERVER}pageView/query`

// 增加点赞量
const likeAdd = `${SERVER}like/add`
// 查询点赞量
const likeQuery = `${SERVER}like/query`

export { pageViewAdd, pageViewQuery, likeAdd, likeQuery }
