import React from 'react'
import Helmet from 'react-helmet'

import '../pages/blog.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div className="blog-post">
      <Helmet
        title={post.frontmatter.title}
        description={post.frontmatter.description || `Blog post posted on ${post.frontmatter.date}`}/>
      <h1 className="title">{post.frontmatter.title}</h1>
      <dl>
        <dd>Posted <strong>{post.frontmatter.date}</strong></dd>
      </dl>
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`