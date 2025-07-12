const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const conceptRoutes = require("./routes/conceptroutes");
const userRoutes = require("./routes/userroutes");

const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ai-concept-tracker")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Failed to connect to database:", error));

app.use("/concepts", conceptRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send({ message: "Server is running" }));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
