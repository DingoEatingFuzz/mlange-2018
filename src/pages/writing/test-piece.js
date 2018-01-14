import React from 'react'
import Helmet from 'react-helmet'
import CommonNavigation from '../../components/common-navigation'
import Link from 'gatsby-link'

import '../projects.scss'

const TestPiece = () => (
  <div className="projects-page">
    <Helmet title="This is a test piece" description="A test piece for the longer form of writing"/>

    <header>
      <Link to="/">Michael Lange</Link>
      <CommonNavigation/>
    </header>

    <section>
      Hey, you made it! Well look at that.
      <Link to="/writing">Back</Link>
    </section>
  </div>
)

export default TestPiece