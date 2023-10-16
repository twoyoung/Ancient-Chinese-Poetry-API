const mongoose = require('mongoose');

const poetrySchema = new mongoose.Schema({
    author: {
        type: String
    },
    paragraphs: {
        type: [String]
    },
    title: {
        type: String
    }
});

const Poetry = mongoose.model('Poetry', poetrySchema, 'quantangshi');

module.exports = Poetry;