import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'
import Link from 'gatsby-link'

import './writing.scss'

const WritingPage = () => (
  <div className="writing-page">
    <Helmet title="Writing" description="Longer, more polished stories and visual explanations"/>
    <CommonHeader/>

    <section>
      Coming Soon.
    </section>
  </div>
)

export default WritingPage