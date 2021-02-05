/*
 * @Author: huyu
 * @Date: 2020-07-15 16:57:30
 * @Last Modified by: huyu
 * @Last Modified time: 2020-09-05 17:05:09
 */

// 列表页组件

import React from "react"
import BlogList from "../BlogList"
import Footer from "../Footer/Footer"
import SEO from "../SEO"
import Category from "../Category"
import Layout from "../layout"

import style from "./index.module.less"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 搜索关键字
      keyword: "",
    }
  }

  // 搜索框值变化
  onChangeInput = e => {
    this.setState({ keyword: e.target.value })
  }

  // 清空搜索
  onClickClear = () => {
    this.setState({ keyword: "" })
  }

  // 点击搜索
  onClickSearch = () => {
    let searchEngine = "https://www.baidu.com/s?wd="
    let filterStr = `site:nuobel.com`
    let url = `${searchEngine}${encodeURIComponent(
      this.state.keyword
    )} ${filterStr}`
    window.open(url)
  }

  render() {
    const { keyword } = this.state
    const {
      data: { allMarkdownRemark = { edges: [] } },
      categoryEdges = [],
      categoryName = "文章列表",
    } = this.props
    let filterEdges = allMarkdownRemark.edges
    const Left = <Category edges={categoryEdges} />
    return (
      <React.Fragment>
        <SEO title={categoryName} />
        <Layout>
          <Layout.Header left={Left}>{categoryName}</Layout.Header>
          <Layout.Left>{Left}</Layout.Left>
          <Layout.Content>
            <p className={style.searchBar}>
              <span className={style.searchInput}>
                <input
                  placeholder="请输入关键字"
                  value={keyword}
                  onChange={this.onChangeInput}
                  maxLength={26}
                />
                {keyword.length > 0 && (
                  <button
                    title="清空搜索"
                    className={style.clear}
                    onClick={this.onClickClear}
                  >
                    +
                  </button>
                )}
                <button
                  title="点击搜索"
                  className={style.search}
                  onClick={this.onClickSearch}
                >
                  搜索
                </button>
              </span>
              <span className={style.ext}>
                共{filterEdges.length || 0}篇文章
              </span>
            </p>
            <BlogList>
              {filterEdges.map(d => (
                <BlogList.Item
                  key={d.node.id}
                  data={d.node}
                  keyword={keyword}
                />
              ))}
            </BlogList>
          </Layout.Content>
          <Layout.Right />
        </Layout>
        <Footer />
      </React.Fragment>
    )
  }
}
