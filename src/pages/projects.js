import React from 'react'
import Helmet from 'react-helmet'
import Masonry from 'react-masonry-component'
import CommonHeader from '../components/common-header'
import { default as Link, withPrefix } from 'gatsby-link'

import './projects.scss'

const linkForSlug = (slug, nodes) => {
  let node = nodes.find(n => n.node.fields.id === slug);
  return node && node.node.fields.slug;
}

const ProjectsPage = ({ data }) => (
  <div className="projects-page">
    <Helmet title="Projects" description="A collection of my larger, more recent, projects."/>
    <CommonHeader/>

    <section>
      <Masonry elementType='ul' options={{ transitionDuration: 0 }}>
        {data.dataProjectsToml.projects.map(project => (
          <li key={project.slug}>
            <h3>
              {linkForSlug(project.slug, data.allMarkdownRemark.edges)
                ? (<Link
                    to={linkForSlug(project.slug, data.allMarkdownRemark.edges)}>
                    {project.name}
                  </Link>)
                : project.name}
             </h3>
            <h4>{project.year}</h4>
            <ul className="tags">
              {project.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{__html: project.description}} />
            <div className="thumbnail">
              <img src={__PATH_PREFIX__ + project.thumbnail} alt={"Thumbnail for " + project.name} />
            </div>
          </li>
        ))}
      </Masonry>
    </section>
  </div>
)

export default ProjectsPage

export const query = graphql`
  query Projects {
    dataProjectsToml {
      projects {
        name
        slug
        tags
        url
        year
        thumbnail
        description
      }
    }
    allMarkdownRemark(filter: {fields: {type: {eq: "project"}}}) {
      edges {
        node {
          fields {
            slug
            id
          }
          id
        }
      }
    }
  }
`
