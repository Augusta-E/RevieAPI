const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();
const secretKey = process.env.JWT_KEY;
/**
 *
 */
module.exports = {
  /**
   * @param {object} payload - The details to be signed
   * @param {string} secret - The JWT secret key
   * @returns {string} The JWT signed token
   */

  generateToken: async (payload, secret = secretKey) => {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  }
}

  
 
  