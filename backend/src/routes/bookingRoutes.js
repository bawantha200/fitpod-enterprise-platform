const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();
console.log('Booking routes loaded');
// Customer -> backend

// Create booking hold
router.post('/', bookingController.createBooking);

// Get booking details
router.get('/:bookingId', bookingController.getBookingById);

module.exports = router;
