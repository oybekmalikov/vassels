const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Vassels = require("./vassels.model");
const VasselsAdditionals = sequelize.define(
  "vassels_additionals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attribute_name: {
      type: DataTypes.STRING(100),
    },
    attribute_value: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
  }
);
VasselsAdditionals.belongsTo(Vassels);
Vassels.hasMany(VasselsAdditionals);
module.exports = VasselsAdditionals;
