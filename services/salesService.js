const salesModel = require('../models/salesModel');

const addSale = async (sale) => {
  // console.log('service addSale');
  const saleInsertId = await salesModel.addSale();
  const saleProduct = sale.map((product) =>
    salesModel.addSaleProduct(saleInsertId, product));

  await Promise.all(saleProduct);

  return { id: saleInsertId, itemsSold: sale };
};

module.exports = {
  addSale,
};
