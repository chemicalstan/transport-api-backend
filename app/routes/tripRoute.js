const express = require('express');
const route = express.Router();
const {cancelTrip, createTrip, filterTripByDestination, filterTripsByOrigin, getAllTrips} = require('../controllers/tripController');
const verifyAuth = require('../middlewares/verifyAuth')

//  Create trip
route.post('/trips', verifyAuth, createTrip);

// cancel trip
route.patch('/trips/:tripId', verifyAuth, cancelTrip);

//  get all trips
route.get('/trips', verifyAuth, getAllTrips);

// filter trip by destination
route.get('trips/destnation', verifyAuth, filterTripByDestination);

// filter trip by origin
route.get('trips/origin', verifyAuth, filterTripsByOrigin);

module.exports = route;