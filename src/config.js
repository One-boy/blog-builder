/*
 * @Author: huyu
 * @Date: 2019-06-22 12:25:24
 * @Last Modified by: hy
 * @Last Modified time: 2019-07-16 21:00:09
 */

// 配置

// markdown文件后缀
const markdownFileExt = '\\.md$'

// 采用的模板名词
const TEMPLATE_NAME = 'tp2'
// 模板路径
const TEMPLATE_PATH = './template'

// 博客源路径
const BLOG_PATH = './project'

// 代码高亮样式文件，会去${hightlightStylePath}下面拷贝对应文件
const hightlightStyleFile = 'github.css'
// 代码高亮样式源路径
const hightlightStylePath = 'node_modules/highlight.js/styles'

// 需要拷贝的文件名后缀
const copyFileExt = ['\\.jpg$', '\\.png$', '\\.gif$', '\\.jpeg$']

// 首页内容
const indexContent = '<div><h5 style="text-align:center;">欢迎来到我的博客</h5></div>'

module.exports = {
  TEMPLATE_NAME,
  TEMPLATE_PATH,
  BLOG_PATH,
  hightlightStyleFile,
  hightlightStylePath,
  copyFileExt,
  markdownFileExt,
  indexContent,
}