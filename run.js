/*
 * @Author: huyu
 * @Date: 2019-06-22 12:24:59
 * @Last Modified by: huyu
 * @Last Modified time: 2019-06-22 22:12:56
 */

// 生成脚本
const config = require('./config')
const Serialization = require('./Serialization')
const Create = require('./create')

const files = Serialization(config.BLOG_PATH)
Create(files, './dist')
console.log('生成完毕')
