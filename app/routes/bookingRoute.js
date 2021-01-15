const express = require('express');
const { createBooking, deleteBooking, changeBookingSeat, getAllBookings } = require('../controllers/bookingController');
const route = express.Router();
const verifyAuth = require('../middlewares/verifyAuth');

// GET ALL BOOKINGS
route.get('/', verifyAuth, getAllBookings);

// CREATE BOOKING
route.post('/create', verifyAuth, createBooking);

// DELETE BOOKING
route.delete('/delete/:bookingId', verifyAuth, deleteBooking);

//  CHANGE BOOKING SEAT
route.put('/update/:bookingId', verifyAuth, changeBookingSeat);