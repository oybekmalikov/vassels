const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const VasselsCategories = sequelize.define(
  "vassels_category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
  }
);

module.exports = VasselsCategories;
