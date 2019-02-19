const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const normalizeNewline = require('normalize-newline')
const jsYaml = require('js-yaml')
const remark = require('remark')
const remarkRecommended = require('remark-preset-lint-recommended')
const remarkHtml = require('remark-html')
const remarkReport = require('vfile-reporter')

const SLIDEREG = /\n?---\n/

exports.onCreateNode = async ({ node, getNode, actions, loadNodeContent, createContentDigest, createNodeId }) => {
  const { createNode, createParentChildLink, createNodeField } = actions

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

  // Slide Markdown files
  if (node.extension === 'smd') {
    const raw = await loadNodeContent(node)
    const processor = remark().use(remarkRecommended).use(remarkHtml)

    let [metadata, abstract, ...rawSlides] = normalizeNewline(raw).split(SLIDEREG).slice(1)
    metadata = jsYaml.load(metadata)

    const generate = async item => {
      return new Promise((resolve, reject) => {
        processor.process(item, async (err, file) => {
          if (err) {
            const message = remarkReport(err)
            console.error(message)
            reject(message)
          }

          resolve({
            markdown: item,
            html: String(file)
          })
        })
      });
    }

    const slides = await Promise.all(rawSlides.map(generate))

    console.log('\n\n????\n');
    console.log(slides);
    processor.process(abstract, (err, file) => {
      err && console.error(remarkReport(err))
      abstract = String(file)
    })

    const data = {
      metadata,
      abstract,
      slides,
      slug: '/talks' + createFilePath({ node, getNode, basePath: 'talks' }),
      filename: node.name
    }
    const smdNode = {
      ...data,
      id: metadata.id ? metadata.id : createNodeId(`${node.id} >>> SMD`),
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(data),
        type: 'SlidesMarkdown'
      }
    }
    createNode(smdNode)
    createParentChildLink({ parent: node, child: smdNode })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const typeToTemplate = {
    project: './src/templates/project-detail.js',
    blog: './src/templates/blog-post.js',
  }
  await new Promise((resolve, reject) => {
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
      })
      resolve()
    })
  })
  await new Promise((resolve, reject) => {
    graphql(`
      {
        allSlidesMarkdown {
          edges {
            node {
              slug
              filename
            }
          }
        }
      }
    `).then(result => {
      result.data.allSlidesMarkdown.edges.forEach(({ node }) => {
        console.log('hrmm', node.filename, `/static\\/slides\\/${node.filename}$/`)
        createPage({
          path: node.slug,
          component: path.resolve('./src/templates/talk.js'),
          context: {
            slug: node.slug,
            slides: `/static\/slides\/${node.filename}$/`
          }
        })
      })
      resolve()
    })
  })
}
