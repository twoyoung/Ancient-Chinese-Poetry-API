const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dynasty: {
        type: String,
        default: 'Tang'
    },
    tags: {
        type: [String],
        default: []
    },
    notes: {
        type: [String],
        default: []
    },
    popularity: {
        type: Number,
        default: 0
    }
},{
    toJSON: { select: '-_id -__v'},
    toObject: { select: '-_id -__v'}
});

const Author = mongoose.model('Author', AuthorSchema, 'author');

module.exports = Author;