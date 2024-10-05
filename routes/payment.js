const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');  // Import the payment model
const auth = require('../middleware/auth');    // Assuming you have an authentication middleware

// CREATE a new payment entry
router.post('/payments', auth, async (req, res) => {
    const { name, email, serviceName, price, status } = req.body;

    // Simple input validation
    if (!name || !email || !serviceName || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPayment = new Payment({ name, email, serviceName, price, status });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ all payments
router.get('/payments', auth, async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single payment by ID
router.get('/payments/:id', auth, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a payment entry by ID
router.put('/payments/:id', auth, async (req, res) => {
    const { name, email, serviceName, price, status } = req.body;

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            { name, email, serviceName, price, status },
            { new: true, runValidators: true }  // Return the updated document
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a payment entry by ID
router.delete('/payments/:id', auth, async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
