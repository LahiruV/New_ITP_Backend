const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const auth = require('../middleware/auth');

// CREATE a new staff member
router.post('/staff', auth, async (req, res) => {
    const { name, email, phone, type, staffSize } = req.body;
    const newUserID = 'S' + Math.floor(100000 + Math.random() * 900000);
    try {
        const newStaff = new Staff({ name, email, phone, type, staffSize, newID: newUserID });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all staff members
router.get('/staff', auth, async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single staff member by ID
router.get('/staff/:id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a staff member
router.put('/staff/:id', auth, async (req, res) => {
    const { name, email, phone, type, staffSize, newID } = req.body;
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, { name, email, phone, type, staffSize, newID }, { new: true });
        if (!updatedStaff) return res.status(404).json({ message: 'Staff member not found' });
        res.json(updatedStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a staff member
router.delete('/staff/:id', auth, async (req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
        if (!deletedStaff) return res.status(404).json({ message: 'Staff member not found' });
        res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
