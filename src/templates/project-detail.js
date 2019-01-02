import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import NarrowHeader from '../components/narrow-header'
import MarkdownArticle from '../components/markdown-article'
import Layout from '../components/layout'
import '../pages/projects.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  const meta = data.dataProjectsToml.projects.find(
    p => p.slug === post.fields.id
  )
  return (
    <Layout>
      <NarrowHeader link="/projects" noun="projects" />
      <div className="project-detail">
        <Helmet title={meta.name} description={meta.description || meta.name} />
        <MarkdownArticle content={post.html}>
          <h1 className="title">{meta.name}</h1>
          <dl>
            {meta.url && (
              <dd>
                Visit the project at <a href={meta.url} target="_blank">{meta.url}</a>
              </dd>
            )}
            <dd>
              Circa <strong>{meta.year}</strong>
            </dd>
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
