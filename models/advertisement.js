const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisement = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,        
    },
    picture: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});
const advertisementSchema = mongoose.model('advertisement', advertisement);
module.exports = advertisementSchema;