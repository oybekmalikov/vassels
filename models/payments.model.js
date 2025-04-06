const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.model");
const Owners = require("./owners.model");
const Bookings = require("./bookings.model");
const Payments = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_cost: {
      type: DataTypes.DECIMAL,
    },
    payment_method: {
      type: DataTypes.ENUM(["card", "cash", "bank_transfer", "other"]),
    },
    status: {
      type: DataTypes.ENUM(["pending", "canceled", "completed"]),
    },
  },
  {
    freezeTableName: true,
  }
);
Payments.belongsTo(Clients, { foreignKey: "client_id" });
Clients.hasMany(Payments);
Payments.belongsTo(Owners, { foreignKey: "owner_id" });
Owners.hasMany(Payments);
Payments.belongsTo(Bookings, { foreignKey: "booking_id" });
Bookings.hasMany(Payments);
module.exports = Payments;
