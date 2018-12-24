import React from 'react'
import Link from 'gatsby-link';
import Helmet from 'react-helmet'
import NarrowHeader from '../components/narrow-header'
import MarkdownArticle from '../components/markdown-article'

import Layout from '../components/layout'
import '../pages/projects.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  const meta = data.dataProjectsToml.projects.find(p => p.slug === post.fields.id)
  return (
    <Layout>
      <NarrowHeader link="/projects" noun="projects" />
      <div className="project-detail">
        <Helmet
          title={meta.name}
          description={meta.description || meta.name}/>
        <MarkdownArticle content={post.html}>
          <h1 className="title">{meta.name}</h1>
          <ul className="tags">
            {meta.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <dl>
            <dd>Circa <strong>{meta.year}</strong></dd>
          </dl>
        </MarkdownArticle>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        id
      }
    }
    dataProjectsToml {
      projects {
        name
        slug
        tags
        url
        year
        thumbnail
        description
      }
    }
  }
`
