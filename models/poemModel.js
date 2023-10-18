const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
    author: {
        type: String,
        default: ''
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

const Poem = mongoose.model('Poem', PoemSchema, 'poem');

module.exports = Poem;