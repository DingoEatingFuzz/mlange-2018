import React from 'react'
import CommonNavigation from '../components/common-navigation'

import Layout from '../components/layout'
import './index.scss'

const IndexPage = () => (
  <Layout>
    <div className="home-page">
      <section>
        <div className="label">
          <h1>Michael Lange</h1>
          <p>Maker of things</p>
        </div>
      </section>
      <CommonNavigation />
    </div>
  </Layout>
)

export default IndexPage
