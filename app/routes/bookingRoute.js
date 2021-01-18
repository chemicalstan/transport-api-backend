const express = require('express');
const { createBooking, deleteBooking, changeBookingSeat, getAllBookings } = require('../controllers/bookingController');
const route = express.Router();
const verifyAuth = require('../middlewares/verifyAuth');

// GET ALL BOOKINGS
route.get('/bookings', verifyAuth, getAllBookings);

// CREATE BOOKING
route.post('/bookings', verifyAuth, createBooking);

// DELETE BOOKING
route.delete('/bookings/:bookingId', verifyAuth, deleteBooking);

//  CHANGE BOOKING SEAT
route.put('/bookings/:bookingId', verifyAuth, changeBookingSeat);

module.exports = route;