const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodreq = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,        
    },
    phone: {
        type: String,
        required: true
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'foodmenu',        
    },
    status: {
        type: String,
        default: 'Pending'
    },   
}, {
    timestamps: true
});
const foodreqSchema = mongoose.model('foodreq', foodreq);
module.exports = foodreqSchema;