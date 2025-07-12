const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Make it optional for now
  },
  // Add file upload fields
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }]
});

const Concept = mongoose.model("Concept", conceptSchema);

module.exports = Concept;
