const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const db = require("../models");

const { Op } = sequelize;

require("dotenv").config();

/**
 * @class Authentication
 * @description authenticate token and roles
 * @exports Authentication
 */
module.exports = {
  /**
   * @param {object} req - The res body object
   * @param {object} res - The res body object
   * @param {object} next -  The function to call next
   * @returns {Function} errorResponse | next
   */
  verifyToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      let decoded;
      if (authorization) {
        const token = authorization.split(" ")[1];
        try {
          decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
          return res.status(410).send({ status: 410, error: "Please sign in again." });
        }
        req.decoded = decoded;
        return next();
      }
      return res.status(401).json({ status: 401, error: "Please login." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error." });
    }
  },

  /**
   * @param {object} req - The res body object
   * @param {object} res - The res body object
   * @param {object} next -  The function to call next
   * @returns {Function} errorResponse | next
   */
 verifyUserById: async(req, res, next) => {
    try {
      const { id } = req.decoded.user;
      const user = await Authentication.findUserById(id);
      if (user) {
        return next();
      }
      return res.status(403).json({ status: 403, error: "Sorry User has been De-activated, Please contact an admin." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error." });
    }
  },

  /**
   * @param {string} id - The user ID
   * @returns {object} - An instance of the Users model class
   */
  findUserById: async(id) => {
    try {
      return await db.Users.findOne({
        where: {
          id,
          active: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

 
}
