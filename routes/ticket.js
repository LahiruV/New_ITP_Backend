const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const auth = require('../middleware/auth');

// CREATE a new ticket
router.post('/tickets', auth, async (req, res) => {
    const { propertyId, mail, reason, type, date, status } = req.body;
    try {
        const newTicket = new Ticket({ propertyId, mail, reason, type, date, status });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all tickets
router.get('/tickets', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('propertyId');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single ticket by ID
router.get('/tickets/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('propertyId');;
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a ticket
router.put('/tickets/:id', auth, async (req, res) => {
    const { propertyId, mail, reason, type, date, status } = req.body;
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { propertyId, mail, reason, type, date, status }, { new: true });
        if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(updatedTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a ticket
router.delete('/tickets/:id', auth, async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
