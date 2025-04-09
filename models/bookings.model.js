const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.model");
const Vassels = require("./vassels.model");
const Bookings = sequelize.define(
  "bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    cost: {
      type: DataTypes.DECIMAL,
    },
    status: {
      type: DataTypes.ENUM(["pending", "confirmed", "canceled", "completed"]),
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
Bookings.belongsTo(Clients);
Clients.hasMany(Bookings);
Bookings.belongsTo(Vassels);
Vassels.hasMany(Bookings);
module.exports = Bookings;
