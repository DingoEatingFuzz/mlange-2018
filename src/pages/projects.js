import React from 'react'
import Helmet from 'react-helmet'
import CommonNavigation from '../components/common-navigation'
import { default as Link, withPrefix } from 'gatsby-link'

import './projects.scss'

const ProjectsPage = ({ data }) => (
  <div className="projects-page">
    <Helmet title="Projects" description="A collection of my larger, more recent, projects."/>

    <header>
      <Link to="/">Michael Lange</Link>
      <CommonNavigation/>
    </header>

    <section>
      <ul>
        {data.dataProjectsToml.projects.map((project, index) => (
          <li>
            <h3><a href={project.url}>{project.name}</a></h3>
            <h4>{project.year}</h4>
            <p dangerouslySetInnerHTML={{__html: project.description}} />
            <img src={__PATH_PREFIX__ + project.thumbnail} alt={"Thumbnail for " + project.name} />
          </li>
        ))}
      </ul>
    </section>
  </div>
)

export default ProjectsPage

export const query = graphql`
  query Projects {
    dataProjectsToml {
      projects {
        name
        url
        year
        thumbnail
        description
      }
    }
  }
`