const salesService = require('../services/salesService');
const httpStatus = require('../helpers/httpstatuscode');

const addSale = async (req, res) => {
  try {
    const sale = req.body;
    const insertedSale = await salesService.addSale(sale);
    res.status(httpStatus.CREATED).json(insertedSale);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    res.status(httpStatus.OK).json(sales);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getSaleById = await salesService.getById(id);
    if (getSaleById.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }

    res.status(httpStatus.OK).json(getSaleById);
  } catch (error) {
   return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesService.exclude(id);
    if (deletedSale.affectedRows === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }
    res.status(httpStatus.NO_CONTENT).json(deletedSale);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};  

const update = async (req, res) => {
  try {
    const sale = req.body;
    const { id } = req.params;
    const updatedSale = await salesService.update(id, sale);
    if (updatedSale.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }
    res.status(httpStatus.OK).json(updatedSale);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};

module.exports = {
  addSale,
  getById,
  getAll,
  exclude,
  update,
};
