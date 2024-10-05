const express = require('express');
const router = express.Router();
const Service = require('../models/service'); // Adjust the path to match your project structure
const auth = require('../middleware/auth'); // Optional, include if you require route protection

// CREATE a new service entry
router.post('/services', auth, async (req, res) => {
    const { name, phone, email, date, serviceType, price, status, allocatedStaff, uniqueId } = req.body;
    try {
        const newService = new Service({
            name,
            phone,
            email,
            date,
            serviceType,
            price,
            status,
            allocatedStaff,
            uniqueId
        });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all service entries
router.get('/services', auth, async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single service entry by ID
router.get('/services/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a service entry
router.put('/services/:id', auth, async (req, res) => {
    const { name, phone, email, date, serviceType, price, status, allocatedStaff, uniqueId } = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, {
            name,
            phone,
            email,
            date,
            serviceType,
            price,
            status,
            allocatedStaff,
            uniqueId
        }, { new: true });
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a service entry
router.delete('/services/:id', auth, async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
