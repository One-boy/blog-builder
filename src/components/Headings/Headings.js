/*
 * @Author: huyu
 * @Date: 2020-06-16 16:10:04
 * @Last Modified by: huyu
 * @Last Modified time: 2020-08-03 09:44:46
 */

// 文章章节列表

import React, { Component } from "react"
import { throttle } from "../../utils"
import style from "./Headings.module.less"

export default class Headings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 激活的标题id
      activeHeadingId: "",
    }
    // 所有标题距离顶部的距离
    this._headingTops = []
    // 节流函数
    this._throttleScrollFunc = throttle(this._onScroll, 100)
  }

  componentDidMount() {
    this._init()
  }

  componentWillUnmount() {
    clearTimeout(this._tid)
    this._removeListenScroll()
  }

  // 监听滚动
  _listenScroll() {
    this._removeListenScroll()
    window.addEventListener("scroll", this._throttleScrollFunc)
  }

  //取消监听滚动
  _removeListenScroll() {
    window.removeEventListener("scroll", this._throttleScrollFunc)
  }

  // 初始化操作
  _init() {
    const { headings = [] } = this.props
    // 获取所有标题的offsetTop
    headings.forEach(h => {
      let headDom = document.getElementById(`${h.id}`)
      if (headDom instanceof HTMLHeadingElement) {
        this._headingTops.push({
          id: h.id,
          top: headDom.offsetTop,
        })
      }
    })
    this._headingTops = this._headingTops.sort((a, b) => a.top - b.top)
    this._listenScroll()
  }

  // 滚动回调
  _onScroll = () => {
    // 在微信和钉钉内置内打开时，只有使用document.getElementsByTagName("body")[0].scrollTop才能获取到有效的scrollTop值
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.getElementsByTagName("body")[0].scrollTop
    )
    let len = this._headingTops.length
    for (let i = 0; i < len; i++) {
      let h = this._headingTops[i]
      if (h.top >= scrollTop) {
        this.setState({ activeHeadingId: h.id })
        let head = document.querySelectorAll(`a[title="${h.id}"]`)
        if (head) {
          Array.from(head).forEach(h => {
            h.scrollIntoView({ behavior: "smooth" })
          })
        }
        break
      }
    }
  }

  // 点击标题，内容区滚动到对应标题处
  onClick = (e, h) => {
    e && e.preventDefault()
    if (this.tid) {
      clearTimeout(this.tid)
    }
    this._removeListenScroll()
    document.getElementById(h.id).scrollIntoView({ behavior: "smooth" })
    // document.location.hash = `#${h.id}` // 同时使用两种方式有bug
    this.setState({ activeHeadingId: h.id })
    this.tid = setTimeout(() => {
      this._listenScroll() // 这里等待scrollIntoView执行完毕
    }, 1000)
  }

  render() {
    const { headings = [] } = this.props
    if (headings.length === 0) {
      return null
    }
    const { activeHeadingId } = this.state
    const minDepth = Math.min(...headings.map(h => h.depth))
    return (
      <aside className={style.main}>
        <h3>本文章节</h3>
        <ul className={style.ul}>
          {headings.map(h => (
            <li
              key={h.id}
              className={`${activeHeadingId === h.id ? style.liactive : ""}`}
            >
              <a
                className={`${style["heading" + [h.depth - minDepth]]}
                 ${activeHeadingId === h.id ? style.active : ""}
                `}
                href={`#${h.id}`}
                onClick={e => this.onClick(e, h)}
                title={h.value}
              >
                {h.value}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    )
  }
}
