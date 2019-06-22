/*
 * @Author: huyu
 * @Date: 2019-06-22 13:19:23
 * @Last Modified by: huyu
 * @Last Modified time: 2019-06-22 18:33:59
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
      result.push({
        name: d.name,
        url: `${libPath}${d.path}`,
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

function Create(data, distPath) {

  if (fs.existsSync(distPath)) {
    fs.renameSync(distPath, `backup_dist_${Date.now()}`)
    fs.mkdirSync(distPath)
  }

  // 初始化以及拷贝一些文件
  fs.mkdirSync(`${distPath}/lib`, { recursive: true })
  fs.copyFileSync((`${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/index.js`), `${distPath}/lib/index.js`)
  fs.copyFileSync(`${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/index.css`, `${distPath}/lib/index.css`)
  fs.copyFileSync(`lib/md.css`, `${distPath}/lib/md.css`)
  fs.copyFileSync(`${config.hightlightStylePath}/${config.hightlightStyleFile}`, `${distPath}/lib/${config.hightlightStyleFile}`)

  map(data, distPath, data)
}

// 遍历
function map(data, distPath, fullData) {

  data.forEach(d => {

    if (d.type === 'file') {

      if (isCopyFile(d.name)) {
        fs.mkdirSync(`${distPath}/${d.path}`, { recursive: true })
        fs.copyFileSync(`${d.path}/${d.name}`, `${distPath}/${d.path}/${d.name}`)
      }

      if (!isMarkDown(d.name)) {
        return
      }

      let BLOG_TITLE = []
      let BLOG_LIST = []
      BLOG_LIST = createBlogList(fullData, d.path)

      // 创建文件夹
      fs.mkdirSync(`${distPath}/${d.path}`, { recursive: true })

      // 读取文件内容
      const content = fs.readFileSync(`${d.path}/${d.name}`, { encoding: 'utf8' }).toString()
      // 转换文件内容
      const newContent = MDT.buildToHTML(content)
      // 提取标题
      BLOG_TITLE = createTitle(newContent)
      // 读取模板
      let html = fs.readFileSync(`${config.TEMPLATE_PATH}/${config.TEMPLATE_NAME}/index.html`).toString()
      // 替换模板内容
      let libPath = d.path.split('/')
      libPath.splice(0, 1)
      libPath = libPath.map(() => '../').join('') + 'lib/'

      html = html
        .replace('[BLOG_CONTENT]', newContent)
        .replace('[BLOG_ACTIVE_KEY]', JSON.stringify(d.name))
        .replace('[BLOG_LIST]', JSON.stringify(BLOG_LIST))
        .replace('[BLOG_TITLE]', JSON.stringify(BLOG_TITLE))
        .replace('index.css', `${libPath}index.css`)
        .replace('index.js', `${libPath}index.js`)
        .replace('</head>', `<link rel="stylesheet" href="${libPath}/md.css">
        <link rel="stylesheet" href="${libPath}/${config.hightlightStyleFile}">
        </head>
        `)

      // 输出到文件
      fs.writeFileSync(`${distPath}/${d.path}/index.html`, html)
    } else if (d.type === 'directory') {
      fs.mkdirSync(`${distPath}/${d.path}`, { recursive: true })
      map(d.children, distPath, fullData)
    }
  })
}

module.exports = Create