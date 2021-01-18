const express = require("express");
const route = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const {
  createAdmin,
  updateUserToAdmin
} = require("../controllers/adminController");

// create admin
route.post("/admin", verifyAuth, createAdmin);

//  update user to admin
route.put("/admin/:id", verifyAuth, updateUserToAdmin);

module.exports = route;
