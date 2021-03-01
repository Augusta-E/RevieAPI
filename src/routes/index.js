const { Router } = require('express');
const authRoutes = require('./auth.routes');
const reviewRoutes = require('./review.routes')


const router = Router();

router.use('/auth', authRoutes);
router.use('/', reviewRoutes);



module.exports = router;
