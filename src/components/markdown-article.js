import React from "react";

import "./markdown-article.scss";

export default ({ content = "", className = "", reset = false, children }) => (
  <div className={`${reset ? "" : "markdown-article "}${className}`}>
    {children}
    <article dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);
