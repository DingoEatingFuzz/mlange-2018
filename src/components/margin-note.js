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
    const anchorEl = document.getElementById(anchor);

    let line;
    if (anchorEl) {
      const bbox = anchorEl.getBoundingClientRect();
      const ax = bbox.x + bbox.width / 2;
      const ay = bbox.y + bbox.height / 2;

      const isAbove = ay - y > 0;
      const dx = Math.abs(ax - x);
      const dy = Math.abs(ay - y);

      line = (
        <svg
          transform={`translate(${ax - x}, ${isAbove ? 0 : ay - y})`}
          width={dx}
          height={dy + 50}
        >
          <line
            x1={0}
            y1={isAbove ? dy : 0}
            x2={dx + 5}
            y2={isAbove ? 50 : dy + 50}
          />
        </svg>
      );
    }

    const note = (
      <div
        className="margin-container"
        style={{ left: x - 900, top: y }}
        data-anchor-id={anchor}
      >
        {line ? line : null}
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
