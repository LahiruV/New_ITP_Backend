const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const report = new Schema({

    propertyID: {
        type: String,
        required: true,
    },

    userID: {
        type: String,
        required: true,
    },

    uniqueID: {
        type: String,
        required: true,
        unique: true
    },

}, {
    timestamps: true
});
const reportSchema = mongoose.model('report', report);
module.exports = reportSchema;