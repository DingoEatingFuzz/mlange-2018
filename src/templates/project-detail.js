import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import NarrowHeader from '../components/narrow-header'
import MarkdownArticle from '../components/markdown-article'
import CommonFooter from '../components/common-footer';
import Layout from '../components/layout'
import '../pages/projects.scss'

export default ({ data }) => {
  const post = data.markdownRemark
  const meta = data.dataProjectsToml.projects.find(
    p => p.slug === post.fields.id
  )
  const images = data.dataProjectsToml.images.filter(
    p => p.project === post.fields.id
  )
  return (
    <Layout>
      <NarrowHeader link="/projects" noun="projects" />
      <div className={`project-detail ${images && images.length ? 'with-gallery' : ''}`}>
        <Helmet>
          <title>{meta.name}</title>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="Michael Lange" />
          <meta name="twitter:title" content={meta.name} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={images && images.length && images[0].url} />

          <meta property="og:title" content={meta.name} />
          <meta property="og:site_name" content="Michael Lange" />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image" content={images && images.length && images[0].url} />
        </Helmet>

        <MarkdownArticle content={post.html}>
          <h1 className="title">{meta.name}</h1>
          <dl>
            {meta.url && (
              <dd>
                Visit the project at <a href={meta.url} target="_blank" rel="noopener noreferrer">{meta.url}</a>
              </dd>
            )}
            <dd>
              Circa <strong>{meta.year}</strong>
            </dd>
          </dl>
          {images && images.length ? (
            <div className="gallery-note">
              <strong>Note!</strong> There's a gallery after all these words.
            </div>
          ) : ''}
        </MarkdownArticle>

        {images && images.length ? (
          <ul className="gallery">
            {images.map(img => (
              <li key={img.url}>
                <figure>
                  <a href={img.url} target="_blank" rel="noopener noreferrer"><img src={img.url} alt={img.alt} /></a>
                  <figcaption dangerouslySetInnerHTML={{ __html: img.caption }}></figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : ''}
      </div>
      <CommonFooter />
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
      images {
        project
        url
        alt
        caption
      }
    }
  }
`
