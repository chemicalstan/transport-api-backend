const moment = require("moment");
const validations = require("../helpers/validatons");
const {
  isEmpty,
  isValidEmail,
  validatePassword,
  hashPassword,
  generateUserToken
} = validations;
const Status = require("../helpers/status");
const { successMessage, errorMessage, status } = Status;
const dbQuery = require("../db/dev/dbQuery");

/**
 * Create An Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */

const createAdmin = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const { is_admin } = req.user;
  const isAdmin = true;
  const created_on = moment(new Date());

  // Validate if the user is admin
  if (!is_admin) {
    errorMessage.error = "Sorry You are unauthorized to create an admin";
    return res.status(status.bad).send(errorMessage);
  }

  // Validate inputs
  if (
    isEmpty(email) ||
    isEmpty(first_name) ||
    isEmpty(last_name) ||
    isEmpty(password)
  ) {
    errorMessage.error =
      "Email, password, first name and last name field cannot be empty";
    res.status(status.bad).send(errorMessage);
  }

  // Validate email
  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid Email";
    return res.status(status.bad).send(errorMessage);
  }

  // validate password
  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than five(5) characters";
    return res.status(status.bad).send(errorMessage);
  }

  // hash password
  const hashedPassword = hashPassword(password);

  const createUserQuery = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

  const values = {
    email,
    first_name,
    last_name,
    hashedPassword,
    created_on
  };

  try {
      const { rows } = dbQuery.query(createUserQuery, values)
      const dbResponse = rows[0];
      delete dbResponse.password
      const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return res.status(status.created).send(successMessage);
  } catch (error) {
    //  Check for user already exists error 
    if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'User with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage);
      }
    errorMessage.error = 'Operation was not successful'
    return res.status(status.conflict).send(errorMessage)
  }
};

/**
 * Update User to an Admin 
 * @param {object} req
 * @param {object} res
 * @returns {object} Updated User
 */

 const updateUserToAdmin = (req, res)=>{
  const { id } = req.params;
  const { isAdmin } = req.body;

  const { is_admin } = req.user;
  // Check if user is an admin
  if (!is_admin === true) {
    errorMessage.error = 'Sorry You are unauthorized to make a user an admin';
    return res.status(status.bad).send(errorMessage);
  }
  // Validate isAdmin status from payload
  if(isAdmin === ''){
    errorMessage.error = 'Admin status is needed';
    return res.status(status.ba).send(errorMessage);
  }
  const findUserQuery = 'SELECT * FROM users WHERE id=$1';
  const updateUserQuery = `UPDATE users SET is_admin=$1 WHERE id=$2 returning *`;
  try {
    const { rows } = await dbQuery(findUserQuery, id);
    const dbResponse = rows[0]
    if (!dbResponse) {
      errorMessage.error = 'User Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = {
      isAdmin,
      id
    };
    const response = dbQuery(updateUserQuery, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
 };

 module.exports = {
   createAdmin,
   updateUserToAdmin
 }
