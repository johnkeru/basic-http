const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/crud'
// npm i mongoose
module.exports = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to mongodb');
    } catch (e) {
        console.log(e.message)
        console.log('Failed to connect to mongodb');
    }

}