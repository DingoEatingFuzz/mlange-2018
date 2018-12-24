import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import NarrowHeader from '../components/narrow-header'
import MarkdownArticle from '../components/markdown-article'
import Layout from '../components/layout'
import '../pages/blog.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Helmet
        title={post.frontmatter.title}
        description={post.frontmatter.description || `Blog post posted on ${post.frontmatter.date}`}/>

      <NarrowHeader link="/blog" noun="posts" />

      <div className="blog-post">
        <MarkdownArticle content={post.html}>
          <h1 className="title">{post.frontmatter.title}</h1>
          <dl>
            <dd>Posted <strong>{post.frontmatter.date}</strong></dd>
          </dl>
        </MarkdownArticle>
      </div>
    </Layout>
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
