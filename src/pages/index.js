import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import CommonNavigation from '../components/common-navigation'

import Layout from '../components/layout'
import VisualizationContainer from '../components/visualization-container'

import './index.scss'
import thumbnail from '../posts/thumbnails/default.png'

const IndexPage = ({ data }) => (
  <Layout>
    <Helmet>
      <title>Maker of Things</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="Michael Lange" />
      <meta name="twitter:title" content="Michael Lange" />
      <meta name="twitter:description" content="Maker of Things" />
      <meta name="twitter:image" content={'https://' + data.site.siteMetadata.host + thumbnail} />

      <meta property="og:title" content="Michael Lange" />
      <meta property="og:site_name" content="Michael Lange" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={'https://' + data.site.siteMetadata.host + thumbnail} />
    </Helmet>
    <div className="home-page">
      <section>
        <VisualizationContainer />
        <div className="label">
          <h1>Michael Lange</h1>
          <p>Maker of things</p>
        </div>
      </section>
      <CommonNavigation>
        <footer>
          <ul>
            <li><a href="https://twitter.com/DingoEatingFuzz" target="_blank" rel="noopenner noreferrer">Twitter</a></li>
            <li><a href="https://github.com/DingoEatingFuzz" target="_blank" rel="noopenner noreferrer">Github</a></li>
          </ul>
        </footer>
      </CommonNavigation>
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        host
      }
    }
  }
`;
