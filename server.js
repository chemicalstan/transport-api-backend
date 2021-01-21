const express = require("express");
const adminRoute = require("./app/routes/adminRoute"),
  bookingRoute = require("./app/routes/bookingRoute"),
  busRoute = require("./app/routes/busRoute"),
  tripRoute = require("./app/routes/tripRoute"),
  userRoute = require("./app/routes/userRoute"),
  seedRoute = require("./app/routes/seedRoute"),
  cors = require("cors"),
  env = require("./env");
require("babel-polyfill");

const app = express();
// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false })); ///// use body parser
app.use(express.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', seedRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', tripRoute);
app.use('/api/v1', busRoute);
app.use('/api/v1', bookingRoute);


app.listen(process.env.PORT).on('listening', () => {
  console.log(`🚀 We are live on ${process.env.PORT}`);
});


module.exports = app;
