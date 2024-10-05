const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviews = new Schema({

    description: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rating2: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rating3: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: String,
        required: true
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
}, {
    timestamps: true
});
const reviewsSchema = mongoose.model('reviews', reviews);
module.exports = reviewsSchema;