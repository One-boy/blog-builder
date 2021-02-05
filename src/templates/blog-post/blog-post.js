/*
 * @Author: huyu
 * @Date: 2020-06-06 17:05:24
 * @Last Modified by: huyu
 * @Last Modified time: 2020-09-05 16:42:43
 */

// 博客文章详情页展示逻辑
import React, { Component } from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/BlogList"
import Headings from "../../components/Headings/Headings"
import SEO from "../../components/SEO"
import Footer from "../../components/Footer/Footer"
import ToTop from "../../components/ToTop"
import Category from "../../components/Category"
import Layout from "../../components/layout"
import ExtInfo from "../../components/ExtInfo"
import ViewImg from "../../components/ViewImg"
import Like from "../../extComponents/Like"

import style from "./blog-post.module.less"
import "./blog-post.css"
import "./github-markdown.css"
import "./prism-tomorrow.css"

export default class BlogPost extends Component {
  componentDidMount() {
    this._addLinkTarget()
  }

  // 给链接增加target="_blank"属性
  _addLinkTarget() {
    if (this._mdBody) {
      let links1 = this._mdBody.querySelectorAll('a[href^="http"]') // 外链
      let links2 = this._mdBody.querySelectorAll('a[href^="/"]') // 本网站其它链，如/blog/2002
      Array.from(links1)
        .concat(Array.from(links2))
        .forEach(l => l.setAttribute("target", "_blank"))
    }
  }

  render() {
    const {
      pageContext: { categoryEdges },
    } = this.props
    const { markdownRemark, allMarkdownRemark } = this.props.data
    const { edges: relateEdges } = allMarkdownRemark
    const {
      frontmatter: { title, date, tag },
      headings,
      html,
      excerpt,
    } = markdownRemark
    const Left = <Category edges={categoryEdges} />

    const Right = <Headings headings={headings} />
    return (
      <React.Fragment>
        <SEO title={title} keywords={tag} description={excerpt} />
        <Layout>
          <Layout.Header left={Left} right={Right}>
            {title}
          </Layout.Header>
          <Layout.Left>{Left}</Layout.Left>
          <Layout.Content>
            <article className={style.article}>
              <h1>{title}</h1>
              <div
                ref={node => (this._mdBody = node)}
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <ViewImg />
              <ExtInfo tag={tag} date={date} />
            </article>
            <section className={style.btns}>
              <Like />
            </section>
            {relateEdges.length > 0 && (
              <section className={style.relation}>
                <h3>相关文章</h3>
                <BlogList>
                  {relateEdges.map(d => (
                    <BlogList.Item key={d.node.id} data={d.node} />
                  ))}
                </BlogList>
              </section>
            )}
          </Layout.Content>
          <Layout.Right>{Right}</Layout.Right>
        </Layout>
        <Footer />
        <ToTop />
      </React.Fragment>
    )
  }
}

export const query = graphql`
  query($slug: String!, $tag: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tag
      }
      headings {
        id
        value
        depth
      }
      excerpt(format: PLAIN, pruneLength: 100, truncate: true)
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { tag: { regex: $tag } }
        fields: { slug: { ne: $slug } }
      }
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            tag
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
