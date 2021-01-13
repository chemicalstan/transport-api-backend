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
  const values = {
    bus_id,
    origin,
    destination,
    trip_date,
    fare,
    created_on
  };
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
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
