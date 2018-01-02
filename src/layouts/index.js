import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import 'normalize.css'
import './index.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Michael Lange"
      meta={[
        { name: 'description', content: 'Michael Lange, maker of things' },
        { name: 'keywords', content: 'developer, designer, maker, things, javascript, algorithmic art, projects, portfolio' },
      ]}
    />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
