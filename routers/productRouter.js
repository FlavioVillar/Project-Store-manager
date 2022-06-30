const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.add);
router.put('/:id', productController.update);
router.delete('/:id', productController.exclude);

module.exports = router;