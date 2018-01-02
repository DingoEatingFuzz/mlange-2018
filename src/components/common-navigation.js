import React from 'react'
import Link from 'gatsby-link'

const CommonNavigation = () => (
  <nav>
    <ol>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/writing">Writing</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/talks">Talks</Link></li>
      <li><Link to="/archive">Archive</Link></li>
    </ol>
  </nav>
)

export default CommonNavigation