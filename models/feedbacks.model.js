const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.model");
const Vassels = require("./vassels.model");
const Feedbacks = sequelize.define(
  "feedbacks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mark: {
      type: DataTypes.SMALLINT(),
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
Feedbacks.belongsTo(Clients, { foreignKey: "client_id" });
Clients.hasMany(Feedbacks);
Feedbacks.belongsTo(Vassels, { foreignKey: "vassel_id" });
Vassels.hasMany(Feedbacks);
module.exports = Feedbacks;
