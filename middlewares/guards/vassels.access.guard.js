const ApiError = require("../../helpers/api.errors");
const ownerAccessGuard = (action, model = null) => {
  return async (req, res, next) => {
    const user = req.login;
    if (["admin", "creator"].includes(user.role)) return next();
    if (user.role !== "owner") {
      return next(ApiError.forbidden("Only owners can access"));
    }
    if (action === "create") {
      if (req.body.ownerId === user.id) {
        return next();
      }
      return next(ApiError.forbidden("You can only access your own data"));
    }
    if (["read", "update", "delete"].includes(action)) {
      if (!model) {
        return next(ApiError.internal("Invalid Aktion"));
      }

      const id = req.params.id;
      const data = await model.findByPk(id);
      if (!data) return next(ApiError.notFound("Data not found"));
      if (data.ownerId === user.id) {
        return next();
      }

      return next(ApiError.forbidden("You can only access your own data"));
    }

    return next(ApiError.forbidden("Invalid action"));
  };
};

module.exports = ownerAccessGuard;
