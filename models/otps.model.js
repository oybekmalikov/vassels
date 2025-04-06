const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Otps = sequelize.define(
  "otps",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    otp: {
      type: DataTypes.STRING(10),
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiration_time: {
      type: DataTypes.TIME,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Otps;
