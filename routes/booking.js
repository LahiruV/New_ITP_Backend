const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Ensure the path matches your file structure
const auth = require('../middleware/auth'); // Optional, include if you require route protection

// CREATE a new booking
router.post('/bookings', auth, async (req, res) => {
    const { propertyId, name, quantity, phone, mail, status, date } = req.body;
    try {
        const newBooking = new Booking({ propertyId, name, quantity, phone, mail, status, date });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all bookings
router.get('/bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('propertyId'); // Populating with details from the 'property' model
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single booking by ID
router.get('/bookings/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('propertyId');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a booking
router.put('/bookings/:id', auth, async (req, res) => {
    const { propertyId, name, quantity, phone, mail, status, date } = req.body;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { propertyId, name, quantity, phone, mail, status, date }, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a booking
router.delete('/bookings/:id', auth, async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
