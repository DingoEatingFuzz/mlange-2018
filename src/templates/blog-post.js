import React from 'react'
import Link from 'gatsby-link';
import Helmet from 'react-helmet'
import NarrowHeader from '../components/narrow-header'

import '../pages/blog.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <NarrowHeader link="/blog" noun="posts" />
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
