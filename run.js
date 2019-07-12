/*
 * @Author: huyu
 * @Date: 2019-06-22 12:24:59
 * @Last Modified by: hy
 * @Last Modified time: 2019-07-11 20:00:01
 */

// 生成脚本
const config = require('./src/config')
const Serialization = require('./src/Serialization')
const Create = require('./src/create')

const files = Serialization(config.BLOG_PATH)
Create(files, './dist')
console.log('生成完毕')
