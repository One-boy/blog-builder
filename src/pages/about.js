/*
 * @Author: huyu
 * @Date: 2020-06-06 10:59:32
 * @Last Modified by: huyu
 * @Last Modified time: 2021-01-17 18:39:39
 */

// 关于我

import React from "react"
import style from "./about.module.less"
import wechat from "../resource/images/wechat2.png"

export default function Home() {
  return (
    <ul className={style.main}>
      <li>
        <p>
          <span>职业/Profession：</span>
          <span>前端工程师</span>
        </p>
      </li>
      <li>
        <p>
          <span>邮箱/Email：</span>
          <a href="mailto:hello_linux@163.com">hello_linux@163.com</a>
        </p>
      </li>
      <li>
        <p>
          <span>微信公众号/Wechat：</span>
          <img src={wechat} alt="微信号：fe-all-rounder" />
        </p>
      </li>
    </ul>
  )
}
