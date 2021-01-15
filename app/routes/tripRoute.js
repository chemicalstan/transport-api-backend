const express = require('express');
const route = express.Router();
const {cancelTrip, createTrip, filterTripByDestination, filterTripsByOrigin, getAllTrips} = require('../controllers/tripController');
const verifyAuth = require('../middlewares/verifyAuth')

//  Create trip
route.post('/create', verifyAuth, createTrip);

// cancel trip
route.put('/cancel/:tripId', verifyAuth, cancelTrip);

//  get all trips
route.get('/', verifyAuth, getAllTrips);

// filter trip by destination
route.get('/byDestnation', verifyAuth, filterTripByDestination);

// filter trip by origin
route.get('/byOrigin', verifyAuth, filterTripsByOrigin);

module.exports = route;