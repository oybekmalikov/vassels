const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Vassels = require("./vassels.model");
const VasselsPrices = sequelize.define(
  "vassels_prices",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.ENUM(["hourly", "daily", "weekly", "monthly", "yearly"]),
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
  }
);
VasselsPrices.belongsTo(Vassels);
Vassels.hasMany(VasselsPrices);
module.exports = VasselsPrices;
