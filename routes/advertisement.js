const express = require('express');
const router = express.Router();
const Advertisement = require('../models/advertisement'); // Ensure the path matches your file structure
const auth = require('../middleware/auth'); // Optional, include if you require route protection

// CREATE a new advertisement
router.post('/advertisements', auth, async (req, res) => {
    const { name, description, picture } = req.body;
    try {
        const newAdvertisement = new Advertisement({ name, description, picture });
        await newAdvertisement.save();
        res.status(201).json(newAdvertisement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all advertisements
router.get('/advertisements', auth, async (req, res) => {
    try {
        const advertisements = await Advertisement.find();
        res.json(advertisements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single advertisement by ID
router.get('/advertisements/:id', auth, async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) return res.status(404).json({ message: 'Advertisement not found' });
        res.json(advertisement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE an advertisement
router.put('/advertisements/:id', auth, async (req, res) => {
    const { name, description, picture } = req.body;
    try {
        const updatedAdvertisement = await Advertisement.findByIdAndUpdate(req.params.id, { name, description, picture }, { new: true });
        if (!updatedAdvertisement) return res.status(404).json({ message: 'Advertisement not found' });
        res.json(updatedAdvertisement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE an advertisement
router.delete('/advertisements/:id', auth, async (req, res) => {
    try {
        const deletedAdvertisement = await Advertisement.findByIdAndDelete(req.params.id);
        if (!deletedAdvertisement) return res.status(404).json({ message: 'Advertisement not found' });
        res.json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
