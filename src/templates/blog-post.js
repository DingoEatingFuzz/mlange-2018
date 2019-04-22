import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import NarrowHeader from '../components/narrow-header'
import MarkdownArticle from '../components/markdown-article'
import CommonFooter from '../components/common-footer';
import Layout from '../components/layout'
import '../pages/blog.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  const thumbnail = post.frontmatter.thumbnail && post.frontmatter.thumbnail.childImageSharp;
  const fullThumbnailUrl = thumbnail && 'https://' + data.site.siteMetadata.host + thumbnail.original.src;
  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Michael Lange" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={fullThumbnailUrl} />

        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:site_name" content="Michael Lange" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={fullThumbnailUrl} />
      </Helmet>

      <NarrowHeader link="/blog" noun="posts" />

      <div className="blog-post">
        <MarkdownArticle content={post.html}>
          <h1 className="title">{post.frontmatter.title}</h1>
          <dl>
            <dd>
              Posted <strong>{post.frontmatter.date}</strong>
            </dd>
          </dl>
        </MarkdownArticle>
      </div>
      <CommonFooter />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        host
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
        thumbnail {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
      fields {
        id
      }
    }
  }
`
