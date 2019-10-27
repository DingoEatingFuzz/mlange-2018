import React, { useState } from "react";
import "./annotated-image.scss";

const parseMapping = mapping => {
  const mappings = mapping.split(" ");
  return mappings.map(m => {
    const [id, coords] = m.split(":");
    return {
      id,
      coordinates: coords.split(",").map(c => `${parseFloat(c).toFixed(2)}%`)
    };
  });
};

const AnnotatedImage = ({ img = "", alt = "", mapping = "", children }) => {
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  const parsedMapping = parseMapping(mapping);
  const mappingForId = id => {
    const mapping = parsedMapping.find(m => m.id === id);
    return mapping ? mapping.coordinates : [];
  };

  const Annotation = ({ id, title = "", children }) =>
    id !== activeAnnotation ? null : (
      <figcaption>
        <h4>
          {id}. {title}
        </h4>
        {children}
      </figcaption>
    );
  return (
    <figure className="annotated-image">
      <div className="annotated-image-image">
        <img src={img} alt={alt} />
        {parsedMapping.map(m => (
          <button
            key={m.id}
            role="button"
            className={`annotated-image-marker ${
              activeAnnotation === m.id ? "active" : ""
            }`}
            style={{ "--x": m.coordinates[0], "--y": m.coordinates[1] }}
            onClick={() =>
              setActiveAnnotation(activeAnnotation === m.id ? null : m.id)
            }
          >
            {m.id}
          </button>
        ))}
      </div>
      {children(Annotation)}
    </figure>
  );
};

export default AnnotatedImage;
