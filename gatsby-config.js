const path = require("path");

module.exports = {
  siteMetadata: {
    title: `Michael Lange`,
    host: process.env.GATSBY_HOST || "localhost:8000"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("sass")
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: true,
              wrapperStyle: () => "margin-left:-10%;", // Pretty gross, but there's no way to remove the existing inline styles
              quality: 100
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: true,
              wrapperStyle: () => "margin-left:-10%;", // Pretty gross, but there's no way to remove the existing inline styles
              quality: 100
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files"
          }
        ]
      }
    },
    "gatsby-transformer-toml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: path.join(__dirname, "src")
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "static", "images")
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "slides",
        path: path.join(__dirname, "static", "slides")
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-twitter"
  ]
};
