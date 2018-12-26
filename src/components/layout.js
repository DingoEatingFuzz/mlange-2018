import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'normalize.css'
import './layout.scss'

require('prismjs/themes/prism.css')

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      titleTemplate="%s &middot; Michael Lange"
      defaultTitle="Michael Lange"
      meta={[
        { name: 'description', content: 'Michael Lange, maker of things' },
        {
          name: 'keywords',
          content:
            'developer, designer, maker, things, javascript, algorithmic art, projects, portfolio',
        },
      ]}
    />
    {children}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default TemplateWrapper
