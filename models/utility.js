const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utility = new Schema({

    propertyID: {
        type:Schema.Types.ObjectId,
        ref : 'property'
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});
const utilitySchema = mongoose.model('utility', utility);
module.exports = utilitySchema;