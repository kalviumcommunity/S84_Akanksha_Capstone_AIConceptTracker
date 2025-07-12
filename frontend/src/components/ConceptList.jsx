import React from "react";
import ConceptItem from "./ConceptItem";

function ConceptList({ concepts, onFileUploaded }) {
  const items = [];
  if (Array.isArray(concepts)) {
    concepts.forEach((c) => {
      items.push(
        <ConceptItem 
          key={c._id} 
          concept={c} 
          onFileUploaded={onFileUploaded}
        />
      );
    });
  }

  return (
    <div>
      <h2>My AI Concepts</h2>
      {items.length > 0 ? items : (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          No concepts tracked yet. Add some!
        </p>
      )}
    </div>
  );
}

export default ConceptList;
