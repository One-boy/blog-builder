### 说明
- 模板文件目录，如tp1
- 每个模板目录下有`config.json`配置,主要配置输出的html、js和css文件名。


### 几个替换关键字示例
- 主要有：
  - ACTIVE_KEY：活跃key，左侧列表高亮key
  - BLOG_LIST：左侧文章列表
  - TITLE_LIST：右侧内容标题列表
  - BLOG_CONTENT：文章内容，html字符串。
```js

//活跃key
var ACTIVE_KEY = 'git/git基础--打标签'

//博客列表
var BLOG_LIST = [
  {
    name: 'git',
    children: [
      {
        name: 'git基础--打标签',
        url: 'git/git基础--打标签'
      },
      {
        name: 'git基础--打标签2',
        url: 'git/git基础--打标签2'
      },
    ],
  },
  {
    name: 'git基础--打标签3',
    url: 'git/git基础--打标签3'
  },
]

//标题列表
var TITLE_LIST = [
  {
    name: 'git',
    url: 'git',
    children: [
      {
        name: 'git基础--打标签',
        url: 'git基础--打标签'
      },
      {
        name: 'git基础--打标签2',
        url: 'git基础--打标签2'
      },
    ],
  },
  {
    name: 'git基础--打标签3',
    url: 'git基础--打标签3'
  },
]

// 内容
var BLOG_CONTENT = '<div><h2>我是内容</h2></div>'
```