import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'
import Link from 'gatsby-link'

import './photography.scss'

const PhotographyPage = () => (
  <div className="photography-page">
    <Helmet title="Photography" description="I sometimes take photos. Might as well put them on the Internet."/>
    <CommonHeader/>

    <section>
      Coming Soon.
    </section>
  </div>
)

export default PhotographyPage