const Report = require('../models/report');
const Property = require('../models/property');

async function getReportCounts() {
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
        for (let x = 0; x < reportCounts.length; x++) {
            if (reportCounts[x].count > 4) {
                const propertyID = reportCounts[x].propertyID;
                await deleteProperty(propertyID);
                await deleteReport(propertyID);
            }
        }
    } catch (error) {
        console.error('Error fetching report counts:', error);
    }
}

async function deleteProperty(propertyID) {
    try {
        await Property.findByIdAndDelete(propertyID);
    } catch (error) {
        console.error(`Error deleting property with ID ${propertyID}:`, error);
    }
}

async function deleteReport(reportID) {
    try {
        await Report.findOneAndDelete(reportID);
    } catch (error) {
        console.error(`Error deleting report with ID ${reportID}:`, error);
    }
}

module.exports = {
    getReportCounts
};
