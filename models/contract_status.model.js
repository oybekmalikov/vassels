const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const ContractStatus = sequelize.define(
  "contract_status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = ContractStatus;
