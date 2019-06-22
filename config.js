/*
 * @Author: huyu
 * @Date: 2019-06-22 12:25:24
 * @Last Modified by: huyu
 * @Last Modified time: 2019-06-22 18:31:46
 */

// 配置

// markdown文件后缀
const markdownFileExt = '\\.md$'

// 采用的模板名词
const TEMPLATE_NAME = 'tp1'
// 模板路径
const TEMPLATE_PATH = './template'

// 博客源路径
const BLOG_PATH = './blog'

// 代码高亮样式文件，会去${hightlightStylePath}下面拷贝对应文件
const hightlightStyleFile = 'dark.css'
// 代码高亮样式源路径
const hightlightStylePath = 'node_modules/highlight.js/styles'

// 需要拷贝的文件名后缀
const copyFileExt = ['\\.jpg$', '\\.png$', '\\.gif$', '\\.jpeg$']

module.exports = {
  TEMPLATE_NAME,
  TEMPLATE_PATH,
  BLOG_PATH,
  hightlightStyleFile,
  hightlightStylePath,
  copyFileExt,
  markdownFileExt,
}