/*
 * @Author: huyu
 * @Date: 2020-06-06 15:53:52
 * @Last Modified by: huyu
 * @Last Modified time: 2020-09-05 16:33:34
 */

// 数据项组件

import React, { Component } from "react"
import { Link } from "gatsby"
import style from "./item.module.less"

export default class BlogListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { data, keyword } = this.props
    const {
      frontmatter: { title, date, tag },
      fields,
    } = data
    return (
      <li className={style.main}>
        <Link className={style.anchor} to={fields.slug} />
        <h2>
          <KeywordHandler content={title} keyword={keyword} />
        </h2>
        <p className={style.ext}>
          <span>
            文章标签：
            {tag
              ? tag.split(",").map(d => (
                  <span key={d} className={style.tag}>
                    <KeywordHandler content={d} keyword={keyword} />
                  </span>
                ))
              : "暂无"}
          </span>
          <span>发布时间：{date}</span>
        </p>
      </li>
    )
  }
}

// 关键字处理
function KeywordHandler(props) {
  const { content = "", keyword = "" } = props
  let preStr = content
  let hightlightStr = ""
  let sufStr = ""
  if (keyword) {
    let index = content.indexOf(keyword)
    if (index !== -1) {
      preStr = content.substring(0, index)
      hightlightStr = keyword
      sufStr = content.substr(index + keyword.length)
    }
  }
  return (
    <React.Fragment>
      {preStr}
      {hightlightStr && (
        <span className={style.hightlight}>{hightlightStr}</span>
      )}
      {sufStr}
    </React.Fragment>
  )
}
