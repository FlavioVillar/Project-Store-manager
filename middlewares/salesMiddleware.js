const httpStatus = require('../helpers/httpstatuscode');
const saleSchema = require('../schemas/saleSchema');
const productsModel = require('../models/productModel');

const authSales = (req, res, next) => {
  const sale = req.body;
  const { error } = saleSchema.validate(sale);

  if (error) {
    const { message } = error;
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
  const getProductIdDb = getProductDb.map((product) => product.id);

  // O método every() testa se todos os elementos do array passam por um teste implementado por uma função fornecida.
  const validateProductsIdInSales = req.body.every((product) =>
    getProductIdDb.includes(product.productId));
  if (!validateProductsIdInSales) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' });
  }

  next();
};

// const authId = async (req, res, next) => {
//   const { id } = req.params;
//   console.log("id", id);
//   const getProductDb = await productsModel.getAll();
//   const getProductIdDb = getProductDb.map((product) => product.id);

//   const validateIdInSales = !getProductIdDb.includes(id);
//   console.log("validateIdInSales", validateIdInSales);
//   if (!validateIdInSales) {
//     return res.status(httpStatus.NOT_FOUND).json({ message: "Sale not found" });
//   }

//   next();
// };

module.exports = {
  authSales,
  authProductId,
  // authId,
};

// ! autenticação sem Joi

// const authSales = (req, res, next) => {
//   const sale = req.body;

//   console.log("2", sale);
//   if (!sale.every((item) => item.productId)) {
//     return res.status(httpStatus.BAD_REQUEST).json({
//       message: '"productId" is required',
//     });
//   }

//   if (!sale.every((item) => item.quantity > 0 || item.quantity === undefined)) {
//     return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
//       message: '"quantity" must be greater than or equal to 1',
//     });
//   }

//   if (!sale.every((item) => item.quantity)) {
//     return res.status(httpStatus.BAD_REQUEST).json({
//       message: '"quantity" is required',
//     });
//   }

//   next();
// };
