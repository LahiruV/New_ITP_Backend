const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const auth = require('../middleware/auth');

// CREATE a new map entry
router.post('/report', auth, async (req, res) => {
    const { propertyID, userID, uniqueID } = req.body;
    try {
        const report = new Report({ propertyID, userID, uniqueID });
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all map entries
router.get('/report', auth, async (req, res) => {
    try {
        const reportCounts = await Report.aggregate([
            {
                $group: {
                    _id: "$propertyID",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    propertyID: "$_id",
                    count: 1
                }
            }
        ]);

        res.json(reportCounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;