import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Note = ({ children }) => {
  const [ssr, setSsr] = useState(true);
  useEffect(() => {
    // The first render is the server-side render, skip it
    setSsr(false);
    return () => setSsr(true);
  }, []);

  if (ssr) {
    return <span />;
  } else {
    const el = document.getElementById("margins");
    if (!el)
      throw new Error("Margin notes requires a pre-existing #margins element");
    return createPortal(children, el);
  }
};

const Label = ({ label, children }) => {
  if (!label) throw new Error("Margin notes need the label prop");

  return (
    <span className="margin-note">
      {label}
      <Note>
        <div className="margin-note-note">{children}</div>
      </Note>
    </span>
  );
};

export default Label;
