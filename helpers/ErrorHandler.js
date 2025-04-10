const logger = require("../services/logger.service");

const errorHandler = (error, response) => {
  console.log(error);
  logger.error(error)
  response.status(400).send({ error: error.message });
};
module.exports = { errorHandler };
