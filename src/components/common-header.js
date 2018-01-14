import React from 'react'
import Link from 'gatsby-link'
import CommonNavigation from './common-navigation'

import './common-header.scss'

export default () => (
  <header className="common-header">
    <Link to="/">Michael Lange</Link>
    <CommonNavigation/>
  </header>
)