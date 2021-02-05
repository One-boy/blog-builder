/*
 * @Author: huyu
 * @Date: 2020-07-15 11:34:00
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-19 12:51:05
 */

// 分类组件

import React, { Component } from "react"
import { Link } from "gatsby"
import { categorySerialization } from "../../utils/index"
import style from "./index.module.less"

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { edges = [] } = this.props
    let data = categorySerialization(edges)
    // 文章数量多的排在前
    data = data.sort((a, b) => b[1].num - a[1].num)
    return (
      <nav className={style.main}>
        <h3>文章分类</h3>
        <ul className={style.ul}>
          <li key="all">
            <Link className={style.anchor} to="/blog">
              <span>全部</span>
              <span>({data.reduce((pre, cur) => pre + cur[1].num, 0)})</span>
            </Link>
          </li>
          {data.map(d => (
            <li key={d[1].key}>
              <Link className={style.anchor} to={`/blog/category/${d[1].key}`}>
                <span title={d[0]}>{d[0]}</span>
                <span>({d[1].num})</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}
