const errorHandler = (error, response) => {
  console.log(error);
  response.status(400).send({ error: error.message });
};
module.exports = { errorHandler };
