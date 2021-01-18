const moment = require("moment"),
  dbQuery = require("../db/dev/dbQuery"),
  validation = require("../helpers/validations"),
  Status = require("../helpers/status"),
  { empty } = validation,
  { successMessage, errorMessage, status } = Status;
/**
 * Add a Bus
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const addBusDetails = async (req, res) => {
  const { number_plate, manufacturer, model, year, capacity } = req.body;
  const created_on = moment(new Date());
  // Validate payload
  if (
    empty(number_plate) ||
    empty(manufacturer) ||
    empty(model) ||
    empty(year) ||
    empty(capacity)
  ) {
    errorMessage.error = "All fields are required";
    return res.status(status.bad).send(errorMessage);
  }
  // add bus query
  const createBusQuery = `INSERT INTO bus(number_plate, manufacturer, model, year, capacity, created_on) VALUES($1, $2, $3, $4, $5. $6) returning *`;
  const values = [
    number_plate,
    manufacturer,
    model,
    year,
    capacity,
    created_on
  ];
  try {
    const { rows } = await dbQuery(createBusQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
      errorMessage.error = 'Unable to add bus'
      return res.status(status.error).send(errorMessage);
  }
};

/**
 * Get All Buses
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Buses Array
 */
const getAllBuses = async (req, res)=>{
    const getBusesQuery = `SELECT * FROM bus ORDER BY id DESC`;
    try {
        const { rows } = await dbQuery(getBusesQuery);
        const dbResponse = rows;
        if(dbResponse[0] === undefined){
            errorMessage.error = 'There are no buses';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'An error occured while fetching buses';
        return res.status(status.error).send(errorMessage);
    }
}

module.exports = {
    addBusDetails,
    getAllBuses
}