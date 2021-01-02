import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import NarrowHeader from "../../components/narrow-header";
import MDXArticle from "../../components/mdx-article";
import CommonFooter from "../../components/common-footer";
import Layout from "../../components/layout";
import "./remembering-flash.scss";

const TestPiece = ({ data }) => {
  const fragmentFor = slug =>
    data.allMdx.edges.find(edge => edge.node.fields.slug.endsWith(`${slug}/`));

  const intro = fragmentFor("intro");
  const openWeb = fragmentFor("open-web");
  const thoughts = fragmentFor("thoughts-on-thoughts-on-flash");
  const history = fragmentFor("history-repeats");
  const creativity = fragmentFor("the-most-creative-period-of-the-web");
  const preservation = fragmentFor("preservation");

  return (
    <Layout>
      <div className="flash">
        <Helmet
          title="Remembering Flash"
          description="A personal story about my experience with Flash with some talk about the open web, new media, and the Internet along the way."
        />

        <NarrowHeader link="/writing" noun="writing" />

        <header className="flash-title">
          <h1 className="title">
            <span className="primary">Remembering</span>
            <span className="secondary"> Flash</span>
          </h1>
          <dl>
            <dd>Jan. 2nd 2021</dd>
          </dl>
          <figure>
            <blockquote>
              Flash Player will no longer be supported after December 2020.
            </blockquote>
            <figcaption>
              &mdash;Google Chrome Web Browser, circa late 2020
            </figcaption>
          </figure>
        </header>

        <div id="margins"></div>

        <MDXArticle className="intro" reset={true} content={intro.node.body} />

        <h2>The Open Web</h2>
        <MDXArticle className="open-web" content={openWeb.node.body} />

        <h2>Thoughts on Thoughts on Flash</h2>
        <MDXArticle className="thoughts" content={thoughts.node.body} />

        <h2>History Repeats</h2>
        <MDXArticle className="history" content={history.node.body} />

        <h2>The Most Creative Period of the Web</h2>
        <MDXArticle className="creativity" content={creativity.node.body} />

        <h2>Preservation</h2>
        <MDXArticle className="preservation" content={preservation.node.body} />

        <h2>The Future</h2>

        <h2>Further Reading</h2>

        <h2>My Personal Archive</h2>

        <CommonFooter />
      </div>
    </Layout>
  );
};

export default TestPiece;

export const query = graphql`
  query Flash {
    allMdx(
      filter: {
        fields: {
          type: { eq: "writing" }
          id: { regex: "/^writing/remembering-flash/" }
        }
      }
    ) {
      edges {
        node {
          id
          body
          fields {
            slug
          }
        }
      }
    }
  }
`;
