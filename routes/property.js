const express = require('express');
const router = express.Router();
const Property = require('../models/property'); // Adjust the path according to your project structure
const auth = require('../middleware/auth'); // Include authentication middleware if needed

// CREATE a new property
router.post('/properties', auth, async (req, res) => {
    const { name, address, phone, area, description, price, picture, picture2, picture3, picture4, email, utilityID } = req.body;
    try {
        const newProperty = new Property({ name, address, phone, area, description, price, picture, picture2, picture3, picture4, email, utilityID: '66e16326a2eca0f453de234b' });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all properties
router.get('/properties', auth, async (req, res) => {
    try {
        const properties = await Property.find().populate('utilityID'); // Populating with details from the 'utility' model
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single property by ID
router.get('/properties/:id', auth, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a property
router.put('/properties/:id', auth, async (req, res) => {
    const { name, address, phone, area, description, price, picture, picture2, picture3, picture4, email, utilityID } = req.body;
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {
            name, address, phone, area, description, price, picture, picture2, picture3, picture4, email, utilityID
        }, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a property
router.delete('/properties/:id', auth, async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
