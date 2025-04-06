const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.model");
const Vassels = require("./vassels.model");
const Bookings = require("./bookings.model");
const Penalties = sequelize.define(
  "penalties",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reason: {
      type: DataTypes.ENUM([
        "late return",
        "contract violation",
        "damage",
        "other",
      ]),
    },
    penalty_cost: {
      type: DataTypes.DECIMAL,
    },
    status: {
      type: DataTypes.ENUM(["pending", "paid", "disputed"]),
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
Penalties.belongsTo(Clients, { foreignKey: "client_id" });
Clients.hasMany(Penalties);
Penalties.belongsTo(Vassels, { foreignKey: "vassel_id" });
Vassels.hasMany(Penalties);
Penalties.belongsTo(Bookings, { foreignKey: "booking_id" });
Bookings.hasMany(Penalties);
module.exports = Penalties;
