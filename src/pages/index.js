import React from 'react'
import CommonNavigation from '../components/common-navigation'

import './index.scss';

const IndexPage = () => (
  <div className="home-page">
    <section>
      <div className="label">
        <h1>Michael Lange</h1>
        <p>Maker of things</p>
      </div>
    </section>
    <CommonNavigation/>
  </div>
)

export default IndexPage
