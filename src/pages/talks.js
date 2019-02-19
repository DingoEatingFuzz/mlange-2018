import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import CommonHeader from '../components/common-header'
import CommonFooter from '../components/common-footer'
import './talks.scss'

const talkSort = (a, b) => new Date(b.node.metadata.date) - new Date(a.node.metadata.date)
const formatDate = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

const TalksPage = ({ data: { allSlidesMarkdown: data } }) => (
  <Layout>
    <div className="talks-page">
      <Helmet
        title="Talks"
        description="Video, transcripts, and written transpositions of talks I've given."
      />
      <CommonHeader />
      <main>
        <ol className="talk-list">
          {data.edges.sort(talkSort).map(({ node: talk }) => (
            <li key={talk.id}>
              <h2>
                <Link to={talk.slug}>
                  {talk.metadata.title}
                </Link>
              </h2>
              <h3>{formatDate(new Date(talk.metadata.date))}</h3>
              <div dangerouslySetInnerHTML={{ __html: talk.abstract}} />
            </li>
          ))}
        </ol>
      </main>
      <CommonFooter />
    </div>
  </Layout>
)

export default TalksPage

export const query = graphql`
  query Talks {
    allSlidesMarkdown {
      edges {
        node {
          id
          slug
          abstract
          metadata {
            title
            conferences
            date
          }
        }
      }
    }
  }
`
