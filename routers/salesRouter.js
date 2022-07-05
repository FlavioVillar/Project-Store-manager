const express = require('express');
const salesController = require('../controllers/salesController');
const { authSales, authProductId } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.post('/', authSales, authProductId, salesController.addSale);

module.exports = router;