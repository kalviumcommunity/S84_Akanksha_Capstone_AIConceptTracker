import React from "react";
import FileUpload from "./FileUpload";

function ConceptItem({ concept, onFileUploaded }) {
  const handleFileUploaded = (fileInfo) => {
    if (onFileUploaded) {
      onFileUploaded(concept._id, fileInfo);
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        margin: "10px 0",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <h3 style={{ color: "#000000" }}>{concept.title}</h3>
      <p style={{ color: "#000000" }}>{concept.description}</p>
      <p style={{ color: "#000000" }}>
        <em>Status:</em> {concept.status}
      </p>

      {/* File Upload Section */}
      <div style={{ marginTop: "15px" }}>
        <h4 style={{ margin: "10px 0 5px 0", fontSize: "14px" }}>
          Attachments:
        </h4>
        <FileUpload
          conceptId={concept._id}
          onFileUploaded={handleFileUploaded}
        />

        {/* Show existing files */}
        {concept.attachments && concept.attachments.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            {concept.attachments.map((file, index) => (
              <div
                key={index}
                style={{
                  padding: "5px 10px",
                  margin: "5px 0",
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <span>
                  📎 {file.originalName}
                  <em style={{ color: "#666", marginLeft: "5px" }}>
                    ({(file.size / 1024).toFixed(1)} KB)
                  </em>
                </span>
                <a
                  href={`/api/concepts/files/${file.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConceptItem;
