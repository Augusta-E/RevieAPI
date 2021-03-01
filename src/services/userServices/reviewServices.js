const database = require("../../models");

/**
 * @class User
 * @description allows user create and check review
 * @exports User
 */
module.exports = {
  /**
   * @param {string} newReview - The Review details
   * @returns {object} An instance of the Review model
   */
  addreview: async (newReview) => {
    try {
      return await database.Reviews.create(newReview);
    } catch (err) {
      throw err;
    }
  },

  findUser: async (id) => {
    try {
      return await database.Users.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  },


  /**
   * @returns {object} All instances of the Reviews model
   */
  listReviews: async () => {
    try {
      return await database.Reviews.findAll()
    } catch (err) {
      throw err;
    }
  },
  
  /**
   * @param {string} id - Review id
   * @returns {object} An instance of the Review model 
   */
 findReviewById: async (id) => {
    try {
      return await database.Reviews.findOne(id)
    } catch (err) {
      throw err;
    }
  },

  /**
   * @param {string} id -  Review id
   * @param {string} newReview - Review object
   * @returns {object} An updated instance of the Review model
   */
 editReview: async (id, newReview) => {
    try {
      return await database.Reviews.update(newReview, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  },

  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {string} id - Review object
   */
  delReview: async (id) => {
    try {
      await database.Reviews.destroy({
        where: {
          id,
        }
      });
    } catch (err) {
      throw err;
    }
  }
}
