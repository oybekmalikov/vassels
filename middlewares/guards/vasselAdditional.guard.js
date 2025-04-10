const ApiError = require("../../helpers/api.errors");
const Vassel = require("../../models/vassels.model");
const vasselOwnerGuard = (model, action) => {
  return async (req, res, next) => {
    const user = req.login;
    if (["admin", "creator"].includes(user.role)) return next();
    if (user.role !== "owner") {
      return next(ApiError.forbidden("Only owners can accees"));
    }
    let vasselId;
    if (action === "create") {
      vasselId = req.body.vasselId;
    } else {
      const dataId = req.params.id;
      const data = await model.findByPk(dataId);
      if (!data) return next(ApiError.notFound("Data not found"));
      vasselId = data.vasselId;
    }
    const vassel = await Vassel.findByPk(vasselId);
    if (!vassel) return next(ApiError.notFound("Vassel not found"));
    if (vassel.ownerId !== user.id) {
      return next(ApiError.forbidden("You can only access your own vassel's data"));
    }
    return next();
  };
};
module.exports = vasselOwnerGuard;
