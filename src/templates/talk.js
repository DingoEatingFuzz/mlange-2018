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

const srcPath = image => image.node.childImageSharp.fluid.src
const meta = data => data.node.metadata

const Talk = ({ data: source }) => {
  const data = source.allSlidesMarkdown.edges[0]
  const images = source.allFile.edges
  return (
    <Layout>
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
          </div>
        </div>
        <article className="slides">
          {data.node.slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-number">
                <a name={index + 1} href={`#${index + 1}`}>#{index + 1}</a>
              </div>
              <div className="figure">
                <Img
                  fluid={sortedImages(images)[index].node.childImageSharp.fluid}
                  fadeIn={true}
                  alt={`Slide ${index + 1}`}
                />
              </div>
              <MarkdownArticle content={slide.html} />
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
            fluid(maxWidth: 450) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
