const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  if (!products) return [];
  return products;
};

const getById = async (id) => {
  const [product] = await productModel.getById(id);
  if (!product) return [];
  return product;
};

module.exports = {
  getAll,
  getById,
};
