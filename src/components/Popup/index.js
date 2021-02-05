/*
 * @Author: huyu
 * @Date: 2020-07-15 18:33:04
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-17 16:41:43
 */

// 弹窗窗口，抽屉
import React, { useState, useEffect } from "react"
import style from "./index.module.less"

function Popup(props) {
  const { dir, onClose } = props
  const [closing, setClosing] = useState(false)
  const [opening, setOpening] = useState(false)
  useEffect(() => {
    if (!opening) {
      setOpening(true)
    }
  }, [opening])
  return (
    <div
      className={`${style.main} ${closing ? style.closing : ""} ${
        opening ? style.opening : ""
      }`}
      onClick={() => {
        setClosing(true)
        setTimeout(() => onClose(), 250)
      }}
    >
      <div className={`${style.content} ${style[dir]}`}>{props.children}</div>
    </div>
  )
}

export default Popup
