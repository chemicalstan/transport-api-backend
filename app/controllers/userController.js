const dbQuery = require("../db/dev/dbQuery"),
  moment = require("moment"),
  validations = require("../helpers/validatons"),
  {
    isEmpty,
    isValidEmail,
    generateUserToken,
    validatePassword,
    hashPassword,
    comparePassword
  } = validations,
  Status = require("../helpers/status"),
  { successMessage, errorMessage, status } = Status;

/**
 * Create User
 * @param {object} req
 * @param {object} res
 * @return {object} reflection object
 */

const creatUser = async (req, res) => {
  // Get form data
  const { email, first_name, last_name, password } = req.body;
  const created_on = moment(new Date());

  // Validate form data
  if (
    isEmpty(email) ||
    isEmpty(first_name) ||
    isEmpty(last_name) ||
    isEmpty(password)
  ) {
    errorMessage.error =
      "Email, password, first name and last name field cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid email";
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than five(5) characters";
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
  const values = [email, first_name, last_name, hashedPassword, created_on];

  try {
    const { rows } = await dbQuery(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(
      dbResponse.email,
      dbResponse.id,
      dbResponse.is_admin,
      dbResponse.first_name,
      dbResponse.last_name
    );
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === "_bt_check_unique") {
      errorMessage.error = "User with that EMAIL already exist";
      res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = "Operation was not successful";
    res.status(status.error).send(errorMessage);
  }
};

/**
 * Sign In
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const signIn = async (req, res) => {};
