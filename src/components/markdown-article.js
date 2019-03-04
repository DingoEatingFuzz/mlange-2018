import React from 'react'

import './markdown-article.scss'

export default ({ content = '', className = '', children }) => (
  <div className={`markdown-article ${className}`}>
    {children}
    <article dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)
