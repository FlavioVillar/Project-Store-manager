const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middlewares/nameValidation');
const { authProductId } = require('../middlewares/productMiddleware');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getById);
router.post('/', nameValidation, productController.add);
router.put('/:id', nameValidation, authProductId, productController.update);
router.delete('/:id', authProductId, productController.exclude);

module.exports = router;