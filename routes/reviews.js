const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const auth = require('../middleware/auth');

// CREATE a new review
router.post('/reviews', auth, async (req, res) => {
    const { description, mail, rating, rating2, rating3, date, propertyId } = req.body;
    try {
        const newReview = new Review({ description, mail, rating, rating2, rating3, date, propertyId });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all reviews
router.get('/reviews', auth, async (req, res) => {
    try {
        const reviews = await Review.find().populate('propertyId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single review by ID
router.get('/reviews/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('propertyId');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a review
router.put('/reviews/:id', auth, async (req, res) => {
    const { description, mail, rating, rating2, rating3, date, propertyId } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { description, mail, rating, rating2, rating3, date, propertyId }, { new: true });
        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a review
router.delete('/reviews/:id', auth, async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
