/*
 * @Author: huyu
 * @Date: 2020-07-16 16:18:02
 * @Last Modified by: huyu
 * @Last Modified time: 2020-10-25 18:07:41
 */

// 页面浏览量相关组件

import React, { Component } from "react"
import AJAX from "../utils/ajax"
import { pageViewAdd, pageViewQuery } from "../config/api"

export default class PageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 浏览量
      num: 0,
    }
  }

  componentDidMount() {
    this._init()
  }

  // 初始化
  _init() {
    this._getPageViewNum()
    if (this._checkPageViewStatus()) {
      this._requestPageViewAdd()
      // 更新本地记录
      this._refreshLocalPageView()
    }
  }

  // 检查页面浏览状态
  // 决定是否发起浏览量请求
  _checkPageViewStatus() {
    let pageViewObj = this._getLocalPageView()
    let pathname = window.location.pathname
    let date = new Date()
    let dateStr = `${date.getMonth() + 1}${date.getDate()}`

    // 日期不和今天相同，是一个有效浏览量
    if (pageViewObj[pathname] && pageViewObj[pathname].dateStr !== dateStr) {
      return true
    }
    // 没有本地记录，是一个有效浏览量
    if (!pageViewObj[pathname]) {
      return true
    }
    return false
  }

  // 刷新本地浏览记录
  _refreshLocalPageView() {
    let pathname = window.location.pathname
    let pageViewObj = this._getLocalPageView()
    let date = new Date()
    let dateStr = `${date.getMonth() + 1}${date.getDate()}`
    if (!pageViewObj[pathname]) {
      pageViewObj[pathname] = {}
    }
    pageViewObj[pathname].dateStr = dateStr
    localStorage.setItem("pageView", JSON.stringify(pageViewObj))
  }

  // 获取本地浏览记录
  _getLocalPageView() {
    let pageView = localStorage.getItem("pageView")
    if (pageView) {
      try {
        return JSON.parse(pageView)
      } catch (error) {
        return {}
      }
    }
    return {}
  }

  // 获取浏览量
  _getPageViewNum() {
    AJAX(
      "GET",
      `${pageViewQuery}?pn=${encodeURIComponent(window.location.pathname)}`,
      "",
      resp => {
        this.setState({ num: isNaN(Number(resp))?0:Number(resp) })
      },
      errMsg => {
        console.error(errMsg)
      }
    )
  }
  // 发起浏览量请求
  _requestPageViewAdd() {
    AJAX(
      "POST",
      pageViewAdd,
      { pn: window.location.pathname },
      resp => {
        console.log(resp)
      },
      errMsg => {
        console.error(errMsg)
      }
    )
  }

  render() {
    return <span>{this.state.num}</span>
  }
}
