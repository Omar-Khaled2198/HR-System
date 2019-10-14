var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingsSchema = new Schema({

    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    flexable_time: {
        type: String
    },
    holidays: [{
        type: String
    }],
    location_coordinates: [{
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }]


});

module.exports = mongoose.model('Settings', SettingsSchema);