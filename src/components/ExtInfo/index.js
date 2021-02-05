/*
 * @Author: huyu
 * @Date: 2020-07-17 16:11:39
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-28 14:07:31
 */

// 文章扩展信息组件

import React, { useState, useEffect } from "react"
import PageView from "../../extComponents/PageView"
import style from "./index.module.less"

function ExtInfo(props) {
  const { tag, date } = props
  const [href, setHref] = useState("")
  useEffect(() => {
    setHref(document.location.href)
  }, [])
  return (
    <div className={style.ext}>
      <p>
        <span>
          访问量：
          <PageView />
        </span>
      </p>
      <p>
        <span>文章标签：{tag ? tag.split(",").join("、") : "暂无"}</span>
        <span>发布时间：{date}</span>
      </p>
      <p>
        <span>版权声明：转载请附上原文出处链接。</span>
      </p>
      <p>
        <span>
          本文链接：
          <a target="_blank" href={href} rel="noreferrer">
            {href}
          </a>
        </span>
      </p>
    </div>
  )
}

export default ExtInfo
