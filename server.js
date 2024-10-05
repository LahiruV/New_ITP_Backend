require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const admin = require('./routes/admin');
const staff = require('./routes/staff');
const foodmenu = require('./routes/foodmenu');
const properties = require('./routes/property');
const utilities = require('./routes/utility');
const maps = require('./routes/map');
const tickets = require('./routes/ticket');
const reviews = require('./routes/reviews');
const bookings = require('./routes/booking');
const advertisements = require('./routes/advertisement');
const services = require('./routes/service');
const foodreq = require('./routes/foodreq');
const mail = require('./routes/mail');
const report = require('./routes/report');
const payments = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', admin);
app.use('/api/staff', staff);
app.use('/api/foodmenu', foodmenu);
app.use('/api/properties', properties);
app.use('/api/utilities', utilities);
app.use('/api/maps', maps);
app.use('/api/tickets', tickets);
app.use('/api/reviews', reviews);
app.use('/api/bookings', bookings);
app.use('/api/advertisements', advertisements);
app.use('/api/services', services);
app.use('/api/foodreq', foodreq);
app.use('/api/mail', mail);
app.use('/api/report', report);
app.use('/api/payments', payments);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
