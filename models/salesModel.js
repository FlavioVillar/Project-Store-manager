const connection = require('../helpers/connection');

const addSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) values (?)',
    [new Date()],
  );
  return sale.insertId;
};

const addSaleProduct = async (saleId, product) => {
  const [saleProduct] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) values (?, ?, ?)',
    [saleId, product.productId, product.quantity],
  );

  return saleProduct.insertId;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId , date, product_id as productId, quantity 
  FROM StoreManager.sales_products 
  INNER JOIN StoreManager.sales 
  ON StoreManager.sales_products.sale_id = sales.id`,
  );
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT date, product_id as productId, quantity 
    FROM StoreManager.sales_products 
    INNER JOIN StoreManager.sales 
    ON StoreManager.sales_products.sale_id = sales.id WHERE sales.id = ?`,
    [id],
  );
  return sales;
};

const exclude = async (id) => {
  const [rows] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ? ',
    [id],
  );
  return rows;
};

const update = async (productId, quantity) => {
  const [rows] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ?',
    [quantity, productId],
  );
  return rows;
};

module.exports = {
  addSale,
  addSaleProduct,
  getById,
  getAll,
  exclude,
  update,
};
