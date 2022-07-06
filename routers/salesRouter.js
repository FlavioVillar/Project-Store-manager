const express = require('express');
const salesController = require('../controllers/salesController');
const { authSales, authProductId } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.post('/', authSales, authProductId, salesController.addSale);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/:id', authSales, authProductId, salesController.update);
router.delete('/:id', salesController.exclude);

module.exports = router;