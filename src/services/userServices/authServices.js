const database = require('../../models');

/**
 * @class User
 * @description User services
 * @exports User
 */
module.exports = {
  /**
   * @param {string} username - The user name
   * @returns {object} - An instance of the Users model class
   */

  /**
   * @param {string} email  - The user email
   * @returns {object} - An instance of the Users model class
   */
  emailExist: async(email) => {
      console.log(email)
    try {
      return await database.Users.findOne({
        where: { email }
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * @param {object} newUser - The user details
   * @returns {object} - An instance of the Users model class
   */
  createUser: async(newUser) => {
    try {
      const createUser = await database.Users.create(newUser);    
{
        return createUser;
      }
    } catch (error) {
      throw error;
    }
  },


  /**
   * @param {string} id - The user id
   * @returns {object} - An instance of the Users model class
   */
  findUser: async(id) => {
    try {
      return await database.Users.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
