const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth'); // Optional, include if you require route protection

router.post('/mail', auth, async (req, res) => {
    const { email, content, header } = req.body;
    try {
        // Create a Nodemailer transporter using your SMTP settings
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'anjulagehan23@gmail.com', // Your email
                pass: 'pplu cpkl nqlt rtwi', // Your email app password
            },
        });

        // Set up email data
        let mailOptions = {
            from: 'anjulagehan23@gmail.com',
            to: email,
            subject: header,
            text: content,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                return res.status(400).json({ msg: 'Email not sent.', error });
            } else {
                // Include the code in the response
                res.status(200).json({ msg: 'Email sent' });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;