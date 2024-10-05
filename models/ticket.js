const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticket = new Schema({
    propertyId: { 
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },   
    mail: {
        type: String,
        required: true,        
    },
    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const ticketSchema = mongoose.model('ticket', ticket);
module.exports = ticketSchema;