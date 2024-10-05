const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const map = new Schema({

    name: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const mapSchema = mongoose.model('map', map);
module.exports = mapSchema;