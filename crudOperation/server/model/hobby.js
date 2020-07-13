const mongoose = require('mongoose');

const hobbyScheme = new mongoose.Schema({
    name: String,    
    description: String,
    userId : String
});

module.exports = mongoose.model('Hobbies', hobbyScheme, 'Hobbies')
