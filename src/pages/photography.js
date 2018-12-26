import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'

import Layout from '../components/layout'
import './photography.scss'

const PhotographyPage = () => (
  <Layout>
    <div className="photography-page">
      <Helmet
        title="Photography"
        description="I sometimes take photos. Might as well put them on the Internet."
      />
      <CommonHeader />

      <section>Coming Soon.</section>
    </div>
  </Layout>
)

export default PhotographyPage
