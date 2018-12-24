const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const [,sourceDirectory] = node.fileAbsolutePath.split('/').reverse();

    let slug, type, id;

    switch (sourceDirectory) {
      case 'projects':
        id = createFilePath({ node, getNode, basePath: 'projects' });
        slug = '/project' + id
        type = 'project'
        break;
      case 'posts':
        id = createFilePath({ node, getNode, basePath: 'posts' });
        slug = '/blog' + id
        type = 'blog'
        break;
    }

    boundActionCreators.createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    boundActionCreators.createNodeField({
      node,
      name: 'type',
      value: type
    })

    boundActionCreators.createNodeField({
      node,
      name: 'id',
      value: id.replace(/^.(.+).$/, '$1')
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const typeToTemplate = {
    project: './src/templates/project-detail.js',
    blog: './src/templates/blog-post.js',
  }
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                type
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(typeToTemplate[node.fields.type]),
          context: {
            slug: node.fields.slug,
            id: node.fields.id,
          },
        })
        resolve()
      })
    })
  })
}
