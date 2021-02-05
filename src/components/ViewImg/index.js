/*
 * @Author: huyu
 * @Date: 2020-07-17 18:25:59
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-18 00:12:54
 */

// 查看图片组件

import { Component } from "react"
import "./index.less"

export default class ViewImg extends Component {
  componentDidMount() {
    this._init()
  }

  // 初始化
  _init() {
    this._initImgViewer()
  }

  // 图片查看器初始化
  _initImgViewer() {
    let bodyDom = document.getElementsByClassName("markdown-body")[0]
    if (bodyDom instanceof HTMLElement) {
      let imgs = bodyDom.getElementsByTagName("img")
      Array.from(imgs).forEach(img => {
        if (img) {
          img.onclick = this._viewImg
        }
      })
    }
  }

  // 查看图片
  _viewImg = e => {
    if (e.target instanceof HTMLImageElement) {
      let cloneELe = e.target.cloneNode(false)
      let wrapper = document.createElement("div")
      wrapper.appendChild(cloneELe)
      wrapper.classList.add("viewImg")
      wrapper.onclick = e => {
        document.body.removeChild(wrapper)
        document.body.classList.toggle("viewImgBody")
      }
      document.body.classList.toggle("viewImgBody")
      document.body.appendChild(wrapper)
    }
  }

  render() {
    return null
  }
}
