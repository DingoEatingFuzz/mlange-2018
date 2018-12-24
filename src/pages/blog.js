import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'
import Link from 'gatsby-link'

import './blog.scss'

const BlogPage = ({ data }) => (
  <div className="blog-page">
    <Helmet title="Blog" description="Small form, thoughts, hot takes, and sloppy edits."/>
    <CommonHeader/>

    <main>
      <ol className="post-list">
        {data.allMarkdownRemark.edges.map(post => (
          <li key={post.node.id}>
            <h2>
              <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
            </h2>
            <h3>{post.node.frontmatter.date}</h3>
            <h4>{post.node.timeToRead} minute read ({post.node.wordCount.words} words)</h4>
            <p>{post.node.excerpt}</p>
          </li>
        ))}
      </ol>
    </main>
  </div>
)

export default BlogPage

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(filter: {fields: {type: {eq: "blog"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
          excerpt
          timeToRead
          wordCount {
            words
          }
          id
        }
      }
    }
  }
`
