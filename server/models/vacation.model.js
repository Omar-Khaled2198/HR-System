var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VacationSchema = new Schema({

    requester:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account',
        required:true
    },
    title: {
        type: String,
        required: true,
        max: 100
    },
    description:{
        type: String,
        required:true
    },
    created_at:{
        type:String,
        required:true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ['Pending', 'Accepted','Rejected','Aborted'],
    },
    note:{
        type:String
    }

});

module.exports = mongoose.model('Vacation', VacationSchema);