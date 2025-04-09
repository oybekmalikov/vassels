const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const VasselsCategories = require("./vassels_categories.model");
const Owners = require("./owners.model");
const Vassels = sequelize.define(
  "vassels",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING(100),
    },
    capacity: {
      type: DataTypes.SMALLINT,
    },
    model_year: {
      type: DataTypes.DATE,
    },
    size: {
      type: DataTypes.DECIMAL,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image_path: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
Vassels.belongsTo(VasselsCategories);
VasselsCategories.hasMany(Vassels);
Vassels.belongsTo(Owners);
Owners.hasMany(Vassels);
module.exports = Vassels;
