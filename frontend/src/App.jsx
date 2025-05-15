import "./App.css";
// Import your new components
import Navbar from "./components/Navbar"; // Import Navbar
import ConceptList from "./components/ConceptList";

function App() {
  // const [count, setCount] = useState(0) // You can remove this if not used

  return (
    <>
      <Navbar />
      <div className="main-content" style={{ padding: "20px" }}>
        {" "}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {" "}
          {/* Centered logos */}
        </div>
        <h1>AI Concept Tracker</h1>{" "}
        {/* This title is also in Navbar, consider where you want it */}
        <ConceptList />
      </div>
    </>
  );
}

export default App;
