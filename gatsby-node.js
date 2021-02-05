/*
 * @Author: huyu
 * @Date: 2020-06-06 16:57:00
 * @Last Modified by: huyu
 * @Last Modified time: 2020-07-15 15:51:34
 */
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
const { categoryArray } = require("./src/config/category")

// 创建节点
exports.onCreateNode = ({ node, getNode, actions }) => {
  // 只筛选markdown节点
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// 创建页面时调用
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tag
              category
            }
          }
        }
      }
    }
  `)

  // 创建文章内容页面
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    ///(面试题|nginx)/gi
    let tagRegStr = node.frontmatter.tag.split(",").join("|")
    createPage({
      path: node.fields.slug, // 该文章的路径,gatsby为该path（uri）生成对应页面
      component: path.resolve(`./src/templates/blog-post/blog-post.js`), // 文章使用的模板
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        tag: `/(${tagRegStr})/gi`, // 传入文章tag正则
        categoryEdges: result.data.allMarkdownRemark.edges, // 供分类组件使用
      },
    })
  })

  // 创建分类页面
  categoryArray.forEach(([name, key]) => {
    createPage({
      path: `/blog/category/${key}`,
      component: path.resolve(`./src/templates/category-post/category-post.js`), // 文章使用的模板
      context: {
        categoryName: name, // 传入组件中，作为graphql的查询参数
        categoryEdges: result.data.allMarkdownRemark.edges, // 供分类组件使用
      },
    })
  })
}

// 创建webpack配置时调用
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // if (stage === "build-javascript") {
  actions.setWebpackConfig({
    mode: "production",
    devtool: "none",
  })
  // }
}
