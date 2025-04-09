const ApiError = require("../../helpers/api.errors");
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJSON());
  }
  if (err instanceof SyntaxError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: "Syntax Error" });
  }
  console.log(err);
  return res.status(500).json(ApiError.internal("Somthing went wrong"));
};
