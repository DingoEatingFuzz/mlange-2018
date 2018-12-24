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
        path: `${__dirname}/src/`,
      },
    },
  ],
}
