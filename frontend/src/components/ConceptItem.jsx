// filepath: /home/akanksha/Desktop/kalvium/S84_Akanksha_Capstone_AIConceptTracker/frontend/src/components/ConceptItem.jsx
import React from "react";

function ConceptItem({ concept }) {
  // 'concept' prop will contain data like name, description, status
  // For now, we'll assume it has a 'name' and 'status'
  return (
    <div
      style={{
        color: "black",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "4px",
      }}
    >
      <h3>{concept?.name || "Sample Concept"}</h3>
      <p>Status: {concept?.status || "To Learn"}</p>
      {/* Add more details or buttons for Edit/Delete later */}
    </div>
  );
}

export default ConceptItem;
