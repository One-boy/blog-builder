/*
 * @Author: huyu
 * @Date: 2020-06-16 12:06:32
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-21 15:15:06
 */

// 回到顶部组件

import React, { useEffect, useState } from "react"
import style from "./index.module.less"

function scrollTo() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function ToTop() {
  const [showTop, setTopStatus] = useState(false)
  function _onScroll() {
    // 在微信和钉钉内置内打开时，只有使用document.getElementsByTagName("body")[0].scrollTop才能获取到有效的scrollTop值
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.getElementsByTagName("body")[0].scrollTop
    )
    if (scrollTop > window.innerHeight && !showTop) {
      setTopStatus(true)
    } else if (scrollTop < window.innerHeight && showTop) {
      setTopStatus(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", _onScroll)
    return () => {
      window.removeEventListener("scroll", _onScroll)
    }
  }, [showTop])
  if (!showTop) return null
  return (
    <button title="回到顶部" className={style.top} onClick={scrollTo}>
      top
    </button>
  )
}

export default ToTop
