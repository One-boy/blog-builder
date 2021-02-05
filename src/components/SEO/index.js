/*
 * @Author: huyu
 * @Date: 2020-06-06 19:56:20
 * @Last Modified by: hy
 * @Last Modified time: 2020-08-03 22:09:54
 */

// seo相关，meta相关
import React, { Component } from "react"
import { Helmet } from "react-helmet"

export default class SEO extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let {
      title = "诺贝尔的源泉",
      description = "分享记录软件开发技术文章博客，在这里可以获取到作者分享的前端开发、后端开发、技术前沿知识以及生活随笔。",
      keywords = "技术文章,技术博客,开发笔记,前端开发,web开发,软件开发,html5,css3,javascript,es6,es2015",
    } = this.props
    if (title !== "诺贝尔的源泉") {
      title = `${title}--诺贝尔的源泉`
    }
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Language" content="zh-CN" />
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
      </Helmet>
    )
  }
}
