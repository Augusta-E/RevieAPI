const { Router } = require("express");
const reviewController = require("../controllers/users/reviewController");
const Authentication = require("../middleWares/authentication");
const router = Router();

// eslint-disable-next-line max-len
const {
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview,
} = reviewController;

const { verifyToken } = Authentication;


router.get("/review", getAllReviews);
router.get("/review/:id", getReview);
router.post("/user/review/:userId", verifyToken, addReview);
router.patch("/user/review/:id", verifyToken, updateReview);
router.delete("/user/review/:id", verifyToken, deleteReview);

module.exports = router;


