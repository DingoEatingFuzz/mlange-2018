import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'

import Layout from '../components/layout'
import './writing.scss'

const WritingPage = () => (
  <Layout>
    <div className="writing-page">
      <Helmet
        title="Writing"
        description="Longer, more polished stories and visual explanations"
      />
      <CommonHeader />

      <section>Coming Soon.</section>
    </div>
  </Layout>
)

export default WritingPage
