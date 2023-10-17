const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    author: {
        type: String
    },
    paragraphs: {
        type: [String],
        unique: true
    },
    title: {
        type: String
    },
    rhythmic: {
        type: String,
    },
    dynasty: {
        type: String,
        default: 'Qing'
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

const Song = mongoose.model('Song', SongSchema, 'song');

module.exports = Song;