var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({

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
    profile:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    }

});

module.exports = mongoose.model('Account', AccountSchema);