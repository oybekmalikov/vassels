const sequelize = require("../config/ConnectToDB");
const { DataTypes } = require("sequelize");
const Payments = require("./payments.model");
const Clients = require("./clients.model");
const Owners = require("./owners.model");
const Vassels = require("./vassels.model");
const ContractStatus = require("./contract_status.model");
const Contracts = sequelize.define(
  "contracts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_receipt: {
      type: DataTypes.STRING,
    },
    terms: {
      type: DataTypes.TEXT,
    },
    signed_date: {
      type: DataTypes.DATE,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
Contracts.belongsTo(Payments);
Payments.hasMany(Contracts);
Contracts.belongsTo(Clients);
Clients.hasMany(Contracts);
Contracts.belongsTo(Owners);
Owners.hasMany(Contracts);
Contracts.belongsTo(Vassels);
Vassels.hasMany(Contracts);
Contracts.belongsTo(ContractStatus);
ContractStatus.hasMany(Contracts);
module.exports = Contracts;
