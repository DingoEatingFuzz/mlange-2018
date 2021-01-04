import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";

const Note = ({ anchor, column = 0, y = 0, children }) => {
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

    const x = 900 + column * 220;

    const note = (
      <div
        className="margin-container"
        style={{ left: x - 900, top: y }}
        data-anchor-id={anchor}
      >
        <div className="margin-note-note">{children}</div>
      </div>
    );

    return createPortal(note, el);
  }
};

const Label = ({ label, column, y, children }) => {
  if (!label) throw new Error("Margin notes need the label prop");
  const id = `margin-note-${uuid()}`;

  return (
    <span className="margin-note" id={id}>
      {label}
      <Note anchor={id} column={column} y={y}>
        {children}
      </Note>
    </span>
  );
};

export default Label;
