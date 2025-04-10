const jwt = require("jsonwebtoken");
const config = require("config");
const { errorHandler } = require("../../helpers/ErrorHandler");
const ApiError = require("../../helpers/api.errors");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw ApiError.unauthorized("Authorization token not given");
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw ApiError.unauthorized("Bearer or token not valid");
    }
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    const userRole = payload.role;
    if (!userRole) {
      throw ApiError.unauthorized("User role not found in token");
    }
    let secretKey;
    if (userRole === "admin" || userRole === "creator")
      secretKey = config.get("ADMIN_ACCESS_KEY");
    else if (userRole === "owner") secretKey = config.get("OWNER_ACCESS_KEY");
    else if (userRole === "client") secretKey = config.get("CLIENT_ACCESS_KEY");
    else throw ApiError.unauthorized("Invalid user role");
    const decodedToken = jwt.verify(token, secretKey);

    req.login = decodedToken;
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
