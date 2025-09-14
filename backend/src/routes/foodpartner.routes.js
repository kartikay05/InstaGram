const express = require('express');
const foodController = require('../controllers/foodpartner.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// GET /api/foodpartner/:id
router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodController.getFoodPartnerById);


module.exports = router;