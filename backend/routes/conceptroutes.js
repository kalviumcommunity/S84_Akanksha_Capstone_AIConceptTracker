const express = require("express");
const router = express.Router();
const Concept = require("../models/conceptSchema");
const mongoose = require("mongoose"); // For ObjectId validation
const upload = require("../middleware/upload");
const path = require("path");
const { authenticateToken } = require("../middleware/auth");

// Get all concepts (protected route)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const concepts = await Concept.find().populate("userId", "name email");
    res.json(concepts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch concepts", details: error.message });
  }
});

// Get all concepts and populate user details
router.get("/user/:userId", authenticateToken, async (req, res) => {
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
router.get("/:id", authenticateToken, async (req, res) => {
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

// Create a new concept (protected route)
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, status, userId } = req.body;

  // Check if required fields are provided
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  // If userId is provided, validate it
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    const conceptData = { title, description, status };
    if (userId) {
      conceptData.userId = userId;
    }
    const newConcept = new Concept(conceptData);
    const savedConcept = await newConcept.save();
    res.status(201).json(savedConcept);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create concept", details: error.message });
  }
});

// Update an existing concept by ID (protected route)
router.put("/:id", authenticateToken, async (req, res) => {
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

// Upload file to a concept (protected route)
router.post(
  "/:id/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const conceptId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(conceptId)) {
        return res.status(400).json({ error: "Invalid concept ID" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const concept = await Concept.findById(conceptId);
      if (!concept) {
        return res.status(404).json({ error: "Concept not found" });
      }

      // Add file info to concept
      const fileInfo = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
        uploadDate: new Date(),
      };

      concept.attachments.push(fileInfo);
      await concept.save();

      res.status(200).json({
        message: "File uploaded successfully",
        file: fileInfo,
        concept: concept,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to upload file", details: error.message });
    }
  }
);

// Get file
router.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
});

// Delete file from concept (protected route)
router.delete("/:id/files/:filename", authenticateToken, async (req, res) => {
  try {
    const conceptId = req.params.id;
    const filename = req.params.filename;

    if (!mongoose.Types.ObjectId.isValid(conceptId)) {
      return res.status(400).json({ error: "Invalid concept ID" });
    }

    const concept = await Concept.findById(conceptId);
    if (!concept) {
      return res.status(404).json({ error: "Concept not found" });
    }

    // Remove file from attachments array
    concept.attachments = concept.attachments.filter(
      (file) => file.filename !== filename
    );
    await concept.save();

    // Delete physical file
    const fs = require("fs");
    const filePath = path.join(__dirname, "../uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete file", details: error.message });
  }
});

module.exports = router;
