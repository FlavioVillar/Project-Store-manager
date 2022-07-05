const salesModel = require('../models/salesModel');

const addSale = async (sale) => {
  const saleInsertId = await salesModel.addSale();
  const saleProduct = sale.map((product) =>
    salesModel.addSaleProduct(saleInsertId, product));

  await Promise.all(saleProduct);

  return { id: saleInsertId, sold: sale };
};

module.exports = {
  addSale,
};
