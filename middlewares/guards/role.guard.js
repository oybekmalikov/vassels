const ApiError = require("../../helpers/api.errors");
module.exports = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.login;
    if (!user) {
      throw ApiError.unauthorized("You are not allowed!");
    }
    if (!allowedRoles.includes(user.role)){
      throw ApiError.forbidden("Access Denied!");
    }
    next()
  };
};

