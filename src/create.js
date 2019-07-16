/*
 * @Author: huyu
 * @Date: 2019-06-22 13:19:23
 * @Last Modified by: hy
 * @Last Modified time: 2019-07-16 21:28:52
 */


// 生成对应的文件夹和文件
const MDTransform = require('./markdownTransform')
const config = require('./config')
const fs = require('fs')

const MDT = new MDTransform()


// 是否markdown
function isMarkDown(name) {
  const reg = new RegExp(config.markdownFileExt, 'i')
  return reg.test(name)
}

// 是否拷贝文件
function isCopyFile(name) {

  return config.copyFileExt.some(v => {
    const reg = new RegExp(v, 'i')
    return reg.test(name)
  })

}

// 生成博客列表
function createBlogList(data = [], currentPath) {
  let result = []

  let libPath = currentPath.split('/')
  libPath.splice(0, 1)
  libPath = libPath.map(() => '../').join('')

  data.forEach(d => {

    if (d.type === 'file') {
      if (!isMarkDown(d.name)) {
        return
      }
      d.title = d.name.replace(new RegExp(config.markdownFileExt, 'gi'), '')
      let url = `${libPath}${d.path}/${d.title}/`
      if (d.path === './') {
        url = `${libPath}${d.title}/`
      }
      result.push({
        name: d.title,
        url,
      })
    } else if (d.type === 'directory' && d.children && d.children.length > 0) {
      result.push({
        name: d.name,
        children: createBlogList(d.children, currentPath)
      })
    }
  })
  return result
}

// 提取标题
function createTitle(content) {
  const t = /<(h1|h2|h3|h4|h5|h6)(?:.*)?>(.*)<\/(h1|h2|h3|h4|h5|h6)>/g

  let result = []

  let matches = t.exec(content)

  // 找到最后一个，比较标题大小
  function findLastData(re, title) {
    if (re.length === 0) {
      return re
    }

    let data = re[re.length - 1]
    if (title <= data.title) {
      return re
    }

    if (title > data.title) {
      if (!data.children) {
        data.children = []
      }
      return findLastData(data.children, title)
    }
  }

  while (matches !== null) {
    let ma = findLastData(result, matches[1])
    ma.push({
      name: matches[2],
      url: matches[2],
      title: matches[1],
    })
    matches = t.exec(content)
  }

  return result
}

// 遍历
function map(data, distPath, fullData, jsonConfig) {

  data.forEach(d => {

    if (d.type === 'file') {

      if (isCopyFile(d.name)) {
        fs.mkdirSync(`${distPath}/${d.path}`, { recursive: true })
        fs.copyFileSync(`${config.BLOG_PATH}/${d.path}/${d.name}`, `${distPath}/${d.path}/${d.name}`)
      }

      if (!isMarkDown(d.name)) {
        return
      }

      let BLOG_TITLE = []
      let BLOG_LIST = []
      let curPath = (d.path === './') ? d.path : `//${d.path}`
      BLOG_LIST = createBlogList(fullData, curPath)

      d.title = d.name.replace(new RegExp(config.markdownFileExt, 'gi'), '')
      // 创建文件夹
      fs.mkdirSync(`${distPath}/${d.path}/${d.title}`, { recursive: true })

      // 读取文件内容
      const content = fs.readFileSync(`${config.BLOG_PATH}/${d.path}/${d.name}`, { encoding: 'utf8' }).toString()
      // 转换文件内容
      const newContent = MDT.buildToHTML(content)
      // 提取标题
      BLOG_TITLE = createTitle(newContent)
      // 读取模板
      let html = fs.readFileSync(`${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/${jsonConfig.main.html}`).toString()
      // 替换模板内容
      let libPath = d.path.split('/')
      libPath.push('')
      if (d.path === './') {
        libPath.splice(0, 2)
      }
      let libPathPre = libPath.map(() => '../').join('')
      libPath = libPathPre + 'lib/'

      let activeKey = `${libPathPre}${d.path}/${d.title}/`
      if (d.path === './') {
        activeKey = `${libPathPre}${d.title}/`
      }
      html = html
        .replace(jsonConfig.main.javascript, `${libPath}/index.js`)  // 替换index.js路径
        .replace(jsonConfig.main.style, `${libPath}/index.css`)      // 替换index.css路径
        .replace('</head>', `<link rel="stylesheet" href="${libPath}/md.css">
      <link rel="stylesheet" href="${libPath}/${config.hightlightStyleFile}">
      </head> 
      `)  // 高亮样式文件路径
        .replace('[BLOG_ACTIVE_KEY]', JSON.stringify(activeKey))
        .replace('[BLOG_LIST]', JSON.stringify(BLOG_LIST))
        .replace('[BLOG_TITLE]', JSON.stringify(BLOG_TITLE))
        .replace('[BLOG_CONTENT]', JSON.stringify(newContent))

      // 输出到文件
      fs.writeFileSync(`${distPath}/${d.path}/${d.title}/index.html`, html)
    } else if (d.type === 'directory') {
      fs.mkdirSync(`${distPath}/${d.path}`, { recursive: true })
      map(d.children, distPath, fullData, jsonConfig)
    }
  })
}

// 创建首页index.html
function createIndex(fullData, jsonConfig, distPath) {
  // 提取文章列表
  let BLOG_LIST = createBlogList(fullData, '')
  // 内容
  let content = config.indexContent
  let libPath = 'lib'
  // 读取模板
  let html = fs.readFileSync(`${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/${jsonConfig.main.html}`).toString()
  html = html
    .replace(jsonConfig.main.javascript, `${libPath}/index.js`)  // 替换index.js路径
    .replace(jsonConfig.main.style, `${libPath}/index.css`)      // 替换index.css路径
    .replace('</head>', `<link rel="stylesheet" href="${libPath}/md.css">
    <link rel="stylesheet" href="${libPath}/${config.hightlightStyleFile}">
    </head> 
    `)  // 高亮样式文件路径
    .replace('[BLOG_ACTIVE_KEY]', JSON.stringify(''))
    .replace('[BLOG_LIST]', JSON.stringify(BLOG_LIST))
    .replace('[BLOG_TITLE]', JSON.stringify([]))
    .replace('[BLOG_CONTENT]', JSON.stringify(content))

  let filePath = `${distPath}`
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true })
  }

  // 输出到文件
  fs.writeFileSync(`${filePath}/index.html`, html)
}

// 读取配置文件
function readConfig() {
  let congfigPath = `${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/`
  let configName = 'config.json'
  let p = `${congfigPath}${configName}`
  if (!fs.existsSync(p)) {
    throw new Error(`未找到配置文件${p}`)
  }
  let jsonConfig = fs.readFileSync(p, { encoding: 'utf8' }).toString()
  jsonConfig = JSON.parse(jsonConfig)
  return jsonConfig
}

function Create(data, distPath) {

  let jsonConfig = readConfig()

  if (fs.existsSync(distPath)) {
    fs.renameSync(distPath, `backup_dist_${Date.now()}`)
    fs.mkdirSync(distPath)
  }

  // 创建首页
  createIndex(data, jsonConfig, distPath)

  let templatePath = `${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}`
  let distLibPath = `${distPath}/lib`

  fs.mkdirSync(distLibPath, { recursive: true })


  fs.copyFileSync((`${templatePath}/${jsonConfig.main.javascript}`), `${distLibPath}/index.js`)
  fs.copyFileSync(`${templatePath}/${jsonConfig.main.style}`, `${distLibPath}/index.css`)
  fs.copyFileSync(`lib/md.css`, `${distLibPath}/md.css`)
  fs.copyFileSync(`${config.hightlightStylePath}/${config.hightlightStyleFile}`, `${distLibPath}/${config.hightlightStyleFile}`)

  map(data, distPath, data, jsonConfig)
}

module.exports = Create