const { createFilePath } = require('gatsby-source-filesystem')
const normalizeNewline = require('normalize-newline')
const jsYaml = require('js-yaml')
const remark = require('remark')
const remarkRecommended = require('remark-preset-lint-recommended')
const remarkHtml = require('remark-html')
const remarkReport = require('vfile-reporter')
const prism = require('gatsby-remark-prismjs')
const toHAST = require(`mdast-util-to-hast`)
const hastToHTML = require(`hast-util-to-html`)

const SLIDEREG = /\n?---\n/

module.exports = async ({
  node,
  getNode,
  actions,
  loadNodeContent,
  createContentDigest,
  createNodeId
}) => {
  if (node.extension !== 'smd') return;

  console.log(`--- generating slides for ${node.name}`)
  // Turn an HTML AST into HTML
  async function getHTML(source) {
    const ast = await getHTMLAst(source)
    return hastToHTML(ast, { allowDangerousHTML: true })
  }

  // Turn Markdown into an HTML AST
  async function getHTMLAst(source) {
    // Use Remark to create a Markdown AST
    const ast = remark.parse(source)

    // Mutate the AST, transforming code blocks into prism syntax-highlighted code blocks
    await prism({
      markdownAST: ast,
    }, { classPrefix: 'language-' })

    // Convert the Markdown AST into an HTML AST
    return toHAST(ast, { allowDangerousHTML: true })
  }

const { createNode, createParentChildLink } = actions
  const raw = await loadNodeContent(node)
  const processor = remark().use(remarkRecommended).use(remarkHtml)

  let [metadata, abstract, ...rawSlides] = normalizeNewline(raw).split(SLIDEREG).slice(1)
  metadata = jsYaml.load(metadata)

  const generate = async markdown => {
    return new Promise(async (resolve, reject) => {
      const html = await getHTML(markdown)
      resolve({
        html,
        markdown
      })
    });
  }

  const slides = await Promise.all(rawSlides.map(generate))

  abstract = await new Promise(resolve => {
    processor.process(abstract, (err, file) => {
      err && console.error(remarkReport(err))
      resolve(String(file))
    })
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

  console.log(`--- generated slides for ${node.name}`)

  createNode(smdNode)
  createParentChildLink({ parent: node, child: smdNode })
}
