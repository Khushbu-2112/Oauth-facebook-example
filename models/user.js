const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    facebook: {
        id: String,
        firstname: String,
        lastname: String
    },
    github: {
        id: String,
        username: String,
        name: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;