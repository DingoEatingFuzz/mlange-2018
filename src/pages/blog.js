import React from 'react'
import Helmet from 'react-helmet'
import CommonHeader from '../components/common-header'
import Link from 'gatsby-link'

import './blog.scss'

const BlogPage = () => (
  <div className="blog-page">
    <Helmet title="Blog" description="Small form, thoughts, hot takes, and sloppy edits."/>
    <CommonHeader/>

    <section>
      Coming Soon.
    </section>
  </div>
)

export default BlogPage