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
Payments.belongsTo(Clients);
Clients.hasMany(Payments);
Payments.belongsTo(Owners);
Owners.hasMany(Payments);
Payments.belongsTo(Bookings);
Bookings.hasMany(Payments);
module.exports = Payments;
