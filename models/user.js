const mongoose = require('mongoose');

const FBUserSchema = new mongoose.Schema({
    facebook: {
        id: String,
        firstname: String,
        lastname: String
    }
});

const User = mongoose.model('User', FBUserSchema);

module.exports = User;