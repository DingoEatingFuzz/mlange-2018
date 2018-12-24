import React from 'react'
import Link from 'gatsby-link';
import Helmet from 'react-helmet'
import NarrowHeader from '../components/narrow-header'

import '../pages/projects.scss'
import '../pages/blog.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  const meta = data.dataProjectsToml.projects.find(p => p.slug === post.fields.id)
  return (
    <div>
      <NarrowHeader link="/projects" noun="projects" />
      <div className="project-detail">
        <Helmet
          title={meta.name}
          description={meta.description || meta.name}/>
        <h1 className="title">{meta.name}</h1>
        <ul className="tags">
          {meta.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <dl>
          <dd>Circa <strong>{meta.year}</strong></dd>
        </dl>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
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
