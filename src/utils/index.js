/*
 * @Author: huyu
 * @Date: 2020-07-15 14:08:15
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-20 17:36:38
 */

// 工具类库
import { categoryMap } from "../config/config"

// 分类序列化
export const categorySerialization = edges => {
  let result = {}
  edges.forEach(e => {
    const { category } = e.node.frontmatter
    if (!result[category]) {
      result[category] = { num: 0, key: categoryMap.get(category) }
    }
    result[category].num += 1
  })
  return Object.entries(result)
}

// 节流
// 节流即只有超过延迟的时间才执行，否则不执行
export const throttle = (func, delay) => {
  let preTime = 0
  return (...args) => {
    let now = Date.now()
    if (now - preTime > delay) {
      func.call(this, ...args)
      preTime = now
    }
  }
}

// 防抖
// 防抖即延迟时间内有调用就不会执行，并且会重新开始计时延迟，在一个延迟周期内没有调用则执行
export const debounce = (func, delay) => {
  let tid
  return (...args) => {
    if (tid) {
      clearTimeout(tid)
    }
    tid = setTimeout(() => {
      func.call(this, ...args)
      tid = null
    }, delay)
  }
}
