const connection = require('../helpers/connection');

const addSale = async () => {
  // console.log('model addSale');
  const [sale] = await connection.execute(
    'INSERT INTO sales (date) values (?)', [new Date()],
  );
  return sale.insertId;
};

const addSaleProduct = async (saleId, product) => {
  const [saleProduct] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) values (?, ?, ?)',
    [saleId, product.productId, product.quantity],
  );

  return saleProduct.insertId;
};

module.exports = {
  addSale,
  addSaleProduct,
};
