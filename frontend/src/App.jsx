import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ConceptList from "./components/ConceptList";
import ConceptForm from "./components/ConceptForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [concepts, setConcepts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // true for login, false for register
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Set default authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Load concepts when user is authenticated
  useEffect(() => {
    if (user && token) {
      console.log("Fetching concepts…");
      axios
        .get("/api/concepts")
        .then((res) => {
          console.log("GET /api/concepts response:", res.data);
          const arr = Array.isArray(res.data) ? res.data : [];
          setConcepts(arr);
        })
        .catch((err) => {
          console.error("Fetch concepts failed:", err);
          // If token is invalid, logout user
          if (err.response?.status === 401) {
            handleLogout();
          }
        });
    }
  }, [user, token]);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
  };

  const handleRegister = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setConcepts([]);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Handle form submission from ConceptForm
  const handleAddConcept = (formData) => {
    console.log("Submitting formData:", formData);

    // Add userId to formData
    const conceptData = {
      ...formData,
      userId: user.id,
    };

    axios
      .post("/api/concepts", conceptData)
      .then((res) => {
        console.log("POST /api/concepts response:", res.data);
        setConcepts((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.error("Add concept failed:", err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          alert("Failed to add concept. Please try again.");
        }
      });
  };

  // Handle file upload to concept
  const handleFileUploaded = (conceptId, fileInfo) => {
    console.log("File uploaded to concept:", conceptId, fileInfo);
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

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", color: "#000000" }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show authentication forms if user is not logged in
  if (!user) {
    return (
      <>
        <Navbar user={user} onLogout={handleLogout} />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            padding: "20px",
          }}
        >
          {showLogin ? (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <Register
              onRegister={handleRegister}
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </>
    );
  }

  // Show main application if user is authenticated
  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
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
