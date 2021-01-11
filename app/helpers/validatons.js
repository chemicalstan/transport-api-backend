// Helper methods that would foster reusability across project

const env = require('../../env');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */

   const isValidEmail = (email) => {
        const regEx = /\S+@\S+\.\S+/;
        return regEx.test(email);
   }

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */

   const validatePassword = (password) => {
       if (password.length <= 5 || password === '') {
           return false;
       }   return true;
   }

/**
   * isEmpty helper method
   * @param {string} input
   * @returns {Boolean} True or False
   */

   const isEmpty = (input) => {
       if (input === undefined || input === '') {
           return true;
       }
       if (input.replace(/\s/g, '').length) {
           return false;
      } return true;
   }

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
  };

/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */

  const generateUserToken = (email, id, is_admin, first_name, last_name) => {
    const token = jwt.sign({
        email,
        user_id: id,
        is_admin,
        first_name,
        last_name
    }, env.secrete, {expiresIn: '3d'});
    return token;
  }

/**
 * Hash password
 * @param {string} password
 * @returns {string} hashed password
 */

const hashPassword = (password) => {
    const saltRounds = 10;
    bcrypt.getSalt(saltRounds, (err, salt)=>{
        if(err) throw err;
        bcrypt.hash(password, salt, (err, hash)=>{
            if(err) throw err;
            return hash
        })
    })
  }

  /**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */

const generateUserToken = (email, id, is_admin, first_name, last_name) => {
    const token = jwt.sign({
        email,
        user_id: id,
        is_admin,
        first_name,
        last_name
    }, env.secrete, {expiresIn: '3d'});
    return token;
  }

  module.exports = {
      isValidEmail,
      validatePassword,
      isEmpty,
      empty,
      generateUserToken,
  }