import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ConceptList from "./components/ConceptList";
import ConceptForm from "./components/ConceptForm";

function App() {
  const [concepts, setConcepts] = useState([]); // ensure it starts as an array

  // Load concepts on mount
  useEffect(() => {
    console.log("Fetching concepts…");
    axios
      .get("/api/concepts")
      .then((res) => {
        console.log("GET /api/concepts response:", res.data);
        // Ensure it's an array before setting
        const arr = Array.isArray(res.data) ? res.data : [];
        setConcepts(arr);
      })
      .catch((err) => console.error("Fetch concepts failed:", err));
  }, []);

  // Handle form submission from ConceptForm
  const handleAddConcept = (formData) => {
    console.log("Submitting formData:", formData);

    axios
      .post("/api/concepts", formData)
      .then((res) => {
        console.log("POST /api/concepts response:", res.data);
        setConcepts((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.error("Add concept failed:", err);
        // Show error to user
        alert(
          "Failed to add concept. Make sure your backend server is running on port 3000."
        );
      });
  };

  // Handle file upload to concept
  const handleFileUploaded = (conceptId, fileInfo) => {
    console.log("File uploaded to concept:", conceptId, fileInfo);
    // Refresh concepts to show updated attachments
    setConcepts((prev) =>
      prev.map((concept) =>
        concept._id === conceptId
          ? {
              ...concept,
              attachments: [...(concept.attachments || []), fileInfo],
            }
          : concept
      )
    );
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px",
          color: "#000000",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "#000000" }}>Add Concept</h2>
        <ConceptForm onSubmit={handleAddConcept} />
        <ConceptList
          concepts={Array.isArray(concepts) ? concepts : []}
          onFileUploaded={handleFileUploaded}
        />
      </div>
    </>
  );
}

export default App;
