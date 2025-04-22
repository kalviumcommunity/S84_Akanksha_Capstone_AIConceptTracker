
const mongoose = require('mongoose');

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
        ref: 'User',
        required: true,
    }
});

const Concept = mongoose.model('Concept', conceptSchema);

module.exports = Concept;
