import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import NarrowHeader from "../../components/narrow-header";
import MDXArticle from "../../components/mdx-article";
import CommonFooter from "../../components/common-footer";
import Layout from "../../components/layout";
import "../projects.scss";

const mdx = "";

const TestPiece = ({ data }) => (
  <Layout>
    <div className="projects-page">
      <Helmet
        title="Remembering Flash"
        description="A personal story about my experience with Flash with some talk about the open web, new media, and the Internet along the way."
      />

      <NarrowHeader link="/writing" noun="writing" />

      <div className="blog-post">
        <MDXArticle content={data.mdx.body}>
          <h1 className="title">{data.mdx.frontmatter.title}</h1>
          <dl>
            <dd>
              Posted <strong>{data.mdx.frontmatter.date}</strong>
            </dd>
          </dl>
        </MDXArticle>
      </div>

      <CommonFooter />
    </div>
  </Layout>
);

export default TestPiece;

export const query = graphql`
  query Flash {
    mdx(fields: { type: { eq: "writing" }, id: { eq: "writing/flash" } }) {
      id
      body
      excerpt
      frontmatter {
        title
        date
      }
    }
  }
`;
