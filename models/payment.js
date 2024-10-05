const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payment = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, {
    timestamps: true
});
const paymentSchema = mongoose.model('payment', payment);
module.exports = paymentSchema;