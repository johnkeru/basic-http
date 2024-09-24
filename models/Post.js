const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // references User model by id
})

// new Post({ title: 'aefawe', body: 'aewfwe', user: '66f21f5eafa3641efae06bf9'})
module.exports = mongoose.model('Post', postSchema);