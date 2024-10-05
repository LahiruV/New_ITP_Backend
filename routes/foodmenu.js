const express = require('express');
const router = express.Router();
const FoodMenu = require('../models/foodmenu');
const auth = require('../middleware/auth');

// CREATE a new food menu entry
router.post('/foodmenu', auth, async (req, res) => {
    const { type, items, area, date, supplier, picture } = req.body;
    try {
        const newFoodMenu = new FoodMenu({ type, items, area, date, supplier, picture });
        await newFoodMenu.save();
        res.status(201).json(newFoodMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all food menu entries
router.get('/foodmenu', auth, async (req, res) => {
    try {
        const menus = await FoodMenu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single food menu entry by ID
router.get('/foodmenu/:id', auth, async (req, res) => {
    try {
        const menu = await FoodMenu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Food menu not found' });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a food menu entry
router.put('/foodmenu/:id', auth, async (req, res) => {
    const { type, items, area, date, supplier, picture } = req.body;
    try {
        const updatedMenu = await FoodMenu.findByIdAndUpdate(req.params.id, { type, items, area, date, supplier, picture }, { new: true });
        if (!updatedMenu) return res.status(404).json({ message: 'Food menu not found' });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a food menu entry
router.delete('/foodmenu/:id', auth, async (req, res) => {
    try {
        const deletedMenu = await FoodMenu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) return res.status(404).json({ message: 'Food menu not found' });
        res.json({ message: 'Food menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
