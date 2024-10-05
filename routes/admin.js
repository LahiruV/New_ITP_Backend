const adminSchema = require('../models/admin');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth');


// Register route for admin
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, type } = req.body;
        const existingUser = await adminSchema.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email is already used' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new adminSchema({
            name,
            email,
            phone,
            type,
            password: hashedPassword,
        });

        await admin.save();
        res.status(201).json({ message: 'Admin member added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

// Login route for admin
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminSchema.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        const payload = {
            admin: {
                id: admin.id,
                type: admin.type
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful', type: admin.type });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

// Get all admins route
router.get('/getAll', auth, async (req, res) => {
    try {
        const admins = await adminSchema.find().select('-password');
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

module.exports = router;
