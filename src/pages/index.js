import React from 'react'
import CommonNavigation from '../components/common-navigation'

import Layout from '../components/layout'
import './index.scss'
import VisualizationContainer from '../components/visualization-container';

const IndexPage = () => (
  <Layout>
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
