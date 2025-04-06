const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Owners = sequelize.define(
  "Owners",
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
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(30),
    },
    phone: {
      type: DataTypes.STRING(30),
    },
    tax_id: {
      type: DataTypes.STRING,
    },
    bank_card_number: {
      type: DataTypes.STRING(20),
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

module.exports = Owners;
