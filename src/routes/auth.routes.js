const { Router } = require('express');
const authController = require('../controllers/users/authController');

const router = Router();


router.post("/users/signup", authController.createUser);
router.post("/users/signin", authController.loginUser);



module.exports = router;
