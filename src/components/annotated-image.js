import React from "react";
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
  const parsedMapping = parseMapping(mapping);
  const mappingForId = id => {
    const mapping = parsedMapping.find(m => m.id === id);
    return mapping ? mapping.coordinates : [];
  };

  const Annotation = ({ id, children }) => (
    <figcaption>
      <h3>
        Annotation {id}: [{mappingForId(id).join(", ")}]
      </h3>
      {children}
    </figcaption>
  );
  return (
    <figure className="annotated-image">
      <div className="annotated-image-image">
        <img src={img} alt={alt} />
        {parsedMapping.map(m => (
          <span
            key={m.id}
            className="annotated-image-marker"
            style={{ "--x": m.coordinates[0], "--y": m.coordinates[1] }}
          >
            {m.id}
          </span>
        ))}
      </div>
      {children(Annotation)}
    </figure>
  );
};

export default AnnotatedImage;
