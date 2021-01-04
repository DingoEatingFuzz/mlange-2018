import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "./markdown-article.scss";

export default ({ content = "", className = "", reset = false, children }) => (
  <div className={`${reset ? "" : "markdown-article "}${className}`}>
    {children}
    <article>
      <MDXRenderer>{content}</MDXRenderer>
    </article>
  </div>
);
