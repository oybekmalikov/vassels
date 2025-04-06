const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Admins = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(30),
    },
    role: {
      type: DataTypes.ENUM(["ADMIN", "CREATOR"]),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.STRING(150),
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Admins;
