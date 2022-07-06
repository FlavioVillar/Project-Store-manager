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

module.exports = {
  addSale,
  getById,
  getAll,
  exclude,
};
