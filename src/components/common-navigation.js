import React from 'react'
import Link from 'gatsby-link'

const CommonNavigation = ({ children }) => (
  <nav>
    <ol>
      <li>
        <Link to="/projects" activeClassName="active">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/writing" activeClassName="active">
          Writing
        </Link>
      </li>
      <li>
        <Link to="/blog" activeClassName="active">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/talks" activeClassName="active">
          Talks
        </Link>
      </li>
    </ol>
    {children}
  </nav>
)

export default CommonNavigation
