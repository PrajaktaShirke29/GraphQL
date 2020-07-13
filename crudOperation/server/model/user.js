const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: String,
    age: Number,
    profession: String,
});

module.exports = mongoose.model('Users', userScheme, 'Users')
