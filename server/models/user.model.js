var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['employee', 'hr'],
        required: true
    },
    profile_picture:{
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);