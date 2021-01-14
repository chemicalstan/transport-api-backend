const moment = require("moment");
const { empty } = require("../helpers/validatons");
const { successMessage, errorMessage, status } = require("../helpers/status");
const dbQuery = require('../db/dev/dbQuery');

/**
 * Add A Booking
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */

const createBooking = async (req, res) => {
  const { trip_id, bus_id, trip_date, seat_number } = req.body;
  const { user_id, first_name, last_name, email } = req.user;

  if (!empty(trip_id)) {
    errorMessage.error = "Trip Required";
    return res.status(status.bad).send(errorMessage);
  }
  const created_on = moment(new Date());
  const createBookingQuery = `INSERT INTO
  booking(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *`;
  const values = [user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on];
  try {
    const {rows}  = await dbQuery(createBookingQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage)
  } catch (error) {
    //   seat_number row is unique. checking if seat is already taken
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Seat Number is taken already';
        return res.status(status.conflict).send(errorMessage);
      }
    errorMessage.error = 'Unable to create booking';
    return res.status(status.error).send(errorMessage);
  }
};
