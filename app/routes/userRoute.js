const express = require("express");
const route = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const { creatUser, signinUser } = require("../controllers/userController");

// get all users route
route.post("/users", verifyAuth, creatUser);
// signin user route
route.post("/users/signin", verifyAuth, signinUser);

module.exports = route;
