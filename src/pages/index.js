/*
 * @Author: huyu
 * @Date: 2020-06-06 10:59:32
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-26 23:19:59
 */

// 网站首页文件

import React from "react"
import { Link } from "gatsby"
import SEO from "../components/SEO"
import "../theme/global.less"
import style from "./index.module.less"
import Footer from "../components/Footer/Footer"

export default function Home() {
  return (
    <div className={style.main}>
      <SEO />
      <div className={style.body}>
        <h1>我的人生旅途</h1>
        <div className={style.content}>
          <ul className={style.list}>
            <li>
              <Link to="blog" className="normal-link">
                旅途日记
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
      <div className={style.background}>
        <p className={style.bgtitle}>我们的征途是星辰大海！</p>
      </div>
    </div>
  )
}
