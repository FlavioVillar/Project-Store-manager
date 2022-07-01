const httpStatusCode = require('../helpers/httpstatuscode');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length < 1) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res
      .status(httpStatusCode.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = nameValidation;