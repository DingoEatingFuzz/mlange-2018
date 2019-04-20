const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Michael Lange`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            classPrefix: 'language-',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth:1200,
              linkImagesToOriginal: true,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    'gatsby-transformer-toml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: path.join(__dirname, 'src'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'static', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'slides',
        path: path.join(__dirname, 'static', 'slides'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-twitter'
  ],
}
