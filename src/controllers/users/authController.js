/* eslint-disable no-irregular-whitespace */
const bcrypt = require('bcrypt');
const { config } = require('dotenv');
const util = require('../../helpers/util');
const { registerValidation, loginValidation } = require('../../validators/authValidation')
const { generateToken, hashPassword } = require('../../helpers/auth')
const Users  = require('../../services/userServices/authServices')
const { emailExist } = require('../../services/userServices/authServices')


config();

/**
 * @function UserController
 * @description create, verify and log in user
 * @exports UserController
 */
module.exports = {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  createUser: async(req, res) => {
    try {
      const { error } = registerValidation(req.body);
      if (error) {
        console.log(error)
        util.setError(400, "Validation Error", error.message);
        return util.send(res);
      }
      const { email, full_name, password } = req.body;
      const Email = email.toLowerCase();
      //console.log(Email)

      const checkEmail = await emailExist(Email);
      console.log(checkEmail)
      if (checkEmail) return res.status(409).json({ status: 409, error: "Email already used by another user." });
      const hashed = await hashPassword(password);
      const newUser = { email: Email, full_name, password: hashed };

      const createdUser = await Users.createUser(newUser);
      console.log(newUser)
      const token = await generateToken({ createdUser });
      return res.status(201).json({ status: 201, message: "User successfully created", token });
    } catch (error) {
      console.log(error)

      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  },

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  loginUser: async (req, res) => {
    try {
      const { error } =   loginValidation(req.body);
      if (error) { util.setError(400, "Validation Error", error.message); return util.send(res); }
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const isUser = await Users.emailExist(Email);
      if (!isUser) return res.status(404).json({ status: 404, error: "Email does not exist." });
      const validpass = await bcrypt.compare(password, isUser.password);
      if (!validpass) return res.status(404).json({ status: 400, error: "Password is not correct!." });
      
      const token = await generateToken({ isUser });
      util.setSuccess(200, "User Logged in!", token);
      return util.send(res);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

}
