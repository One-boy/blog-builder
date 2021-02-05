/*
 * @Author: huyu
 * @Date: 2020-06-06 15:53:52
 * @Last Modified by: huyu
 * @Last Modified time: 2020-06-06 16:03:23
 */

// 博客列表组件
import React, { Component } from "react"
import Item from "./item"
import style from "./index.module.less"

export default class BlogList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <ul className={style.main}>{this.props.children}</ul>
  }
}

BlogList.Item = Item
