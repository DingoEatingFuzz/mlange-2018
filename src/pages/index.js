import React from 'react'
import Link from 'gatsby-link'

import './index.scss';

const IndexPage = () => (
  <div className="layout">
    <section>
      <div className="label">
        <h1>Michael Lange</h1>
        <p>Maker of things</p>
      </div>
    </section>
    <nav>
      <ol>
        <li><Link to="/writing">Projects</Link></li>
        <li><Link to="/writing">Writing</Link></li>
        <li><Link to="/writing">Long Form</Link></li>
        <li><Link to="/writing">Talks</Link></li>
        <li><Link to="/writing">Archive</Link></li>
      </ol>
    </nav>
  </div>
)

export default IndexPage
