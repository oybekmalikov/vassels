const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Otps = sequelize.define(
  "otps",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING(10),
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiration_time: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Otps;
