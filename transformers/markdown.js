const { createFilePath } = require('gatsby-source-filesystem')

module.exports = async ({
  node,
  getNode,
  actions
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
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

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    createNodeField({
      node,
      name: 'type',
      value: type
    })

    createNodeField({
      node,
      name: 'id',
      value: id.replace(/^.(.+).$/, '$1')
    })
  }
}
