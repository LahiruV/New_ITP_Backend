const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staff = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    staffSize: {
        type: Number,
        required: true,
        default: 0
    },
    newID: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});
const staffSchema = mongoose.model('staff', staff);
module.exports = staffSchema;