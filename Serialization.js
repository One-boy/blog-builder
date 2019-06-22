/*
 * @Author: huyu 
 * @Date: 2019-06-22 12:52:01 
 * @Last Modified by: huyu
 * @Last Modified time: 2019-06-22 14:15:06
 */

// 根据传入路径，序列化返回一个文件夹和文件列表的对象
const fs = require('fs')


function Serialization(path) {


  if (!fs.existsSync(path)) {
    throw new Error(`路径${path}不存在`)
  }

  const result = readDir(path)
  return result
}


// 读出目录下的所有文件和文件夹列表
function readDir(path) {
  let result = []
  const data = fs.readdirSync(path, { withFileTypes: true })
  data.forEach(d => {
    let p = `${path}/${d.name}`
    if (d.isFile()) {
      result.push({
        name: d.name,
        type: 'file',
        path
      })
    } else if (d.isDirectory()) {
      result.push({
        name: d.name,
        type: 'directory',
        path: p,
        children: readDir(p)
      })
    }
  })
  return result
}


module.exports = Serialization