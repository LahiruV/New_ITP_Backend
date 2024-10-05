const express = require('express');
const router = express.Router();
const Map = require('../models/map'); 
const auth = require('../middleware/auth'); 

// CREATE a new map entry
router.post('/maps', auth, async (req, res) => {
    const { name, lat, lng, area } = req.body;
    try {
        const newMap = new Map({ name, lat, lng, area });
        await newMap.save();
        res.status(201).json(newMap);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all map entries
router.get('/maps', auth, async (req, res) => {
    try {
        const maps = await Map.find();
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single map entry by ID
router.get('/maps/:id', auth, async (req, res) => {
    try {
        const map = await Map.findById(req.params.id);
        if (!map) return res.status(404).json({ message: 'Map not found' });
        res.json(map);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a map entry
router.put('/maps/:id', auth, async (req, res) => {
    const { name, lat, lng, area } = req.body;
    try {
        const updatedMap = await Map.findByIdAndUpdate(req.params.id, { name, lat, lng, area }, { new: true });
        if (!updatedMap) return res.status(404).json({ message: 'Map not found' });
        res.json(updatedMap);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a map entry
router.delete('/maps/:id', auth, async (req, res) => {
    try {
        const deletedMap = await Map.findByIdAndDelete(req.params.id);
        if (!deletedMap) return res.status(404).json({ message: 'Map not found' });
        res.json({ message: 'Map deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
