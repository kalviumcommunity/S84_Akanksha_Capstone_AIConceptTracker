import React from "react";
import ConceptItem from "./ConceptItem"; // Import the ConceptItem component

// The 'concepts' array will now be passed as a prop
function ConceptList({ concepts }) {
  // If concepts prop is not provided or is not an array, default to an empty array or handle error
  const displayConcepts = Array.isArray(concepts) ? concepts : [];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>My AI Concepts</h2>
      {displayConcepts.length > 0 ? (
        displayConcepts.map((concept) => (
          // Ensure your concept objects have a unique 'id' or '_id' for the key
          <ConceptItem key={concept.id || concept._id} concept={concept} />
        ))
      ) : (
        <p style={{ color: "red", fontStyle: "italic" }}>
          No concepts tracked yet. Add some!
        </p>
      )}
    </div>
  );
}

export default ConceptList;
