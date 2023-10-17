const mongoose = require('mongoose');

const PoetrySchema = new mongoose.Schema({
    author: {
        type: String,
        default: '曹操'
    },
    paragraphs: {
        type: [String],
        unique: true
    },
    title: {
        type: String
    },
    dynasty: {
        type: String,
        default: 'Han'
    },
    tags: {
        type: [String],
        default: []
    },
    notes: {
        type: [String],
        default: []
    },
    source: {
        type: String,
        default: ''
    },
    popularity: {
        type: Number,
        default: 0
    }
});

const Poetry = mongoose.model('Poetry', PoetrySchema, 'poetry');

module.exports = Poetry;