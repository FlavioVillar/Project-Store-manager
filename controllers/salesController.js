const salesService = require('../services/salesService');
const httpStatus = require('../helpers/httpstatuscode');

const addSale = async (req, res) => {
  try {
    const sale = req.body;
    const xablau = await salesService.addSale(sale);
    res.status(httpStatus.CREATED).json(xablau);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error });
  }
};

module.exports = {
  addSale,
};
