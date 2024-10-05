const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service = new Schema({

    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    serviceType: {
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
    allocatedStaff: {
        type: String,
        default: ''
    },
    uniqueId: {
        type: String,
        default: '',
        unique: true
    }

}, {
    timestamps: true
});
const serviceSchema = mongoose.model('service', service);
module.exports = serviceSchema;