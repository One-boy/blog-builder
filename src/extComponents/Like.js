/*
 * @Author: huyu
 * @Date: 2020-07-16 16:18:02
 * @Last Modified by: huyu
 * @Last Modified time: 2020-10-25 18:09:15
 */

// 点赞量相关组件

import React, { Component } from "react"
import AJAX from "../utils/ajax"
import { likeAdd, likeQuery } from "../config/api"

export default class Like extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 量
      num: 0,
    }
  }

  componentDidMount() {
    this._init()
  }

  // 初始化
  _init() {
    this._getLikeNum()
  }

  // 检查点赞状态
  // 决定是否发起请求
  _checkLikeStatus() {
    let LikeObj = this._getLocalLike()
    let pathname = window.location.pathname

    // 已经点赞
    if (LikeObj.indexOf(pathname) !== -1) {
      return false
    }
    return true
  }

  // 刷新本地浏览记录
  _refreshLocalLike() {
    let pathname = window.location.pathname
    let LikeObj = this._getLocalLike()

    if (LikeObj.indexOf(pathname) === -1) {
      LikeObj.push(pathname)
    }
    localStorage.setItem("Like", JSON.stringify(LikeObj))
  }

  // 获取本地浏览记录
  _getLocalLike() {
    let Like = localStorage.getItem("Like")
    if (Like) {
      try {
        return JSON.parse(Like)
      } catch (error) {
        return []
      }
    }
    return []
  }

  // 获取点赞量
  _getLikeNum() {
    AJAX(
      "GET",
      `${likeQuery}?pn=${encodeURIComponent(window.location.pathname)}`,
      "",
      resp => {
        this.setState({ num: isNaN(Number(resp))?0:Number(resp) })
      },
      errMsg => {
        console.error(errMsg)
      }
    )
  }

  // 发起请求
  _requestLikeAdd() {
    AJAX(
      "POST",
      likeAdd,
      { pn: window.location.pathname },
      resp => {
        if (resp === "1") {
          this.setState(pre => ({ num: parseInt(pre.num, 10) + 1 }))
        }
      },
      errMsg => {
        console.error(errMsg)
      }
    )
  }

  // 点赞
  onClick = () => {
    if (this._checkLikeStatus()) {
      this._requestLikeAdd()
      // 更新本地记录
      this._refreshLocalLike()
    }
  }

  render() {
    return <span onClick={this.onClick}>点赞({this.state.num})</span>
  }
}
