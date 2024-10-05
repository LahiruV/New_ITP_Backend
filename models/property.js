const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const property = new Schema({

    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    picture2: {
        type: String,
        required: true
    },
    picture3: {
        type: String,
        required: true
    },
    picture4: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    utilityID: {
        type: Schema.Types.ObjectId,
        ref: 'utility',
        required: true
    }
}, {
    timestamps: true
});
const propertySchema = mongoose.model('property', property);
module.exports = propertySchema;