import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import NarrowHeader from '../components/narrow-header'
import Layout from '../components/layout'
import CommonFooter from '../components/common-footer'
import MarkdownArticle from '../components/markdown-article'
import '../pages/talks.scss'

const most = arr => arr.slice(0, arr.length - 1)
const last = arr => arr[arr.length - 1]

let _sortedImages;

const sortedImages = images => _sortedImages || images.sort((a, b) => {
  return parseInt(a.node.name, 10) - parseInt(b.node.name, 10)
})

const srcPath = image => image.node.childImageSharp.fixed.src
const meta = data => data.node.metadata

const Talk = ({ data: source }) => {
  const allTalks = source.allSlidesMarkdown
  const data = allTalks && allTalks.edges && allTalks.edges[0]
  const images = source.allFile.edges
  const conferenceList = most(meta(data).conferences).length
    ? `${most(meta(data).conferences).join(', ')}, and ${last(meta(data).conferences)}`
    : last(meta(data).conferences);
  const fullThumbnailUrl = srcPath(sortedImages(images)[0]) && 'https://' + source.site.siteMetadata.host + srcPath(sortedImages(images)[0]);

  if (!data || !images) {
    return (
      <Layout>
        <NarrowHeader link="/talks" noun ="talks" />
        <main className="talk">
          <h1>Wow, busted it.</h1>
        </main>
      </Layout>
    )
  }
  return (
    <Layout>
      <Helmet>
        <title>{meta(data).title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="Michael Lange" />
        <meta name="twitter:title" content={meta(data).title} />
        <meta name="twitter:description" content={`Presented by Michael Lange at ${conferenceList}`} />
        <meta name="twitter:image" content={fullThumbnailUrl} />

        <meta property="og:title" content={meta(data).title} />
        <meta property="og:site_name" content="Michael Lange" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={fullThumbnailUrl} />
      </Helmet>
      <NarrowHeader link="/talks" noun="talks" />
      <main className="talk">
        <div className="hero" style={{ '--bg': `url(${srcPath(sortedImages(images)[0])})` }}>
          <div className="hero-title" style={{ '--text-primary': meta(data).primary, '--text-secondary': meta(data).secondary }}>
            <h1>{meta(data).title}</h1>
            <h3 className="subtitle">
              <span>Presented at </span>
              {most(meta(data).conferences).length ? most(meta(data).conferences).map(conference => (
                <span><strong>{conference}</strong>, </span>
              )) : null}
              {most(meta(data).conferences).length ? <span>, and </span> : null}
              <strong>{last(meta(data).conferences)}</strong>.
            </h3>
            {!meta(data).video ? null : (
              <a className="video-link" href={meta(data).video} rel="noreferrer noopener" target="_blank">Watch the Video</a>
            )}
          </div>
        </div>
        <article className="slides">
          {data.node.slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-number">
                <a name={index + 1} href={`#${index + 1}`}>#{index + 1}</a>
              </div>
              <div className="figure">
                <a href={sortedImages(images)[index].node.childImageSharp.original.src}><Img
                  fixed={sortedImages(images)[index].node.childImageSharp.fixed}
                  fadeIn={true}
                  alt={`Slide ${index + 1}`}
                  style={{ display: 'block' }}
                /></a>
              </div>
              <MarkdownArticle content={slide.html} className="flush" />
            </div>
          ))}
        </article>
      </main>
      <CommonFooter />
    </Layout>
  )
}

export default Talk

export const query = graphql`
  query TalkQuery($slug: String!, $slides: String!) {
    site {
      siteMetadata {
        host
      }
    }
    allSlidesMarkdown(filter: {slug: { eq: $slug }}) {
      edges {
        node {
          id
          slug
          abstract
          metadata {
            title
            conferences
            date
            primary
            secondary
            video
          }
          slides {
            markdown
            html
          }
        }
      }
    }
    allFile(filter: { dir: { regex: $slides }}) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            original {
              src
            }
            fixed(width: 450) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    }
  }
`
