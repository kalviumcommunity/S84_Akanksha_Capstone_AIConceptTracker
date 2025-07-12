import React, { useState } from "react";

function ConceptForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    if (formData.title.trim() === "") {
      alert("Title is required!");
      return;
    }
    console.log("Calling onSubmit with:", formData);
    onSubmit(formData);
    setFormData({ title: "", description: "", status: "" }); // Reset form
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#000000",
          backgroundColor: "#ffffff",
        }}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#000000",
          backgroundColor: "#ffffff",
        }}
      />
      <input
        type="text"
        name="status"
        placeholder="Status (e.g., Learning, Learned, To Learn)"
        value={formData.status}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#000000",
          backgroundColor: "#ffffff",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add Concept
      </button>
    </form>
  );
}

export default ConceptForm;
