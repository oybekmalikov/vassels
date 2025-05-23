const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Clients = sequelize.define(
  "clients",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(30),
    },
    last_name: {
      type: DataTypes.STRING(30),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(30),
      unique: true,
    },
    passport_data: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    passport_img_path: {
      type: DataTypes.STRING,
      unique: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Clients;
