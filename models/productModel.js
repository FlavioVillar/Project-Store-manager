const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rows;
};

const add = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const results = {
    id: row.insertId,
    name,
  };

  return results;
};

const update = async (id, name) => {
  const [results] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return results.affectedRows;
};

const exclude = async (id) => {
  connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

const search = async (name) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    // tratamento para retornar o nome, incompleto ou completo
    [`%${name}%`],
  );
  return rows;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
  search,
};
