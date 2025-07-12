import React from "react";

function Navbar({ user, onLogout }) {
  return (
    <nav
      style={{
        padding: "15px 20px",
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #0056b3",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "24px" }}>AI Concept Tracker</h1>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "16px" }}>Welcome, {user.name}!</span>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <span style={{ fontSize: "16px" }}>Please log in</span>
      )}
    </nav>
  );
}

export default Navbar;
