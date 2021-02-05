## 描述

此仓库是[https://www.nuobel.com](https://www.nuobel.com)网站构建系统

网站使用`gatsby`构建，用于书写`markdown`格式的文章

## 怎么使用（How use it？）

- `git clone git@github.com:One-boy/blog-builder.git`
- `npm install`
- `npm start`
- 浏览器打开（open）`http://localhost:8000/`即可查看

## 目录介绍

- **markdownFiles**：存放 markdown 博客的文件夹
- **src**：网站构建系统源码
- **gatsby-\*.js**：gatsby 相关配置文件

## 怎么写文章？

- 请在`markdownFiles`文件夹里面命名文件夹或 md 文件

- 执行`npm start`并访问`http://localhost:8000/`可自行开发博客框架系统

- 访问`http://localhost:8000/___graphql`可进入`graphql`查询界面

- 执行`npm run build`可打包，并存放在`public`文件夹下，只需要拷贝该文件夹到 web 服务器，静态网站就成了！

## md 格式化数据解释

每一个 md 文件头部都有一段格式化数据，用来描述标题、时间、标签和分类等信息，如下：

```
---
title: "(11)SVG动画"
date: "2020-08-12 13:50"
tag: "svg,svg动画"
category: "SVG"
---
```

## 其它

写文章只支持`.md`格式

markdown 文章 ui 样式采用`github风格`

markdown 文章内高亮采用`prismjs`

文章支持`本地图片、本地文件和本地音视频`，方便在文章内引入本地资源，打包时也会打入。
