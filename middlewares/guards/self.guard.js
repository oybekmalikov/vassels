const { errorHandler } = require("../../helpers/ErrorHandler");
const ApiError = require("../../helpers/api.errors");
const clientSelfGuard = async (req, res, next) => {
  try {
    const userId = req.login.id;
    const userRole = req.login.role;
    const paramId = parseInt(req.params.id);
    if (
      (userId == paramId && userRole == "client") ||
      (userRole == "admin" && userRole == "creator")
    ) {
      return next();
    }
    throw ApiError.unauthorized("You can only access your own data");
  } catch (error) {
    errorHandler(error, res);
  }
};
const ownerSelfGuard = async (req, res, next) => {
  try {
    const userId = req.login.id;
    const userRole = req.login.role;
    const paramId = parseInt(req.params.id);
    if (
      (userId == paramId && userRole == "owner") ||
      userRole == "admin" ||
      userRole == "creator"
    ) {
      return next();
    }
    throw ApiError.unauthorized("You can only access your own data");
  } catch (error) {
    errorHandler(error, res);
  }
};
const adminSelfGuard = async (req, res, next) => {
  try {
    const userId = req.login.id;
    const userRole = req.login.role;
    const paramId = parseInt(req.params.id);
    console.log(userRole);
    if ((userId == paramId && userRole == "admin") || userRole == "creator") {
      return next();
    }
    throw ApiError.unauthorized("You can only access your own data");
  } catch (error) {
    errorHandler(error, res);
  }
};
const creatorSelfGuard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const paramId = parseInt(req.params.id);
    if (userId !== paramId && userRole !== "creator") {
      throw ApiError.unauthorized("You can only access your own data");
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  clientSelfGuard,
  ownerSelfGuard,
  adminSelfGuard,
  creatorSelfGuard,
};
