const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Bookings = require("./bookings.model");
const Payments = require("./payments.model");
const Contracts = sequelize.define(
  "contracts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_receipt: {
      type: DataTypes.STRING,
    },
    terms: {
      type: DataTypes.TEXT,
    },
    signed_date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
Contracts.belongsTo(Payments, { foreignKey: "payment_id" });
Payments.hasMany(Contracts);
Contracts.belongsTo(Bookings, { foreignKey: "booking_id" });
Bookings.hasMany(Contracts);
module.exports = Contracts;
