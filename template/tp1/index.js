/*
 * @Author: huyu 
 * @Date: 2019-06-22 11:55:41 
 * @Last Modified by: huyu
 * @Last Modified time: 2019-06-22 18:43:49
 */

// tp1脚本


// 活跃key
// var ACTIVE_KEY = 'git/git基础--打标签'

// 博客列表
// var BLOG_LIST = [
//   {
//     name: 'git',
//     children: [
//       {
//         name: 'git基础--打标签',
//         url: 'git/git基础--打标签'
//       },
//       {
//         name: 'git基础--打标签2',
//         url: 'git/git基础--打标签2'
//       },
//     ],
//   },
//   {
//     name: 'git基础--打标签3',
//     url: 'git/git基础--打标签3'
//   },
// ]

// 标题列表
// var TITLE_LIST = [
//   {
//     name: 'git',
//     url: 'git',
//     children: [
//       {
//         name: 'git基础--打标签',
//         url: 'git基础--打标签'
//       },
//       {
//         name: 'git基础--打标签2',
//         url: 'git基础--打标签2'
//       },
//     ],
//   },
//   {
//     name: 'git基础--打标签3',
//     url: 'git基础--打标签3'
//   },
// ]


var blogLeft = document.getElementById('blog-left')
var blogRight = document.getElementById('blog-right')

var activeKey = ACTIVE_KEY
var blogListData = BLOG_LIST
var titleListData = TITLE_LIST


// 渲染左边列表
function renderLeft(data) {
  var ul = document.createElement('ul')
  data.forEach(function (d) {
    var li = document.createElement('li')
    var a = document.createElement('a')
    a.innerText = d.name
    a.href = d.url || ''
    a.title = d.name
    a.onclick = function (e) {
      e && e.preventDefault()
      if (d.url) {
        window.location.href = d.url
      }
    }
    if (d.url === activeKey || d.name === activeKey) {
      a.className = 'active'
    }
    li.appendChild(a)
    ul.appendChild(li)

    if (d.children && d.children.length > 0) {
      li = document.createElement('li')
      li.appendChild(renderLeft(d.children))
      ul.appendChild(li)
    } else if (d.children && d.children.length === 0) {
      ul.removeChild(li)
    }
  })
  return ul
}

// 渲染右侧列表
function renderRight(data) {
  var ul = document.createElement('ul')
  data.forEach(function (d) {
    var li = document.createElement('li')
    var a = document.createElement('a')
    a.innerText = d.name
    a.href = '#' + d.url
    a.title = d.name

    li.appendChild(a)
    ul.appendChild(li)
    if (d.children) {
      li = document.createElement('li')
      li.appendChild(renderRight(d.children))
      ul.appendChild(li)
    }
  })
  return ul
}

var fragLeft = document.createDocumentFragment()
var fragRight = document.createDocumentFragment()
var ulLeft = renderLeft(blogListData)
var ulRight = renderRight(titleListData)

fragLeft.appendChild(ulLeft)
fragRight.appendChild(ulRight)

blogLeft.appendChild(fragLeft)
blogRight.appendChild(fragRight)