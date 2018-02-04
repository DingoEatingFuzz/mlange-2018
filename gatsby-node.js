const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: 'posts' })

    boundActionCreators.createNodeField({
      node,
      name: 'slug',
      value: '/blog' + slug
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: node.fields.slug,
          },
        })
        resolve()
      })
    })
  })
}