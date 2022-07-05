const httpStatus = require('../helpers/httpstatuscode');
const saleSchema = require('../schemas/saleSchema');
const productsModel = require('../models/productModel');

const authSales = async (req, res, next) => {
  const sale = req.body;
  const { error } = await saleSchema.validate(sale);

  if (error) {
    const { message } = error;
    console.log(message);
    if (
      message === '"productId" is required'
      || message === '"quantity" is required'
    ) {
      return res.status(httpStatus.BAD_REQUEST).json({ message });
    }
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
};

const authProductId = async (req, res, next) => {
  const getProductDb = await productsModel.getAll();
  const getIdDb = getProductDb.map((product) => product.id);
  const productId = req.body.map((item) => item.productId);

  const sale = getIdDb.includes(productId);

  if (!sale) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  authSales,
  authProductId,
};
