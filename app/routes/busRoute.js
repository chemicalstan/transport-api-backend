const express = require("express");
const route = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const { addBusDetails, getAllBuses } = require("../controllers/busController");

// get all busses route
route.get("/buses", verifyAuth, getAllBuses);
// add bus details route
route.post("/buses", verifyAuth, addBusDetails);

module.exports = route;
