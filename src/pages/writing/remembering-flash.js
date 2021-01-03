import React, { useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import NarrowHeader from "../../components/narrow-header";
import MDXArticle from "../../components/mdx-article";
import CommonFooter from "../../components/common-footer";
import Layout from "../../components/layout";
import "./remembering-flash.scss";
import bonziBuddy from "./remembering-flash/bonzi-buddy.svg";

const ShowMoreDialog = ({ children }) => {
  const [visibilityState, setVisibilityState] = useState(null);

  const dismissed = visibilityState === false;
  const visible = visibilityState === true;

  const dismissedMessage = <p>I don't blame you.</p>;
  const visibleMessage = null;
  const promptMessage = (
    <div>
      <p className="heading">
        Hmm. I had a lot to say about this letter&hellip;
      </p>
      <p>
        It felt good to write it all out, but maybe it's not important to read.
        Do you want to see all of my thoughts here?
      </p>
      <div className="actions">
        <button
          className="web-two-point-oh-btn"
          onClick={() => setVisibilityState(true)}
        >
          Yes, more ranting please.
        </button>
        <button
          className="web-two-point-oh-btn"
          onClick={() => setVisibilityState(false)}
        >
          No, I've seen enough, thanks.
        </button>
      </div>
      <img
        src={bonziBuddy}
        alt="Bonzi buddy, from the olden times"
        width="300px"
      />
    </div>
  );

  return (
    <div className={visible ? "show-more-dialog accepted" : "show-more-dialog"}>
      <div className="dialog">
        {dismissed
          ? dismissedMessage
          : visible
          ? visibleMessage
          : promptMessage}
      </div>
      <div className={visible ? "is-visible" : "is-hidden"}>{children}</div>
    </div>
  );
};

const TestPiece = ({ data }) => {
  const fragmentFor = slug =>
    data.allMdx.edges.find(edge => edge.node.fields.slug.endsWith(`${slug}/`));

  const intro = fragmentFor("intro");
  const openWeb = fragmentFor("open-web");
  const thoughts = fragmentFor("thoughts-on-thoughts-on-flash");
  const thoughtsMid = fragmentFor("thoughts-middle");
  const thoughtsEnd = fragmentFor("thoughts-end");
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

        <section className="open-web-banner">
          <div>
            <h2>The Open Web</h2>
            <p>
              Today it's pretty clear there is a web platform. We've got TC39,
              W3C, WHATWG, and all sorts of working groups within these larger
              groups. It hasn't always been this way.
            </p>
          </div>
        </section>

        <MDXArticle
          className="open-web"
          reset={true}
          content={openWeb.node.body}
        ></MDXArticle>

        <section className="thoughts-on-flash-banner">
          <h2 className="thoughts-on-flash-heading">
            <span className="beginning">
              <span className="inner-shadow">Thoughts on</span>
            </span>
            Thoughts on Flash
          </h2>
        </section>

        <MDXArticle
          reset={true}
          className="thoughts"
          content={thoughts.node.body}
        />
        <ShowMoreDialog>
          <MDXArticle
            reset={true}
            className="thoughts thoughts-ext"
            content={thoughtsMid.node.body}
          />
        </ShowMoreDialog>
        <MDXArticle
          reset={true}
          className="thoughts thoughts-ext thoughts-last"
          content={thoughtsEnd.node.body}
        />

        <MDXArticle
          reset={true}
          className="history"
          content={history.node.body}
        >
          <h2>History Repeats</h2>
        </MDXArticle>

        <div className="creativity-banner">
          <div className="wave">
            <h2>The Most Creative Period of the Web</h2>
          </div>
        </div>
        <MDXArticle
          reset={true}
          className="creativity"
          content={creativity.node.body}
        />

        <div className="preservation-banner">
          <h2>Preservation</h2>
          <div className="mask">
            <p aria-hidden="true">
              <span>Preservation</span>
            </p>
          </div>
        </div>
        <MDXArticle
          reset={true}
          className="preservation"
          content={preservation.node.body}
        />

        <div className="future">
          <h2>The Future</h2>
          <p>
            Everything around us will have an end of life. Sometimes by old age
            and sometimes violently taken too soon. Technology expires faster
            than almost anything humans have created. It's our duty to celebrate
            everything we have ever held dear and to make sure we preserve all
            that's worth remembering. <span className="end-mark" />
          </p>
        </div>

        <div className="further">
          <h2>Further Reading</h2>
          <p>
            The Flash diaspora reaches far and wide. Some people stayed in games
            and moved to different platforms, others kept with animation but now
            work in broadcast and video, some of us moved to UI engineering for
            the web like I did, and others left tech entirely.
          </p>

          <p>
            Here is an incomplete collection of how other people remember Flash.
            If you have written your own piece or recorded your own video,
            please contact me; I’d love to include it here.
          </p>

          <p>
            If you can’t get enough about this topic, start some conversations.
            If you work with people who are writing JavaScript, making
            generative art, or making indie games, I bet they have memories to
            share.
          </p>
        </div>

        <div className="archive">
          <h2>My Personal Archive</h2>
          <p>TBD</p>
        </div>

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
