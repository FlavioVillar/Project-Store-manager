const salesModel = require('../models/salesModel');

const addSale = async (sale) => {
  const saleInsertId = await salesModel.addSale();
  const saleProduct = sale.map((product) =>
    salesModel.addSaleProduct(saleInsertId, product));

  await Promise.all(saleProduct);

  return { id: saleInsertId, itemsSold: sale };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  return sales;
};

const exclude = async (id) => {
  const sales = await salesModel.exclude(id);
  return sales;
};

const update = async (id, sale) => {
  const validateId = await salesModel.getById(id);
  if (!validateId || validateId.length === 0) {
    return validateId;
  }
  const serviceSale = sale.map((product) =>
    salesModel.update(product.productId, product.quantity));
  await Promise.all(serviceSale);
  console.log('serviceSale', serviceSale);

  return { saleId: id, itemsUpdated: sale };
};

module.exports = {
  addSale,
  getById,
  getAll,
  exclude,
  update,
};
