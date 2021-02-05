/*
 * @Author: huyu
 * @Date: 2020-06-06 11:35:46
 * @Last Modified by: huyu
 * @Last Modified time: 2021-01-15 23:56:16
 */

// 底部组件

import React, { Component } from "react"
import { Link } from "gatsby"
import style from "./Footer.module.less"

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <footer className={style.main}>
        <ul className={style.ext}>
          <li>
            <Link to="/about" className="normal-link">
              关于我
            </Link>
          </li>
          <li>
            <a
              href="https://www.gatsbyjs.org/"
              target="_blank"
              rel="noreferrer"
              className="normal-link"
            >
              Powered By Gatsby
            </a>
          </li>
          <li>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="normal-link"
            >
              蜀ICP备17009814号-1
            </a>
          </li>
        </ul>
      </footer>
    )
  }
}
