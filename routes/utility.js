const express = require('express');
const router = express.Router();
const Utility = require('../models/utility');
const auth = require('../middleware/auth');

// CREATE a new utility
router.post('/utilities', auth, async (req, res) => {
    const { propertyID, name, quantity } = req.body;
    try {
        const newUtility = new Utility({
            propertyID,
            name,
            quantity,
        });
        await newUtility.save();
        res.status(201).json(newUtility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all utilities
router.get('/utilities', auth, async (req, res) => {
    try {
        const utilities = await Utility.find();
        res.json(utilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single utility by ID
router.get('/utilities/:id', auth, async (req, res) => {
    try {
        const utility = await Utility.findById(req.params.id);
        if (!utility) return res.status(404).json({ message: 'Utility not found' });
        res.json(utility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a utility
router.put('/utilities/:id', auth, async (req, res) => {
    const { propertyID, name, quantity } = req.body;
    try {
        const updatedUtility = await Utility.findByIdAndUpdate(req.params.id, {
            propertyID,
            name,
            quantity,
        }, { new: true });
        if (!updatedUtility) return res.status(404).json({ message: 'Utility not found' });
        res.json(updatedUtility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a utility
router.delete('/utilities/:id', auth, async (req, res) => {
    try {
        const deletedUtility = await Utility.findByIdAndDelete(req.params.id);
        if (!deletedUtility) return res.status(404).json({ message: 'Utility not found' });
        res.json({ message: 'Utility deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
