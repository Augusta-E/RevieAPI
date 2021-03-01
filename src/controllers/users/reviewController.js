const Reviews = require('../../services/userServices/reviewServices')

const { validation, validateId } = require("../../validators/reviewValidation");

/**
 * @function Review
 * @description create, read, update & delete reviews
 * @exports reviews
 */
module.exports = {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  addReview: async(req, res) => {
    try {
      const {
        ammenitiesQuality, landlordReview, environmentReview, image, video
      } = req.body;
      const { user_id } = req.params;
      const { error } = validation({
        user_id, ammenitiesQuality, landlordReview, environmentReview, image, video
      });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const user = await Reviews.findUser(user_id);
      if (!user) return res.status(404).json({ status: 404, error: "user does not exist" });
      const newReview = {
        ammenitiesQuality, landlordReview, environmentReview, image, video
      };
      const newReviewCreated = await Reviews.addReview(newReview);
      return res.status(201).json({ status: 201, message: "Review has been successfully added.", data: newReviewCreated });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  },

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
   getAllReviews: async(req, res) => {
    try {
      const reviews = await Reviews.listReviews();
      return res.status(200).json({ status: 200, message: "Successfully retrieved all Reviews", data: reviews });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  },

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  getReview: async(req, res) => {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const reviewId = await Reviews.findReviewtById(id);
      if (!reviewId) return res.status(404).json({ status: 404, error: "Review not found" });
      return res.status(200).json({ status: 200, message: "Successfully retrieved Review.", data: reviewId });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  },

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  updateReview: async(req, res) => {
    try {
      const { id } = req.params;
      const {
        user_id, ammenitiesQuality, landlordReview, environmentReview, image, video
      } = req.body;
      const { error } = validateId({ id, user_id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const oldReview = await Reviews.findReviewById(id);
      if (!oldReview) return res.status(404).json({ status: 404, error: "Review not found" });
      if (user_id) {
        const user = await Reviews.findUser(user_id);
        if (!user) return res.status(404).json({ status: 404, error: "user does not exist" });
      }
      const newReview = await Reviews.editReview(id, req.body);
      return res.status(200).json({ status: 200, message: "Successfully updated Review.", data: newReview[1], });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  },

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
   deleteReview: async(req, res) => {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const reviewed = await Reviews.findReviewById(id);
      if (!reviewed) return res.status(404).json({ status: 404, error: "Review not found" });
      await reviewed.delReview(id);
      return res.status(200).json({ status: 200, message: "Successfully deleted Review." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }
}
