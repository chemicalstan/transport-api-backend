const moment = require("moment");
const { empty } = require("../helpers/validatons");
const { successMessage, errorMessage, status } = require("../helpers/status");
const dbQuery = require("../db/dev/dbQuery");

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
  const values = [
    user_id,
    trip_id,
    bus_id,
    trip_date,
    seat_number,
    first_name,
    last_name,
    email,
    created_on
  ];
  try {
    const { rows } = await dbQuery(createBookingQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    //   seat_number row is unique. checking if seat is already taken
    if (error.routine === "_bt_check_unique") {
      errorMessage.error = "Seat Number is taken already";
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = "Unable to create booking";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllBookings = async (req, res) => {
  const { user_id, is_admin } = req.user;

  if (!is_admin === true) {
    const getUserBookingsQuery = `SELECT * FROM booking WHERE user_id = $1`;
    try {
      const { rows } = await dbQuery(getUserBookingsQuery, [user_id]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = "You have no bookings";
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = "Could not user's bookings";
      return res.status(status.error).send(errorMessage);
    }
  }

  const getAllBookingsQuery = `SELECT * FROM booking ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery(getAllBookingsQuery);
    const dbResponse = rows;
    if (dbResponse === undefined) {
      errorMessage.error = "There are no bookings";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }
};
