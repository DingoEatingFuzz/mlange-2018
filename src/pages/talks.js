import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'
import Link from 'gatsby-link'

import './talks.scss'

const TalksPage = () => (
  <div className="talks-page">
    <Helmet title="Talks" description="Video, transcripts, and written transpositions of talks I've given."/>
    <CommonHeader/>

    <section>
      Coming Soon.
    </section>
  </div>
)

export default TalksPage