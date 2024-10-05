const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodmenu = new Schema({

    type: {
        type: String,
        required: true,
    },
    items: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const foodmenuSchema = mongoose.model('foodmenu', foodmenu);
module.exports = foodmenuSchema;