import React, { useState } from "react";
import axios from "axios";

function FileUpload({ conceptId, onFileUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file || !conceptId) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/concepts/${conceptId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onFileUploaded) {
        onFileUploaded(response.data.file);
      }

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${dragOver ? "#007bff" : "#ccc"}`,
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: dragOver ? "#f8f9fa" : "#ffffff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        <input
          type="file"
          onChange={handleInputChange}
          style={{ display: "none" }}
          id="file-input"
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.md"
          disabled={uploading}
        />
        <label htmlFor="file-input" style={{ cursor: "pointer" }}>
          {uploading ? (
            <div>
              <p>📤 Uploading...</p>
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#007bff",
                    animation: "loading 1.5s ease-in-out infinite",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div>
              <p>📁 Click here or drag & drop files</p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Supports: Images, PDFs, Documents (Max 5MB)
              </p>
            </div>
          )}
        </label>
      </div>

      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}

export default FileUpload;
