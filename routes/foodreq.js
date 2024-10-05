const express = require('express');
const router = express.Router();
const FoodReq = require('../models/foodreq');
const auth = require('../middleware/auth'); // Optional, include if you require route protection

// Create a new food request
router.post('/foodreq', auth, async (req, res) => {
    try {
        const { name, email, phone, foodId } = req.body;
        const newFoodReq = new FoodReq({
            name,
            email,
            phone,
            foodId
        });

        const savedFoodReq = await newFoodReq.save();
        res.status(201).json(savedFoodReq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating food request' });
    }
});

// Get all food requests
router.get('/foodreq', auth, async (req, res) => {
    try {
        const foodReqs = await FoodReq.find().populate('foodId');
        res.status(200).json(foodReqs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving food requests' });
    }
});

// Get a specific food request by ID
router.get('/foodreq/:id', auth, async (req, res) => {
    try {
        const foodReq = await FoodReq.findById(req.params.id).populate('foodId');
        if (!foodReq) {
            return res.status(404).json({ error: 'Food request not found' });
        }
        res.status(200).json(foodReq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving food request' });
    }
});

// Update a food request by ID
router.put('/foodreq/:id', auth, async (req, res) => {
    try {
        const { status } = req.body; // Assuming you are only updating the status
        const updatedFoodReq = await FoodReq.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedFoodReq) {
            return res.status(404).json({ error: 'Food request not found' });
        }

        res.status(200).json(updatedFoodReq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating food request' });
    }
});

// Delete a food request by ID
router.delete('/foodreq/:id', auth, async (req, res) => {
    try {
        const deletedFoodReq = await FoodReq.findByIdAndDelete(req.params.id);

        if (!deletedFoodReq) {
            return res.status(404).json({ error: 'Food request not found' });
        }

        res.status(200).json({ message: 'Food request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting food request' });
    }
});

router.get('/userreport/:email', auth, async (req, res) => {
    try {
        const data = await FoodReq.find({ email: req.params.email });
        if (!data) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving' });
    }
});

module.exports = router;
