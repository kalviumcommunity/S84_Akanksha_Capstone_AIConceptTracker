const express = require("express");
const router = express.Router();
const Concept = require("../models/conceptSchema");
const mongoose = require("mongoose"); // For ObjectId validation

// Get all concepts and populate user details
router.get("/", async (req, res) => {
  try {
    const concepts = await Concept.find().populate("userId", "name email");
    res.json(concepts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch concepts", details: error.message });
  }
});

// Get a single concept by ID and populate user details
router.get("/:id", async (req, res) => {
  try {
    const concept = await Concept.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!concept) {
      return res.status(404).json({ error: "Concept not found" });
    }
    res.json(concept);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch concept", details: error.message });
  }
});

// Create a new concept
router.post("/", async (req, res) => {
  const { title, description, status, userId } = req.body;

  // Check if required fields are provided and userId is a valid ObjectId
  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    const newConcept = new Concept({ title, description, status, userId });
    const savedConcept = await newConcept.save();
    res.status(201).json(savedConcept);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create concept", details: error.message });
  }
});

// Update an existing concept by ID
router.put("/:id", async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const updatedConcept = await Concept.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedConcept) {
      return res.status(404).json({ error: "Concept not found" });
    }

    res.json({
      message: "Concept updated successfully",
      concept: updatedConcept,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update concept", details: error.message });
  }
});

module.exports = router;
