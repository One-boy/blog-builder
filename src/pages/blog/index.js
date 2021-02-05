/*
 * @Author: huyu
 * @Date: 2020-06-06 11:25:34
 * @Last Modified by: huyu
 * @Last Modified time: 2020-09-05 16:43:14
 */

// 博客首页
import React from "react"
import { graphql } from "gatsby"
import ListPage from "../../components/ListPage"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props
    return <ListPage data={data} categoryEdges={data.allMarkdownRemark.edges} />
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            tag
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
