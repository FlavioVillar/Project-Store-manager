const productService = require('../services/productService');
const httpStatus = require('../helpers/httpstatuscode');

const authProductId = async (req, res, next) => {
  const { id } = req.params;
  const results = await productService.getById(id);

  if (!results || results.length < 1) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  authProductId,
};
