const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    propertyId: { 
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('booking', bookingSchema);
