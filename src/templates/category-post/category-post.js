/*
 * @Author: huyu
 * @Date: 2020-06-06 17:05:24
 * @Last Modified by: huyu
 * @Last Modified time: 2020-09-05 16:43:25
 */

// 分类页面

import React from "react"
import { graphql } from "gatsby"
import ListPage from "../../components/ListPage"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, pageContext } = this.props
    return (
      <ListPage
        data={data}
        categoryEdges={pageContext.categoryEdges}
        categoryName={pageContext.categoryName}
      />
    )
  }
}

export const query = graphql`
  query($categoryName: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $categoryName } } }
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
