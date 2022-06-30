const productService = require('../services/productService');
const httpStatus = require('../helpers/httpstatuscode');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    if (!products) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    if (!product || product.length < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const add = async (req, res) => {
  try {
    const { name } = req.body;
    
    const product = await productService.add(name);
    if (product.name < 5) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    
    if (!product) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: '"name" is required' });
    }
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const product = await productService.update(id, name);

    if (product === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    res.status(httpStatus.OK).json(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.exclude(id);

    if (product === null || product < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    res.status(httpStatus.OK);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};
