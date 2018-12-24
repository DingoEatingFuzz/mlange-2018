import React from 'react'

import './markdown-article.scss'

export default ({ content = "", children }) => (
  <div className="markdown-article">
    {children}
    <article dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)
