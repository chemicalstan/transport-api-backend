const express = require("express");
const route = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const { creatUser, signinUser } = require("../controllers/userController");

// get all users route
route.post("/create", verifyAuth, creatUser);
// add signin user route
route.post("/signin", verifyAuth, signinUser);

module.exports = route;
