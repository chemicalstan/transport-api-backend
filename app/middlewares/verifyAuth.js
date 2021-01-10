const jwt = require("jsonwebtoken");
const env = require("../../env");
const dotenv = require("dotenv");
const errorMessage = require('../helpers/status').errorMessage;
const status = require('../helpers/status').status;

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object|void} response object
 */


 const verifyToken = (req, res, next)=>{
     const {token} = req.headers;
     if(!token){
         errorMessage.error = 'Token not provided';
         return res.status(status.bad).send(errorMessage);
     }
     try {
        const decoded =jwt.verify(token, process.env.SECRETE)
        req.user = {
            email: decoded.email,
            user_id: decoded.user_id,
            is_admin: decoded.is_admin,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
        };
        next();
     } catch (error) {
         errorMessage.error = 'Authentication failed',
         res.status(status.unauthorized).send(errorMessage)
     }
 }

 module.exports = verifyToken;