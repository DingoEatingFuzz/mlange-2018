const path = require("path");
const slidesTransformer = require("./transformers/slides-md");
const markdownAugmentationsTransformer = require("./transformers/markdown");
const mdxAugmentationsTransformer = require("./transformers/mdx");

const typeToTemplate = {
  project: "./src/templates/project-detail.js",
  blog: "./src/templates/blog-post.js"
};

exports.onCreateNode = async args => {
  await markdownAugmentationsTransformer(args);
  await mdxAugmentationsTransformer(args);
  await slidesTransformer(args);
};

exports.createPages = async ({ graphql, actions }) => {
  // await Promise.all([ mdPages, talkPages ].map(f => f(graphql, actions)))

  await mdPages(graphql, actions);
  await mdxPages(graphql, actions);
  await talkPages(graphql, actions);
};

function talkPages(graphql, { createPage }) {
  return new Promise((resolve, reject) => {
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
    `)
      .then(result => {
        result.data.allSlidesMarkdown.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve("./src/templates/talk.js"),
            context: {
              slug: node.slug,
              slides: `/static\/slides\/${node.filename}$/`
            }
          });
        });
        resolve();
      })
      .catch(reject);
  });
}

function mdPages(graphql, { createPage }) {
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
    `)
      .then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(typeToTemplate[node.fields.type]),
            context: {
              slug: node.fields.slug,
              id: node.fields.id
            }
          });
        });
        resolve();
      })
      .catch(reject);
  });
}

function mdxPages(graphql, { createPage }) {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx {
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
    `)
      .then(result => {
        result.data.allMdx.edges.forEach(({ node }) => {
          if (typeToTemplate[node.fields.type]) {
            createPage({
              path: node.fields.slug,
              component: path.resolve(typeToTemplate[node.fields.type]),
              context: {
                slug: node.fields.slug,
                id: node.fields.id
              }
            });
          }
        });
        resolve();
      })
      .catch(reject);
  });
}
