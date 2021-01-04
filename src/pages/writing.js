import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import CommonHeader from "../components/common-header";

import Layout from "../components/layout";
import CommonFooter from "../components/common-footer";
import "./writing.scss";

const WritingPage = () => (
  <Layout>
    <div className="writing-page">
      <Helmet
        title="Writing"
        description="Longer, more polished stories and visual explanations"
      />
      <CommonHeader />

      <main>
        <ul className="post-list">
          <li>
            <h2>
              <Link to="/writing/remembering-flash">Remembering Flash</Link>
            </h2>
            <h3>January 3rd 2021</h3>
            <p>
              A personal story about when Flash flourished on the web. This also
              includes many thoughts on the open web, platforms, and creativity
              on the Internet.
            </p>
          </li>
        </ul>
      </main>

      <CommonFooter />
    </div>
  </Layout>
);

export default WritingPage;
