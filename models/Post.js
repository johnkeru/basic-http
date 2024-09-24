const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema);