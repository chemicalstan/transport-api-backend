const moment = require("moment"),
  validation = require("../helpers/validatons"),
  Status = require("../helpers/status"),
  dbQuery = require("../db/dev/dbQuery"),
  { isEmpty, empty } = validation,
  { successMessage, errorMessage, status, trip_status } = Status;

/**
 * Create Trip
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createTrip = async (req, res) => {
  // Retrieve data from payload
  const { bus_id, origin, destination, trip_date, fare } = req.body;
  const { is_admin } = req.user;

  if (!is_admin) {
    errorMessage.error = "Sorry You are unauthorized to create a trip";
    return res.status(status.bad).send(errorMessage);
  }
  const created_on = moment(new Date());
  // validate data from payload
  if (
    (empty(bus_id) ||
      isEmpty(origin) ||
      isEmpty(destination) ||
      empty(trip_date),
    empty(fare))
  ) {
    errorMessage.error =
      "bus id, origin, destination, trip date and fare field cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  const createTripQuery = `INSERT INTO trip(bus_id, origin, destination, trip_date, fare, created_on) VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values = [bus_id, origin, destination, trip_date, fare, created_on];
  try {
    const { rows } = await dbQuery(createTripQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "There was a problem creating trip";
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * Get all trips
 * @param {object} req
 * @param {object} res
 * @returns {object} trips array
 */
const getAllTrips = async (req, res) => {
  const getAllTripsQuery = `SELECT * FROM trip ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery(getAllTripsQuery);
    const dbResponse = rows;
    if (!dbResponse[0]) {
      errorMessage.error = "There are no trips";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.send(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};
/**
 * Cancel Trip
 * @param {object} req
 * @param {object} res
 * @returns {void} return Trip Cancelled Succesfully
 */
const cancelTrip = async (req, res) => {
  const { tripId } = req.params;
  const { is_admin } = req.user;
  const { cancelled } = trip_status;
  if (!is_admin === true) {
    errorMessage.error = "Sorry You are unauthorized to cancel a trip";
    return res.status(status.unauthorized).send(errorMessage);
  }
  if (empty(tripId)) {
    errorMessage.error = "Please select the trip you want to cancel";
    return res.status(status.bad).send(errorMessage);
  }
  const cancelTripQuery = `UPDATE trip SET status = $1 WHERE id = $2 returning *`;
  const values = [cancelled, tripId];
  try {
    const { rows } = await dbQuery(cancelTripQuery, values);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "There is no trip with that id";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = "Trip cancelled successfully";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * filter trips by origin
 * @param {object} req
 * @param {object} res
 * @returns {object} return trips
 */
const filterTripsByOrigin = async (req, res) => {
  const { origin } = req.body;
  if (isEmpty(origin)) {
    errorMessage.error = "Origin field cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  const filterTripsByOriginQuery = `SELECT * FROM trip WHERE origin = $1 ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery(filterTripsByOriginQuery, [origin]);
    const dbResponse = rows;
    if (!dbResponse[0]) {
      errorMessage.error = "No trip with that origin";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * filter trip by destination
 * @param {object} req
 * @param {object} res
 * @returns {object} return trips
 */
const filterTripByDestination = async (req, res) => {
  const { destination } = req.body;
  if (isEmpty(destination)) {
    errorMessage.error = "Please enter a valid destination";
    return res.status(status.bad).send(errorMessage);
  }

  const filterTripByDestinationQuery = `SELECT * FROM trip WHERE destination = $1 ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery(filterTripByDestinationQuery, [destination]);
    const dbResponse = rows[0];
    if (!dbResponse[0] === "true") {
      errorMessage.error = "No trip with this destination";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation not successful";
    return res.status(status.error).send(errorMessage);
  }
};
