const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
    comment: String,    
    userId : String
});

module.exports = mongoose.model('Posts', postScheme, 'Posts')
