import React from 'react'
import Link from 'gatsby-link'

import './narrow-header.scss'

export default ({ noun, link = "/" }) => (
  <header className="narrow-header">
    <section className="narrow-header-inside">
      <Link to="/">Michael Lange</Link>
      <Link to={link}>All {noun} →</Link>
    </section>
  </header>
)
