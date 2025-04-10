const ApiError = require("../../helpers/api.errors");
const paymentAccessGuard = (action, model = null) => {
  return async (req, res, next) => {
    const user = req.login;
    if (["admin", "creator"].includes(user.role)) return next();
    if (user.role !== "client" && user.role !== "owner") {
      return next(ApiError.forbidden("Only owners or clients can access"));
    }
    if (action === "create") {
      if (req.body?.clientId === user.id || req.body?.ownerId === user.id) {
        return next();
      }
      return next(ApiError.forbidden("You can only access your own data"));
    }
    if (["read", "delete", "update"].includes(action)) {
      if (!model) {
        return next(ApiError.internal("Invalid Aktion"));
      }
      const id = req.params.id;
      if (!id) {
        return next(ApiError.forbidden("You can only access your own data"));
      }
      const data = await model.findByPk(id);
      if (!data) return next(ApiError.notFound("Data not found"));
      if (data.clientId === user.id || data.ownerId === user.id) {
        return next();
      }
      return next(ApiError.forbidden("You can only access your own data"));
    }
    return next(ApiError.forbidden("Invalid action"));
  };
};

module.exports = paymentAccessGuard;
