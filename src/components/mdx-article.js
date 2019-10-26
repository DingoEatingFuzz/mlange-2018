import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "./markdown-article.scss";

export default ({ content = "", className = "", children }) => (
  <div className={`markdown-article ${className}`}>
    {children}
    <article>
      <MDXRenderer>{content}</MDXRenderer>
    </article>
  </div>
);
