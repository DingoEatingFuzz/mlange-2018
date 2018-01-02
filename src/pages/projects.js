import React from 'react'
import Helmet from 'react-helmet'
import CommonNavigation from '../components/common-navigation'

const ProjectsPage = () => (
  <div>
    <Helmet title="Projects" description="A collection of my larger, more recent, projects."/>
    <CommonNavigation/>
    <section>
      <h1>Projects</h1>
      <ul>
        <li>Project One</li>
        <li>Project Two</li>
        <li>Project Three</li>
        <li>Project Four</li>
      </ul>
    </section>
  </div>
)

export default ProjectsPage